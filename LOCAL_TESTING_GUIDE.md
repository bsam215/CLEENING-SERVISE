# 🧪 دليل الاختبار المحلي قبل الرفع على GitHub

## الخطوة 1: تحضير البيئة المحلية

### 1.1 انسخ ملف متغيرات البيئة
```bash
# من المشروع
cd "C:\Users\PC\Downloads\المشاريع\خدمة التنظيف\open-studio-main"

# انسخ الملف
copy .env.local.example .env.local

# عدّل المتغيرات حسب احتياجك (اختياري)
# لكن الإعدادات الافتراضية تعمل
```

### 1.2 تأكد من تثبيت المتطلبات
```bash
npm install --legacy-peer-deps
```

---

## الخطوة 2: الاختبار المحلي

### 2.1 تشغيل الموقع في وضع التطوير
```bash
npm run dev
```

**الإخراج:**
```
VITE v7.3.2 dev server running at:
  ➜  Local:   http://localhost:5173/
```

**افتح المتصفح وانتقل إلى:**
```
http://localhost:5173
```

### 2.2 اختبر جميع الصفحات:
- [ ] الصفحة الرئيسية
- [ ] صفحة الخدمات
- [ ] صفحة التقييمات
- [ ] الروابط تعمل بشكل صحيح
- [ ] التصميم متجاوب (Responsive)

### 2.3 اختبر في متصفحات مختلفة:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (إذا كان متاحاً)
- [ ] Edge

---

## الخطوة 3: البناء للإنتاج

### 3.1 اختبر البناء
```bash
npm run build
```

**يجب أن ترى:**
```
✓ built in XX.XXs
✓ SSR built in XX.XXs
```

**بدون أخطاء! ✅**

### 3.2 معاينة البناء
```bash
npm run preview
```

**هذا يحاكي الإنتاج محلياً**

انتقل إلى: `http://localhost:4173`

### 3.3 اختبر الموقع في المعاينة:
- [ ] جميع الصفحات تعمل
- [ ] لا توجد أخطاء في Console
- [ ] الأداء تبدو طبيعية
- [ ] الأصول تحملت

---

## الخطوة 4: فحص الكود

### 4.1 فحص الأخطاء (Lint)
```bash
npm run lint
```

**يجب أن تكون:**
```
✓ No errors found
```

### 4.2 تنسيق الكود (Format) - اختياري
```bash
npm run format
```

---

## الخطوة 5: التحضير للرفع

### 5.1 تأكد من `.gitignore`

تأكد أن الملفات التالية **لن تُرفع**:
```
node_modules/     ✅ موجود في .gitignore
dist/            ✅ موجود في .gitignore
.env.local       ✅ موجود في .gitignore
.env             ✅ موجود في .gitignore
```

### 5.2 نظّف المشروع
```bash
# حذف dist (اختياري - GitHub سيبنيها)
rmdir /s dist

# تأكد من عدم وجود ملفات غير مطلوبة
git status
```

---

## الخطوة 6: الرفع النهائي على GitHub

### 6.1 هيّئ Git
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 6.2 أضف جميع الملفات
```bash
git add .
```

### 6.3 تحقق من الملفات المراد رفعها
```bash
git status
```

**يجب أن لا ترى:**
- ❌ node_modules
- ❌ dist
- ❌ .env.local
- ❌ .env

### 6.4 الـ Commit الأول
```bash
git commit -m "Initial commit: Open Studio project ready for deployment"
```

### 6.5 ربط مع GitHub
```bash
# استبدل YOUR_USERNAME بـ اسم حسابك
git remote add origin https://github.com/YOUR_USERNAME/open-studio.git
git branch -M main
git push -u origin main
```

---

## ✅ قائمة التحقق قبل الرفع:

### الاختبار:
- [ ] `npm run dev` يعمل بدون أخطاء
- [ ] جميع الصفحات تظهر بشكل صحيح
- [ ] الروابط تعمل
- [ ] الأصول (CSS/JS) محملة
- [ ] لا توجد أخطاء في Console

### البناء:
- [ ] `npm run build` بنجاح
- [ ] `npm run preview` يعمل
- [ ] `npm run lint` لا أخطاء

### Git:
- [ ] `git add .` تم
- [ ] `git commit` تم
- [ ] المشروع على GitHub

### Vercel:
- [ ] حساب Vercel تم إنشاؤه
- [ ] GitHub متصلة مع Vercel
- [ ] المشروع مستورد على Vercel
- [ ] البناء الأول نجح

---

## 🐛 استكشاف الأخطاء المحتملة:

### المشكلة: `npm run build` فشل

**الحل:**
```bash
# امسح node_modules والـ cache
rmdir /s node_modules
del package-lock.json

# أعد التثبيت
npm install --legacy-peer-deps

# حاول البناء مرة أخرى
npm run build
```

### المشكلة: `npm run dev` لا يبدأ

**الحل:**
```bash
# تأكد من استخدام Node.js 18+
node --version

# حاول إعادة التثبيت
npm install --legacy-peer-deps

# شغّل dev مرة أخرى
npm run dev
```

### المشكلة: الأصول لا تظهر في Preview

**الحل:**
```bash
# امسح dist
rmdir /s dist

# أعد البناء
npm run build

# حاول Preview مرة أخرى
npm run preview
```

### المشكلة: أخطاء في Lint

**الحل:**
```bash
# نسّق الكود تلقائياً
npm run format

# حاول Lint مرة أخرى
npm run lint
```

---

## 📝 أوامر مفيدة:

```bash
# التطوير
npm run dev          # تشغيل server التطوير

# البناء والاختبار
npm run build        # بناء للإنتاج
npm run preview      # معاينة الإنتاج

# الجودة
npm run lint         # فحص الأخطاء
npm run format       # تنسيق الكود

# Git
git status           # حالة المشروع
git log              # السجل
git diff             # الفروقات
```

---

## 🎯 الخطوات الموجزة:

```bash
# 1. الاختبار
npm run dev
# (اختبر الموقع في المتصفح)

# 2. البناء
npm run build
npm run preview
# (اختبر البناء)

# 3. الـ lint والـ format
npm run lint
npm run format

# 4. الرفع
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/open-studio.git
git branch -M main
git push -u origin main

# 5. Vercel
# - اذهب https://vercel.com
# - استيراد من GitHub
# - Deploy
# - الانتهاء!
```

---

## ✨ بعد الرفع:

### مراقبة Vercel:
1. اذهب إلى: https://vercel.com/dashboard
2. اختر open-studio
3. شاهد الـ deployment
4. اختبر الموقع الحي

### مستقبلاً:
- كل `git push` على GitHub
- Vercel سيعيد البناء تلقائياً
- الموقع يتحدث تلقائياً

---

**الآن أنت جاهز للنشر! 🚀**

تم التحضير: 26 أبريل 2026
