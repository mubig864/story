"""qr.js 가 만든 QR 을 OpenCV 로 다시 읽어 원래 문자열과 같은지 확인: python3 data-src/test-qr.py  (opencv-python, numpy 필요)"""
import json, subprocess, sys, os
import numpy as np, cv2
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
cases = ['https://mubig864.github.io/story/', 'a', 'https://example.com/?q=' + 'x' * 30, 'https://example.com/' + 'abc/' * 10,
         'https://example.com/' + 'k' * 60, '주역점 https://mubig864.github.io/story/', 'https://example.com/' + 'z' * 85]
js = "const Q=require('./qr.js');console.log(JSON.stringify(%s.map(t=>{const e=Q.encode(t);return{v:e.version,s:e.size,m:e.modules.map(r=>r.map(b=>b?1:0))}})))" % json.dumps(cases, ensure_ascii=False)
out = json.loads(subprocess.check_output(['node', '-e', js], cwd=root))
det = cv2.QRCodeDetector(); bad = 0
for text, r in zip(cases, out):
    n = r['s']; q = 4; scale = 8
    img = np.full(((n + 2 * q) * scale,) * 2, 255, np.uint8)
    for y in range(n):
        for x in range(n):
            if r['m'][y][x]: img[(y + q) * scale:(y + q + 1) * scale, (x + q) * scale:(x + q + 1) * scale] = 0
    val, pts, _ = det.detectAndDecode(img)
    if val != text:   # 같은 글자가 길게 반복되는 퇴화 입력은 OpenCV 검출기가 조용한 영역 4칸에서 놓치기도 해 여백을 넓혀 다시 시도
        q = 6; img = np.full(((n + 2 * q) * scale,) * 2, 255, np.uint8)
        for y in range(n):
            for x in range(n):
                if r['m'][y][x]: img[(y + q) * scale:(y + q + 1) * scale, (x + q) * scale:(x + q + 1) * scale] = 0
        val, pts, _ = det.detectAndDecode(img)
    ok = val == text
    bad += not ok
    print('OK ' if ok else 'FAIL', 'v%d' % r['v'], len(text.encode()), 'bytes', repr(text[:40]), '' if ok else '-> ' + repr(val))
print('ALL PASS' if not bad else '%d FAIL' % bad); sys.exit(1 if bad else 0)
