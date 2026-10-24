"""AIサービスナビのデータを検証する。

使い方:
  python tools/validate.py              # 形式とつながりの検証
  python tools/validate.py --protected  # さらに、毎週の自動更新で変えてはいけない部分が
                                        # 直前のコミット（HEAD）から変わっていないかを検証

問題がなければ "ok" を表示して終了コード0、問題があれば内容を表示して終了コード1。
"""
import json
import os
import subprocess
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PURPOSES = {"writing", "research", "docs", "image", "video", "code", "study", "efficiency", "other"}
GENRES = {"business", "life", "study", "creative"}
LEVELS = {"uses", "choice", "safe"}
# 毎週の自動更新で書き換えてよいファイル
UPDATABLE = {"news.json", "plans.json", "companies.json", "status.json"}

errors = []


def err(msg):
    errors.append(msg)


def load(name):
    with open(os.path.join(ROOT, name), encoding="utf-8") as f:
        return json.load(f)


def need(obj, keys, where):
    for k in keys:
        if k not in obj:
            err(f"{where}: '{k}' がありません")


def check_src(item, where):
    src = item.get("src")
    if not isinstance(src, list) or not all(isinstance(s, list) and len(s) == 2 and str(s[1]).startswith("https://") for s in src):
        err(f"{where}: src の形が正しくありません（[[出典名, https://...]]）")


def main():
    data = {}
    for name in ["services.json", "news.json", "plans.json", "companies.json", "examples.json", "compare.json", "status.json"]:
        try:
            data[name] = load(name)
        except Exception as e:  # noqa: BLE001
            err(f"{name}: 読み込めません（{e}）")
    if errors:
        return

    sv = data["services.json"]
    ids = [s.get("id") for s in sv.get("services", [])]
    S = set(ids)
    if len(ids) != len(S):
        err("services.json: id が重複しています")
    meta = sv.get("diagMeta", {})
    need(meta, ["fx", "purposes", "budgets", "envs", "genres"], "services.json diagMeta")
    if set(meta.get("purposes", {})) != PURPOSES:
        err("services.json diagMeta.purposes の種類が違います")
    for s in sv.get("services", []):
        w = f"services.json {s.get('id')}"
        need(s, ["name", "maker", "code", "color", "category", "summary", "good", "warn", "use", "cmp", "url", "diag"], w)
        if not str(s.get("url", "")).startswith("https://"):
            err(f"{w}: url が https ではありません")
        d = s.get("diag", {})
        need(d, ["scores", "free", "freePurposes", "minPaidJPY", "work", "team", "japan"], w + " diag")
        if set(d.get("scores", {})) != PURPOSES:
            err(f"{w}: diag.scores の用途がそろっていません")
        if not set(d.get("freePurposes", [])) <= PURPOSES:
            err(f"{w}: diag.freePurposes に不明な用途があります")
        if d.get("free") is False and d.get("freePurposes"):
            err(f"{w}: 無料プランがないのに freePurposes があります")
        if d.get("team") and "teamPlan" not in d:
            err(f"{w}: team が true なのに teamPlan がありません")

    news = data["news.json"]
    need(news, ["updated", "period", "services", "society"], "news.json")
    if set(news.get("services", {})) != S:
        err("news.json: services のキーが services.json の id と一致しません")
    for key, items in list(news.get("services", {}).items()) + [("society", news.get("society", []))]:
        for i, n in enumerate(items):
            need(n, ["date", "title", "text", "src"], f"news.json {key}[{i}]")
            check_src(n, f"news.json {key}[{i}]")

    plans = data["plans.json"]
    need(plans, ["updated", "plans", "data"], "plans.json")
    if {p.get("service") for p in plans.get("plans", [])} != S:
        err("plans.json: plans のサービスがそろっていません")
    if {p.get("service") for p in plans.get("data", [])} != S:
        err("plans.json: data のサービスがそろっていません")
    for p in plans.get("plans", []):
        w = f"plans.json plans {p.get('service')}"
        need(p, ["currency", "official", "summary", "tiers", "src"], w)
        if " · " not in p.get("summary", ""):
            err(f"{w}: summary に ' · ' がありません")
        if not str(p.get("official", "")).startswith("https://"):
            err(f"{w}: official が https ではありません")
        for t in p.get("tiers", []):
            need(t, ["name", "price", "who", "note"], w + " tier")
    for d in plans.get("data", []):
        for k in ("personal", "business"):
            if d.get(k, {}).get("level") not in LEVELS:
                err(f"plans.json data {d.get('service')}: {k}.level が不正です")

    co = data["companies.json"]
    if {c.get("service") for c in co.get("companies", [])} != S:
        err("companies.json: サービスがそろっていません")
    for c in co.get("companies", []):
        need(c, ["company", "legal", "founded", "hq", "leader", "structure", "scale", "business", "products", "japan", "stance", "src"], f"companies.json {c.get('service')}")
        if not isinstance(c.get("products"), list):
            err(f"companies.json {c.get('service')}: products が配列ではありません")

    ex = data["examples.json"].get("examples", [])
    if len(ex) < 30:
        err(f"examples.json: 活用事例が30件未満です（{len(ex)}件）")
    if len({e.get("id") for e in ex}) != len(ex):
        err("examples.json: id が重複しています")
    for e in ex:
        w = f"examples.json {e.get('id')}"
        need(e, ["service", "genre", "purpose", "title", "scene", "steps", "promptType", "prompt", "output", "cautions"], w)
        if e.get("service") not in S:
            err(f"{w}: service が不明です")
        if e.get("genre") not in GENRES:
            err(f"{w}: genre が不明です")
        if e.get("purpose") not in PURPOSES:
            err(f"{w}: purpose が不明です")
        if not str(e.get("prompt", "")).strip():
            err(f"{w}: prompt が空です")

    cmp = data["compare.json"]
    for t in cmp.get("themes", []):
        for en in t.get("entries", []):
            w = f"compare.json {t.get('id')} {en.get('service')}"
            if en.get("service") not in S:
                err(f"{w}: service が不明です")
            if en.get("status") not in ("pending", "done"):
                err(f"{w}: status は pending か done にしてください")
            if en.get("status") == "done":
                need(en, ["model", "date", "conditions"], w)
                if not (en.get("output") or en.get("image")):
                    err(f"{w}: 検証済みなのに出力がありません")

    st = data["status.json"]
    need(st, ["lastRun", "result", "lastSuccess"], "status.json")
    if st.get("result") not in ("ok", "failed"):
        err("status.json: result は ok か failed にしてください")

    if "--protected" in sys.argv:
        check_protected(sv)


