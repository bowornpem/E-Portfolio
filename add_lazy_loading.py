import re

# อ่านไฟล์ HTML
with open('/Users/bowornpb/Documents/E-Portfolio/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# เพิ่ม loading="lazy" ให้กับ img tags ทั้งหมด (ยกเว้นที่มีอยู่แล้ว)
# Pattern: <img ที่ยังไม่มี loading attribute
pattern = r'<img\s+(?![^>]*loading=)([^>]*)>'
replacement = r'<img loading="lazy" \1>'

html_content = re.sub(pattern, replacement, html_content)

# บันทึกไฟล์
with open('/Users/bowornpb/Documents/E-Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✓ เพิ่ม lazy loading ให้กับรูปภาพทั้งหมดแล้ว!")
