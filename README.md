# Birthday surprise website

A personal, cinematic birthday experience. All names, messages, photos, and music live in **one file**: `src/config/birthdayConfig.js`.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build
npm run preview
```

## Personalize

1. Open `src/config/birthdayConfig.js`.
2. Change `name`, `yourName`, `birthday`, and every message.
3. Photographs are already in `public/images/` (`photo1.jpg` … `photo23.jpg`).
4. Add **Kaafi Hai Na** yourself as `public/music/kaafi-hai-na.mp3`. Copyrighted songs cannot be downloaded into the project from the internet.

Music starts when she taps **Open Your Surprise**. Browsers will not autoplay audio before that click.

## Deploy on Vercel

1. Push this project to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Deploy. After it is live, replace the placeholder photos and music, then redeploy.

Or from the terminal after installing Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Deploy on Netlify

1. Push this project to GitHub.
2. Go to [netlify.com](https://www.netlify.com) → **Add new site** → import the repo.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy.

Or drag the `dist` folder onto Netlify after `npm run build`.
