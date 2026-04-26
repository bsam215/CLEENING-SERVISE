# دليل استضافة موقع خدمة التنظيف (Open Studio)

## معلومات المشروع
- **اسم المشروع**: Open Studio (خدمة التنظيف)
- **النوع**: تطبيق React مع TanStack Start
- **البناء**: تم البناء بنجاح في `dist/` folder
- **التاريخ**: 26 أبريل 2026

---

## البيئة والمتطلبات

### البيئة الموصى بها للاستضافة:
- **Cloudflare Pages** (الأولوية الأولى - مدمجة في المشروع)
- **Vercel**
- **Netlify**
- **أي خادم Node.js أو Deno

### المتطلبات:
- Node.js 18+ (أو Bun)
- npm أو yarn أو pnpm

---

## 1️⃣ الاستضافة على Cloudflare Pages (الطريقة الموصى بها)

### الخطوات:

#### أولاً: إعداد Cloudflare
1. انتقل إلى https://dash.cloudflare.com
2. قم بالتسجيل أو تسجيل الدخول
3. اختر "Pages" من القائمة الجانبية
4. اضغط "Create a project" → "Connect to Git"

#### ثانياً: ربط المستودع (Repository)
1. اختر منصة Git (GitHub, GitLab, أو Bitbucket)
2. اختر المستودع `open-studio-main`
3. اضغط "Begin Setup"

#### ثالثاً: إعدادات البناء
استخدم الإعدادات التالية:

**Build settings:**
- **Framework preset**: None (Custom)
- **Build command**: `npm install && npm run build`
- **Build output directory**: `dist/client`
- **Root directory**: `/` (or empty)

**Environment variables** (إذا لزم الأمر):
- إضافة أي متغيرات بيئة مطلوبة

#### رابعاً: نشر الموقع
1. اضغط "Save and Deploy"
2. سيبدأ البناء تلقائياً
3. سيحصل موقعك على عنوان URL مجاني

---

## 2️⃣ الاستضافة على Vercel

### الخطوات:

1. **انتقل إلى**: https://vercel.com
2. **قم بالتسجيل** واختر GitHub
3. **استيراد المشروع**:
   ```
   - اختر المستودع open-studio-main
   ```

4. **إعدادات المشروع**:
   - **Framework**: React
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/client`

5. **متغيرات البيئة**: أضف أي متغيرات مطلوبة
6. **اضغط Deploy**

---

## 3️⃣ الاستضافة على Netlify

### الخطوات:

1. **انتقل إلى**: https://netlify.com
2. **قم بالتسجيل** واختر GitHub
3. **اختر المستودع**: open-studio-main

4. **إعدادات البناء**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/client`

5. **متغيرات البيئة**: أضف متغيرات البيئة المطلوبة
6. **انقر Deploy**

---

## 4️⃣ الاستضافة على خادم خاص (VPS/Dedicated)

### المتطلبات:
- Node.js 18+ مثبت
- PM2 أو Forever أو Docker
- Nginx أو Apache كـ Reverse Proxy

### الخطوات:

#### أ) نسخ الملفات إلى الخادم:
```bash
scp -r dist/ user@server:/var/www/open-studio/
scp -r package.json user@server:/var/www/open-studio/
scp -r package-lock.json user@server:/var/www/open-studio/
```

#### ب) تثبيت المتطلبات على الخادم:
```bash
cd /var/www/open-studio
npm install --production
```

#### ج) تشغيل التطبيق باستخدام PM2:
```bash
npm install -g pm2
pm2 start "node dist/server/index.js" --name "open-studio"
pm2 save
pm2 startup
```

#### د) إعداد Nginx كـ Reverse Proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### هـ) تفعيل HTTPS باستخدام Let's Encrypt:
```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 5️⃣ ملفات مهمة للنشر

### `dist/` - مجلد البناء النهائي
```
dist/
├── client/          # ملفات الواجهة الأمامية (Static)
│   ├── assets/
│   ├── index.html
│   └── ...
└── server/          # ملفات الخادم (Server-side rendering)
    ├── index.js
    ├── wrangler.json
    └── ...
```

### ملفات الإعدادات:
- **`wrangler.jsonc`**: إعدادات Cloudflare
- **`package.json`**: المتطلبات والنصوص
- **`tsconfig.json`**: إعدادات TypeScript

---

## 🔐 متغيرات البيئة

### متغيرات البيئة المطلوبة (إن وجدت):
```env
# أضف أي متغيرات بيئة مطلوبة هنا
# مثال:
# VITE_API_URL=https://api.example.com
# DATABASE_URL=...
```

---

## 📊 معلومات الأداء

### حجم البناء:
- **Client Bundle**: ~551 KB (minified)
- **Server Bundle**: ~732 KB
- **CSS**: ~97 KB
- **Images**: ~1.8 MB

### التوصيات:
1. **تفعيل الضغط**: gzip/brotli على الخادم
2. **تخزين مؤقت**: تفعيل CDN للملفات الثابتة
3. **تحسين الصور**: استخدام صور مضغوطة
4. **Code Splitting**: تم تطبيقه تلقائياً

---

## 🧪 الاختبار قبل النشر

### اختبار محلي:
```bash
npm run preview
```

### اختبار الإنتاج:
```bash
npm run build
npm run preview
```

---

## 🔄 التحديثات والصيانة

### للتحديث على الخادم:
1. اسحب التغييرات الجديدة من Git
2. قم بتشغيل `npm run build`
3. انسخ `dist/` الجديدة
4. أعد تشغيل التطبيق

### إعادة تشغيل على Cloudflare:
- تحديثات تلقائية عند الـ push إلى Git

### إعادة تشغيل على VPS:
```bash
pm2 restart open-studio
```

---

## 🆘 استكشاف الأخطاء

### المشكلة: الموقع يعرض 404
**الحل**: تحقق من أن `dist/client/` تحتوي على `index.html`

### المشكلة: الأصول (Assets) لا تظهر
**الحل**: تحقق من مسارات الملفات في الإعدادات

### المشكلة: بطء الموقع
**الحل**:
1. فعّل الضغط (gzip)
2. استخدم CDN
3. حسّن حجم الصور
4. قلل حجم Bundle

### المشكلة: الخطأ عند البناء
**الحل**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📞 الدعم والمراجع

### روابط مفيدة:
- [Cloudflare Pages](https://pages.cloudflare.com)
- [Vercel Deploy](https://vercel.com)
- [Netlify Deploy](https://netlify.com)
- [TanStack Start](https://tanstack.com/start/latest)
- [Vite Guide](https://vitejs.dev)

---

## ✅ قائمة التحقق قبل النشر

- [ ] تم البناء بدون أخطاء
- [ ] تم اختبار الموقع محلياً
- [ ] تم إضافة متغيرات البيئة
- [ ] تم إعداد النطاق (Domain)
- [ ] تم تفعيل HTTPS
- [ ] تم إعداد النسخة الاحتياطية
- [ ] تم إعداد المراقبة (Monitoring)

---

تم الإعداد بواسطة: OpenCode Agent
تاريخ الإعداد: 26 أبريل 2026
