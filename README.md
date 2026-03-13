# Artificial Immersion
### Language Learning Platform by GoluremiLanguages.com

## Quick Setup

1. Add your API key — create a `.env` file in the root folder:
```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

2. Install and run locally:
```bash
npm install
npm run dev
```

3. Build for deployment:
```bash
npm run build
```

## Deploy to Vercel
1. Push this folder to GitHub
2. Import the GitHub repo on vercel.com
3. Add `VITE_ANTHROPIC_API_KEY` in Vercel → Settings → Environment Variables
4. Deploy — done!

## Features
- 3 roles: Student, Tutor, Admin
- 5 languages: Spanish, French, German, Italian, English
- AI lesson generation (vocabulary, verbs, stories, dialogues, exercises)
- Core library with foundation vocabulary and grammar
- Monthly test booking system
- Full member management
