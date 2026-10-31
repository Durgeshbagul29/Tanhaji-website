#!/usr/bin/env python3
"""Replace the YOUR-DOMAIN placeholder with your real site address.
Usage:  python3 set-domain.py https://www.example.com
"""
import sys, pathlib
if len(sys.argv) != 2 or not sys.argv[1].startswith("http"):
    sys.exit("Usage: python3 set-domain.py https://www.example.com")
domain = sys.argv[1].rstrip("/")
n = 0
for p in pathlib.Path(".").rglob("*"):
    if p.suffix in {".html", ".xml", ".txt"} and p.is_file():
        t = p.read_text(encoding="utf-8")
        if "https://YOUR-DOMAIN" in t:
            p.write_text(t.replace("https://YOUR-DOMAIN", domain), encoding="utf-8"); n += 1
print(f"Updated {n} files with {domain}")
