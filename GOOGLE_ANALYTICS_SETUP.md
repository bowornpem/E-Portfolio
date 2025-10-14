# Google Analytics Setup Guide

## เปิดใช้งาน Google Analytics สำหรับ Portfolio Website

### ขั้นตอนที่ 1: สร้าง Google Analytics Account

1. ไปที่ [Google Analytics](https://analytics.google.com/)
2. คลิก **"Start measuring"** หรือ **"เริ่มใช้งาน"**
3. ตั้งชื่อ Account: `Boworn Portfolio` หรือชื่อที่ต้องการ
4. เลือก Country: **Thailand**
5. คลิก **Next**

### ขั้นตอนที่ 2: สร้าง Property

1. ตั้งชื่อ Property: `Portfolio Website`
2. เลือก Time zone: **Thailand (GMT+7)**
3. เลือก Currency: **Thai Baht (THB)**
4. คลิก **Next**

### ขั้นตอนที่ 3: เลือกประเภทธุรกิจ

1. Industry category: เลือก **"Education"** หรือ **"Professional services"**
2. Business size: เลือก **"Small"** หรือ **"Medium"**
3. เลือกวัตถุประสงค์การใช้งาน
4. คลิก **Create**

### ขั้นตอนที่ 4: เลือก Platform

1. เลือก **"Web"**
2. ใส่ Website URL: `https://bowornpem.github.io`
3. ใส่ Stream name: `E-Portfolio`
4. คลิก **Create stream**

### ขั้นตอนที่ 5: คัดลอก Measurement ID

1. หลังจากสร้าง stream แล้ว จะเห็น **Measurement ID** (รูปแบบ: `G-XXXXXXXXXX`)
2. **คัดลอก Measurement ID นี้**

### ขั้นตอนที่ 6: อัปเดต Website Code

1. เปิดไฟล์ `index.html`
2. หาบรรทัดที่มี `G-XXXXXXXXXX` (มี 2 จุด)
3. แทนที่ `G-XXXXXXXXXX` ด้วย Measurement ID ที่คัดลอกมา

**ตัวอย่าง:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-ABC123XYZ');
</script>
```

### ขั้นตอนที่ 7: Deploy ไปยัง GitHub

```bash
cd /Users/bowornpb/Documents/E-Portfolio
git add index.html
git commit -m "Add Google Analytics tracking ID"
git push
```

### ขั้นตอนที่ 8: ตรวจสอบว่าทำงาน

1. กลับไปที่ Google Analytics Dashboard
2. ไปที่ **Reports** > **Realtime**
3. เปิด website ของคุณในแท็บใหม่: `https://bowornpem.github.io/E-Portfolio/`
4. ภายใน 1-2 นาที จะเห็นตัวเองปรากฏใน **Realtime report**

---

## ข้อมูลที่จะเห็นใน Google Analytics

### 1. **Realtime Report**
- จำนวนผู้เข้าชมในขณะนี้
- หน้าที่กำลังเปิดอยู่
- ประเทศของผู้เข้าชม
- อุปกรณ์ที่ใช้ (Desktop/Mobile/Tablet)

### 2. **Acquisition Report**
- แหล่งที่มาของผู้เข้าชม (Google Search, LinkedIn, Direct, etc.)
- Medium (Organic, Referral, Social, etc.)

### 3. **Engagement Report**
- หน้าที่ได้รับความนิยมมากที่สุด
- ระยะเวลาที่ผู้เข้าชมอยู่ในเว็บ
- Bounce rate (อัตราการออกจากเว็บทันที)

### 4. **Demographics Report**
- ประเทศ/เมือง ของผู้เข้าชม
- ภาษาที่ใช้
- อายุและเพศ (ถ้ามีข้อมูลเพียงพอ)

### 5. **Technology Report**
- Browser ที่ใช้ (Chrome, Safari, Firefox, etc.)
- Operating System (Windows, Mac, iOS, Android)
- Screen Resolution

---

## Visitor Counter Badge

เว็บไซต์ของคุณมี **Visitor Counter Badge** แล้วที่ Footer ซึ่งแสดง:
- 📊 **Today's visitors**: จำนวนผู้เข้าชมวันนี้
- 📈 **Total visitors**: จำนวนผู้เข้าชมทั้งหมด

Badge นี้ใช้บริการ **hits.sh** ซึ่งนับจำนวนผู้เข้าชมอัตโนมัติและแสดงผลแบบ real-time

---

## เคล็ดลับในการใช้ Google Analytics

### สำหรับ Job Search:
1. **ดู Traffic Sources** - รู้ว่า recruiter มาจากไหน (LinkedIn, Google, Direct)
2. **ดู Page Views** - รู้ว่า recruiter สนใจส่วนไหนมากที่สุด
3. **ดู Average Session Duration** - รู้ว่า recruiter อ่านนานแค่ไหน
4. **ดู Geographic Location** - รู้ว่ามีบริษัทจากประเทศไหนสนใจ

### Custom Events (ขั้นสูง):
คุณสามารถติดตามเหตุการณ์เฉพาะได้ เช่น:
- คลิกปุ่ม "Download Resume"
- คลิกปุ่ม "Send Email"
- คลิกลิงก์ LinkedIn
- คลิกดูโปรเจกต์

---

## หมายเหตุ

- ข้อมูลจะเริ่มเก็บหลังจากติดตั้ง Google Analytics เท่านั้น
- ข้อมูลย้อนหลังไม่สามารถดูได้
- **Realtime Report** แสดงข้อมูลทันที แต่ **Standard Report** อาจต้องรอ 24-48 ชั่วโมง
- Google Analytics ฟรี 100% และสามารถเก็บข้อมูลได้ไม่จำกัด

---

## ต้องการความช่วยเหลือ?

ถ้ามีปัญหาในการตั้งค่า สามารถดู:
- [Google Analytics Help Center](https://support.google.com/analytics/)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
