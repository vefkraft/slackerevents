# SlackerEvent – Client

Welcome to the SlackerEvent client!  
This is a Next.js frontend project styled with [Tailwind CSS](https://tailwindcss.com/) and custom CSS variables.

test

---

## 🚀 Getting Started

Follow these steps to get the project running locally:

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_ORG/SlackerEvent.git
cd SlackerEvent/client
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Create your `.env.local`

Copy `.env.example` to `.env.local` and update the values as needed.

### 4. Start the development server

```bash
npm run dev
```

The app will usually be available at [http://localhost:3000](http://localhost:3000).

---

## 📦 General Info

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS + custom CSS variables
- **Authentication:** NextAuth.js
- **API:** Connects to backend via environment variables

### Project Structure

```
client/
  ├── src/
  │   ├── app/           # Next.js app routes
  │   ├── components/    # Reusable React components
  │   ├── hooks/         # Custom hooks
  │   ├── styles/        # CSS, Tailwind, variables
  │   └── ...
  ├── public/            # Public assets (images, icons, etc.)
  ├── tailwind.config.js
  └── ...
```

---

## 🧭 Guides & Tips

Add your own guides for navigation, Next.js, or anything else here!

### Navigating the Codebase

- **Pages:** Located in `src/app/` using the [Next.js App Router](https://nextjs.org/docs/app).
- **Links:** Use `<Link href="/route">` from `next/link` for navigation.
- **Dynamic routes:** Create `[slug]/page.tsx` for dynamic pages.

### Styling

- **Tailwind:** Use utility classes directly in `className`.
- **Custom colors:** Use CSS variables from `variables.css` with e.g.
  `text-[var(--color-acidYellow)]`.

### Other Tips

- **Environment variables:** Always keep sensitive keys in `.env.local` (never commit them).
- **Restart the dev server** after changing Tailwind config or environment files.
- **Security:** Only allow internal redirects (see the navigation component in bottom for an example).

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

---

## ✍️ Add Your Own Guides Here

> _Use this section for onboarding notes, code examples, or extra team tips!_

---

Happy coding! 🚀
