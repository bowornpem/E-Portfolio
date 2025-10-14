import re

# อ่านไฟล์ HTML
with open('/Users/bowornpb/Documents/E-Portfolio/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# ลบ loading="lazy" ออกจาก img tags ทั้งหมด
pattern = r'<img\s+loading="lazy"\s+'
replacement = r'<img '

html_content = re.sub(pattern, replacement, html_content)

# บันทึกไฟล์
with open('/Users/bowornpb/Documents/E-Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✓ ลบ lazy loading ออกจากรูปภาพทั้งหมดแล้ว!")
