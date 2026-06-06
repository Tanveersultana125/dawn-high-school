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
2. **Authentication** → *Get started* → **Sign-in method** → enable **Google**
   (set a support email and save). No need to add users — login is Google-only.
3. **Authentication → Settings → Authorized domains** → make sure `localhost`
   is listed (it is by default). Add your live domain when you deploy.
4. **Firestore → Rules** → paste the rules below → *Publish*.

> Admin access is locked to **dgionemployee03@gmail.com** in code
> (`src/context/AuthContext.jsx`, `ALLOWED_EMAIL`). Any other Google account is
> signed out immediately. To change the admin, edit that constant **and** the
> email in the Firestore rules below.

### Firestore security rules

Public can submit forms and view gallery media; only the admin account can read
enquiries or manage media:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null
        && request.auth.token.email == 'dgionemployee03@gmail.com';
    }

    // Contact / admission enquiries
    match /enquiries/{doc} {
      allow create: if true;            // anyone can submit a form
      allow read, update, delete: if isAdmin();
    }

    // Gallery media (images + videos)
    match /media/{doc} {
      allow read: if true;              // public gallery
      allow write: if isAdmin();        // only admin uploads / deletes
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
| `/admin/login`  | Google-only login, restricted to the admin email. |
| `/admin`        | Protected dashboard — lists submissions, mark done, delete. |
| `/admin/media`  | Upload images & videos (→ Cloudinary), shown publicly on the Gallery. |
| `/gallery`      | Public gallery — admin uploads appear first, then the sample images. |

Key files: `src/lib/firebase.js`, `src/lib/enquiries.js`, `src/lib/media.js`,
`src/lib/cloudinary.js`, `src/context/AuthContext.jsx`, `src/pages/AdminLogin.jsx`,
`src/pages/AdminDashboard.jsx`, `src/pages/AdminMedia.jsx`.
