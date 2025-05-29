# SlackerEvent

Fullstack project with **React frontend** & **Directus backend**.  
Backend runs with MySQL (via Railway), frontend is ready for Netlify deployment.

---

## 📁 Project-structur

/client → React frontend (Vite + TypeScript + TailwindCSS...)
/server → Directus backend (MySQL...)

---

## 🚀 Get startet

### 1. Clone repo og install:

```bash

git clone https://github.com/vefkraft/slackerevents.git
cd slackerevents
```

### 2. Start Frontend

```bash

cd client
cp .env.example .env # With VITE_API_URL=http://localhost:8055 or given url
npm install
npm run dev
```

### 3. Start Backend

```bash

cd server
cp .env.example .env # Insert your own db variables or given admin variables
npm install
npx directus start
```

---

## Naming-convention of you created folders

Are you creating a folder? Give it a name that descripe it as much as possible.
Finish with a "dot" its origin.

- Example: pages -> Home.page

- Example: components -> Event.component

---

```

```
