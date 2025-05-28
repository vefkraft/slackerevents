# 🧩 SlackerEvent – Client

This is the frontend of SlackerEvent, built with React, TypeScript, and Tailwind CSS.It connects to the Directus backend hosted on Railway, showing real-time content from the CMS.

---

# ⚙️ Stack

⚛️ React

🟦 TypeScript

🎨 Tailwind CSS

🔀 React Router DOM

---

# 🚀 Getting Started

### 0. Install Global Tools (only if needed)

If you don’t already have Vite installed globally:

```bash

npm install -g vite
```

---

### 1. Clone Project

```bash

git clone <repo-url>
cd SlackerEvent
cd client
```

---

### 2. Install Dependencies

```bash

npm install
```

---

### 3. Run the Dev Server

```bash

npm run dev
```

---

# 🛠 Troubleshooting

❗️ PORT 'ALREADY IN USE' ?

## Step 1: Find PID

```bash
lsof -i :5173
```

## Step2: Kill the process

```bash

kill -9 <PID number>
```

Now try running:

```bash

npm run dev
```

# 🏁 Ready to build

Happy coding 🎉
