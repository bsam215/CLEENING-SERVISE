# Open Studio - خدمة التنظيف 🏠

موقع متخصص في خدمات التنظيف السكنية والتجارية

## 🚀 النشر السريع على Vercel من GitHub

### المتطلبات:
- حساب GitHub
- حساب Vercel (مجاني)

### الخطوات:

#### 1️⃣ رفع المشروع على GitHub

```bash
cd "C:\Users\PC\Downloads\المشاريع\خدمة التنظيف\open-studio-main"

# تهيئة git
git init
git add .
git commit -m "Initial commit: Open Studio"

# أنشئ مستودع على https://github.com/new
# ثم قم بـ:
git remote add origin https://github.com/YOUR_USERNAME/open-studio.git
git branch -M main
git push -u origin main
```

#### 2️⃣ ربط Vercel

1. اذهب إلى: https://vercel.com
2. اضغط "Import Git Repository"
3. اختر المستودع `open-studio`
4. الإعدادات ستكون مجهزة تلقائياً
5. اضغط "Deploy"

**الانتهاء! ✅**

---

## 📚 التعليمات الكاملة:

| الملف | الغرض |
|------|-------|
| **GITHUB_VERCEL_GUIDE.md** | شرح تفصيلي لـ GitHub + Vercel |
| **LOCAL_TESTING_GUIDE.md** | دليل الاختبار المحلي |
| **vercel.json** | إعدادات Vercel |
| **.gitignore** | ملفات لـ تجاهلها |

---

## 🧪 الاختبار المحلي:

```bash
# التطوير
npm run dev

# البناء
npm run build

# المعاينة
npm run preview

# Lint
npm run lint

# Format
npm run format
```

---

## 🌐 البيئة:

انسخ `.env.local.example` إلى `.env.local` وعدّل حسب احتياجك

```bash
copy .env.local.example .env.local
```

---

## 📂 هيكل المشروع:

```
open-studio/
├── src/                 # كود المشروع
├── dist/                # الملفات المترجمة (بعد البناء)
├── public/              # الملفات الثابتة
├── package.json         # المتطلبات
├── vercel.json          # إعدادات Vercel
├── .gitignore           # ملفات لـ تجاهلها
└── GITHUB_VERCEL_GUIDE.md  # دليل النشر
```

---

## ✅ قائمة التحقق:

- [ ] المشروع على GitHub
- [ ] Vercel متصلة
- [ ] البناء نجح
- [ ] الموقع يعمل

---

## 🔗 الروابط:

- **GitHub**: https://github.com
- **Vercel**: https://vercel.com
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev

---

## 📝 ملاحظات:

- جميع الملفات محضرة للنشر على Vercel
- لا تحتاج أي تعديلات إضافية
- فقط اتبع GITHUB_VERCEL_GUIDE.md
- كل push على GitHub = rebuild تلقائي على Vercel

---

**استعد للنشر! 🚀**

Made with ❤️ using React + TanStack Start
