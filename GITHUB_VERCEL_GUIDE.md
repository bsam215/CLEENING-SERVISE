# 🚀 نشر على Vercel من GitHub

## المتطلبات:

- ✅ حساب GitHub
- ✅ حساب Vercel (مجاني)
- ✅ المشروع جاهز

---

## 📋 خطوات النشر:

### 1️⃣ رفع المشروع على GitHub

#### أولاً: تهيئة المستودع محلياً

```bash
# انتقل للمشروع
cd "C:\Users\PC\Downloads\المشاريع\خدمة التنظيف\open-studio-main"

# هيّئ git
git init

# أضف جميع الملفات
git add .

# اكتب رسالة الـ commit
git commit -m "Initial commit: Open Studio project ready for Vercel"

# غيّر اسم الفرع إلى main (اختياري لكن موصى)
git branch -M main
```

#### ثانياً: أنشئ مستودع على GitHub

1. اذهب إلى: https://github.com/new
2. ادخل اسم المستودع: `open-studio`
3. اختر "Public" (أو Private إذا أردت)
4. لا تختر Initialize README
5. اضغط "Create repository"

#### ثالثاً: ربط المستودع المحلي بـ GitHub

```bash
# استبدل YOUR_USERNAME بـ اسم حسابك على GitHub
git remote add origin https://github.com/YOUR_USERNAME/open-studio.git

# رفع الملفات
git branch -M main
git push -u origin main
```

**الآن المشروع على GitHub! ✅**

---

### 2️⃣ ربط Vercel مع GitHub

#### الخطوة 1: اذهب إلى Vercel

```
https://vercel.com
```

#### الخطوة 2: تسجيل الدخول / إنشاء حساب

- اختر "Sign Up"
- اختر "Continue with GitHub"
- اتبع التعليمات

#### الخطوة 3: استيراد المشروع

1. بعد تسجيل الدخول، اختر "Add New..." 
2. اختر "Project"
3. اختر "Import Git Repository"
4. ابحث عن `open-studio` واختره
5. اضغط "Import"

---

### 3️⃣ إعدادات البناء على Vercel

عند استيراد المشروع، ستظهر هذه الشاشة:

#### إعدادات البناء الصحيحة:

```
Project Name:      open-studio
Framework Preset:  Other
Build Command:     npm run build
Output Directory:  dist/client
Install Command:   npm install --legacy-peer-deps
```

#### متغيرات البيئة (اختياري):

إذا كان لديك API endpoints أو متغيرات:

```
VITE_API_URL = https://your-api.com
OTHER_VAR = value
```

**ملاحظة**: يمكنك إضافتها لاحقاً من Settings

---

### 4️⃣ النشر الأول

```
اضغط: "Deploy"
```

**Vercel سيبدأ البناء تلقائياً! ⚡**

سترى:
- `Building...` - جاري البناء
- `Deployed!` - تم النشر بنجاح ✅

**الموقع الآن متاح على URL مثل:**
```
https://open-studio-xxx.vercel.app
```

---

## ✅ ما يحدث تلقائياً على Vercel:

1. **التثبيت**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **البناء**:
   ```bash
   npm run build
   ```

3. **النشر**:
   - الملفات من `dist/client/` تُرفع
   - CDN يوزع الملفات عالمياً
   - الموقع يعمل فوراً

---

## 🔄 التحديثات المستقبلية:

### كل مرة تعدّل الملفات:

```bash
# 1. اعدّل الملفات
# 2. أضفها إلى git
git add .

# 3. اكتب رسالة commit
git commit -m "Your changes description"

# 4. ارفع على GitHub
git push origin main
```

**Vercel سيعيد البناء والنشر تلقائياً! 🔄**

---

## 🎯 الملفات المهمة في المشروع:

### ✅ `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**الفائدة**: يخبر Vercel كيفية بناء المشروع

### ✅ `package.json`
```json
{
  "scripts": {
    "build": "vite build"
  }
}
```

**الفائدة**: يحتوي على أوامر البناء

### ✅ `.gitignore`
```
node_modules
dist
.env
```

**الفائدة**: يخفي الملفات الكبيرة عن GitHub

---

## 🔐 متغيرات البيئة:

### إضافة متغيرات البيئة على Vercel:

1. اذهب إلى Vercel Dashboard
2. اختر المشروع
3. Settings → Environment Variables
4. أضف المتغيرات:
   ```
   VITE_API_URL = https://api.example.com
   DATABASE_URL = your_database_url
   ```

### استخدامها في الكود:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🚨 استكشاف الأخطاء:

### المشكلة: Build Failed

**الحل**:
1. اذهب إلى Vercel Dashboard
2. اختر المشروع → Deployments
3. اختر الـ deployment الأخير
4. اقرأ رسالة الخطأ
5. عدّل الملف المطلوب
6. Push إلى GitHub
7. Vercel سيعيد المحاولة

### المشكلة: 404 Not Found

**الحل**:
- تأكد أن `vercel.json` فيه:
```json
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
```

### المشكلة: الأصول (CSS/JS) لا تظهر

**الحل**:
- تحقق من مسارات الملفات
- تأكد أن `dist/client/` موجود
- امسح الـ cache من المتصفح

---

## 📊 مراقبة الموقع:

### Dashboard الرئيسي:
```
https://vercel.com/dashboard
```

### معلومات المشروع:
```
Deployments: كل نشر
Analytics: إحصائيات الزوار
Logs: سجل الأخطاء
Settings: الإعدادات
```

---

## 🎯 ملخص الخطوات السريعة:

### في Terminal:
```bash
cd "C:\Users\PC\Downloads\المشاريع\خدمة التنظيف\open-studio-main"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/open-studio.git
git branch -M main
git push -u origin main
```

### على Vercel:
1. اذهب https://vercel.com
2. اضغط "Import Git Repository"
3. اختر open-studio
4. اضغط Deploy
5. الانتهاء! ✅

---

## ✨ ما بعد النشر:

### تحسينات إضافية:
- [ ] إضافة domain خاص
- [ ] تفعيل HTTPS (تلقائي)
- [ ] إعداد Analytics
- [ ] إضافة monitoring
- [ ] إعداد البريد الإلكتروني للتنبيهات

---

## 🔗 الروابط المهمة:

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub**: https://github.com
- **Vercel Docs**: https://vercel.com/docs

---

## 📝 نصائح مهمة:

1. **استخدم `.env.local` للمتغيرات السرية محلياً**
   ```
   VITE_API_KEY=secret_key
   ```

2. **لا ترفع `.env` على GitHub**
   - بالفعل في `.gitignore`

3. **اختبر محلياً قبل الـ push**
   ```bash
   npm run preview
   ```

4. **اكتب رسائل commit واضحة**
   ```bash
   git commit -m "Fix: header styling"
   git commit -m "Feature: add contact form"
   ```

---

## ✅ قائمة التحقق:

- [ ] المشروع موجود محلياً في المسار الصحيح
- [ ] `git init` تم تنفيذه
- [ ] المشروع مرفوع على GitHub
- [ ] Vercel متصلة مع GitHub
- [ ] البناء نجح على Vercel
- [ ] الموقع يعمل على الرابط المعطى
- [ ] جميع الصفحات تعمل
- [ ] الأصول تحملت بشكل صحيح

---

**الآن أنت جاهز! 🚀**

تم التحضير: 26 أبريل 2026
