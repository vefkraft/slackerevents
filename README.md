# 🎟️ SlackerEvent – Server - Built with love, caffeine, and a sprinkle of frustration ☕💻

✅ Directus installed and fully bootstrapped

✅ MySQL database hosted on Railway (easy, free, realtime sync)

✅ Team members can connect to shared DB and see live data (just link + start)

✅ README written → fast setup and onboarding for developers

✅ Everything is ready for production deployment with easy CMS access

✅ Client just logs in → adds products/events → instantly live on the website

---

```bash
npm install -g @railway/cli
railway login
railway link
```

## 🚀 Getting started

### 0. Install global CLI tools (only once)

Install Directus and Railway CLI globally:

```bash

npm install -g directus @railway/cli
```

---

### 1. Clone project

```bash

git clone <repo-url>
cd SlackerEvent
cd server
```

---

### 2. Install dependencies

```bash

npm install
```

---

### 3. Connect to Railway

Then log in and link the project (inside /server folder):

```bash

railway login
railway link
```

---

### 4. Add environment variables

Copy .env.example to a new .env file:

```bash

cp .env.example .env
```

---

### 5. Start Directus

```bash

npx directus start
```

---

# 🛠 Troubleshooting

❗️ PORT 'ALREADY IN USE' ?

## Step 1: Find PID

```bash
lsof -i :8055
```

## Step2: Kill the process

```bash

kill -9 <PID number>
```

Port 8055 is now free 🚀

Now try running:

```bash

npx directus start
```

---
