"""自動更新の結果を status.json に記録する。

使い方:
  python tools/update_status.py ok "メモ"       # 成功：lastRun と lastSuccess を今の日時にする
  python tools/update_status.py failed "理由"   # 失敗：lastRun だけ更新し、lastSuccess は前回の値を残す
"""
import json
import os
import sys
from datetime import datetime, timedelta, timezone

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATH = os.path.join(ROOT, "status.json")


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in ("ok", "failed"):
        print(__doc__)
        sys.exit(2)
    result = sys.argv[1]
    note = sys.argv[2] if len(sys.argv) > 2 else ""
    try:
        with open(PATH, encoding="utf-8") as f:
            st = json.load(f)
    except (OSError, ValueError):
        st = {}
    now = datetime.now(timezone(timedelta(hours=9))).isoformat(timespec="seconds")
    st["lastRun"] = now
    st["result"] = result
    st["note"] = note
    if result == "ok":
        st["lastSuccess"] = now
    else:
        st.setdefault("lastSuccess", None)
    with open(PATH, "w", encoding="utf-8", newline="\n") as f:
        json.dump(st, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(json.dumps(st, ensure_ascii=False))


if __name__ == "__main__":
    main()
