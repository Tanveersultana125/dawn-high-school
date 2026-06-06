# Firebase + Cloudinary Setup

Everything in code is done. You only need to (1) finish `.env` and (2) flip a few
switches in the Firebase & Cloudinary consoles.

## 1. Fill `.env`

Copy `.env.example` → `.env` (already done) and paste your values. Restart
`npm run dev` after any change — Vite only reads env on startup.

## 2. Firebase Console (https://console.firebase.google.com)

Open project **downhighschool-2181a**, then:

1. **Firestore Database** → *Create database* → Start in **production mode** →
   pick a region (e.g. `asia-south1` / Mumbai).
2. **Authentication** → *Get started* → **Sign-in method** → enable
   **Email/Password**.
3. **Authentication → Users → Add user** → create your admin login
   (e.g. `admin@dawnhighschool.com` + a password). You log in with this at
   `/admin/login`.
4. **Firestore → Rules** → paste the rules below → *Publish*.

### Firestore security rules

Anyone can submit a form (create), but only a logged-in admin can read / edit /
delete submissions:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /enquiries/{doc} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## 3. Cloudinary (https://cloudinary.com) — for file uploads

1. Create a free account. Your **Cloud name** is shown on the dashboard.
2. **Settings → Upload → Add upload preset** → set **Signing Mode = Unsigned** →
   Save. Copy the preset name.
3. Put both into `.env`:
   - `VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name`
   - `VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset`

> Until Cloudinary is configured, the contact form simply hides the file-upload
> field and still saves everything else to Firestore. Nothing breaks.

## How it works

| Where | What happens |
|-------|--------------|
| `/contact` form | Saves to Firestore `enquiries` (type `contact`); optional file → Cloudinary, URL stored on the doc. |
| `/admin/login`  | Email/password admin login (Firebase Auth). |
| `/admin`        | Protected dashboard — lists submissions, mark done, delete. |

Key files: `src/lib/firebase.js`, `src/lib/enquiries.js`, `src/lib/cloudinary.js`,
`src/context/AuthContext.jsx`, `src/pages/AdminLogin.jsx`, `src/pages/AdminDashboard.jsx`.