def git(*args):
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, encoding="utf-8")


def check_protected(sv_now):
    changed = [x for x in git("diff", "--name-only", "HEAD").stdout.split() if x]
    untracked = [x for x in git("ls-files", "--others", "--exclude-standard").stdout.split() if x]
    for f in changed + untracked:
        if f not in UPDATABLE and f != "services.json":
            err(f"自動更新で変えてはいけないファイルが変わっています：{f}")
    head = git("show", "HEAD:services.json")
    if head.returncode != 0:
        return
    old = json.loads(head.stdout)
    if old.get("diagMeta") != sv_now.get("diagMeta"):
        err("services.json の diagMeta が変わっています（自動更新では変更しない）")
    old_by = {s["id"]: s for s in old.get("services", [])}
    for s in sv_now.get("services", []):
        o = old_by.get(s["id"])
        if not o:
            err(f"services.json: サービス {s['id']} が増えています（自動更新では追加しない）")
            continue
        for k in ("diag", "url", "cmp", "code", "color", "category"):
            if o.get(k) != s.get(k):
                err(f"services.json {s['id']}: {k} が変わっています（自動更新では変更しない）")
    if len(old_by) != len(sv_now.get("services", [])):
        err("services.json: サービスの数が変わっています")


if __name__ == "__main__":
    main()
    if errors:
        print("NG")
        for e in errors:
            print(" -", e)
        sys.exit(1)
    print("ok")
