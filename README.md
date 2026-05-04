# Al-Hijaz Travel & Recruitment — Angular 17+ App

A full-stack Angular 17+ web application for a travel & recruitment agency offering Umrah packages, Hajj packages, and overseas job listings.

---

## 🚀 Quick Start

### 1. Clone / unzip the project

```bash
cd al-hijaz
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com) → Create project
2. Enable **Firestore**, **Authentication** (Email/Password), and **Storage**
3. Copy your config into `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey:            'YOUR_API_KEY',
    authDomain:        'YOUR_PROJECT.firebaseapp.com',
    projectId:         'YOUR_PROJECT_ID',
    storageBucket:     'YOUR_PROJECT.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId:             'YOUR_APP_ID',
  },
};
```

Also update `src/environments/environment.production.ts` with production values.

### 4. Deploy Firestore security rules

```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```

### 5. Seed sample data (optional)

```bash
npm install firebase-admin
# Set service account credentials:
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
node scripts/seed-firestore.js
```

### 6. Run locally

```bash
npm start
# App available at http://localhost:4200
```

---

## 🏗 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts         # Firebase Auth
│   │   │   ├── packages.service.ts     # Firestore packages CRUD
│   │   │   ├── jobs.service.ts         # Firestore jobs CRUD
│   │   │   └── theme.service.ts        # Dark/light mode (signals)
│   │   ├── guards/
│   │   │   └── auth.guard.ts           # Route protection
│   │   └── models/
│   │       ├── package.model.ts        # Package interface
│   │       └── job.model.ts            # Job interface
│   ├── shared/
│   │   ├── navbar/navbar.component.ts
│   │   ├── footer/footer.component.ts
│   │   └── card/
│   │       ├── package-card.component.ts
│   │       └── job-card.component.ts
│   ├── pages/
│   │   ├── home/home.component.ts
│   │   ├── umrah/
│   │   │   ├── umrah-list/
│   │   │   └── umrah-detail/
│   │   ├── hajj/
│   │   │   ├── hajj-list/
│   │   │   └── hajj-detail/
│   │   ├── jobs/
│   │   │   ├── jobs-list/
│   │   │   └── job-detail/
│   │   ├── about/
│   │   ├── contact/
│   │   └── admin/
│   │       ├── admin.component.ts      # Dashboard (auth-protected)
│   │       └── login/login.component.ts
│   ├── app.routes.ts
│   ├── app.config.ts                   # Firebase providers
│   └── app.component.ts
├── environments/
│   ├── environment.ts
│   └── environment.production.ts
└── styles.scss                         # Tailwind + global CSS
```

---

## 🔥 Firebase Collections

### `packages`
| Field         | Type       | Description                     |
|---------------|------------|---------------------------------|
| type          | string     | `'umrah'` or `'hajj'`           |
| title         | string     | Package name                    |
| price         | number     | Price per person (USD)          |
| duration      | string     | e.g. "14 Days / 13 Nights"      |
| departure     | string     | Departure city                  |
| departureDate | Timestamp  | Departure date                  |
| seats         | number     | Available seats                 |
| includes      | string[]   | What's included                 |
| excludes      | string[]   | What's excluded                 |
| itinerary     | object[]   | `{day, title, description}[]`   |
| images        | string[]   | Firebase Storage URLs           |
| featured      | boolean    | Show on homepage                |
| tier          | string     | Economy / Standard / Premium / VIP |

### `jobs`
| Field        | Type      | Description            |
|--------------|-----------|------------------------|
| title        | string    | Job title              |
| company      | string    | Company name           |
| country      | string    | Country                |
| category     | string    | e.g. Construction      |
| salary       | string    | Salary range           |
| experience   | string    | Required experience    |
| deadline     | Timestamp | Application deadline   |
| description  | string    | Job description        |
| requirements | string[]  | List of requirements   |
| logo         | string    | Emoji or Storage URL   |
| featured     | boolean   | Show on homepage       |

---

## 🛠 Tech Stack

| Technology          | Purpose                          |
|---------------------|----------------------------------|
| Angular 17+         | Framework (standalone components)|
| Angular Signals     | Reactive state management        |
| Firebase Firestore  | Database                         |
| Firebase Auth       | Admin authentication             |
| Firebase Storage    | Image / CV uploads               |
| AngularFire         | Official Firebase SDK for Angular|
| Tailwind CSS v3     | Utility-first styling            |
| Angular Router      | Lazy-loaded page routing         |

---

## 🔐 Admin Access

1. Create a Firebase Auth user in the Firebase Console (Email/Password)
2. Visit `/admin/login`
3. Sign in with your admin credentials
4. You'll be redirected to the admin dashboard

---

## 🚢 Deploy to Firebase Hosting

```bash
npm run build
firebase deploy
```

---

## 📦 Key Commands

```bash
npm start          # Run dev server (localhost:4200)
npm run build      # Production build
firebase deploy    # Deploy to Firebase Hosting
node scripts/seed-firestore.js  # Seed sample data
```

---

## 🎨 Customisation

- **Colors**: Edit `tailwind.config.js` → `theme.extend.colors`
- **Fonts**: Edit `src/index.html` Google Fonts link + `tailwind.config.js`
- **Firebase config**: `src/environments/environment.ts`
- **Navigation links**: `src/app/shared/navbar/navbar.component.ts`
- **Home stats/features/testimonials**: `src/app/pages/home/home.component.ts`

---

*Built with ❤ for Al-Hijaz Travel & Recruitment*
