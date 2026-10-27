# build-a-website

Sito personale costruito con Next.js (App Router), Tailwind CSS v4 e TypeScript.

## Stack

- **Next.js** App Router, segmento di lingua `[locale]` (IT default, EN)
- **Tailwind CSS v4** con token in `src/app/globals.css`
- **shadcn/ui** pattern (Radix + cva) per i primitivi in `src/components/ui`
- **Velite** per il blog: MDX in `content/blog`, schema validato al build
- **Zod** per la validazione delle variabili d'ambiente
- **Biome** per lint e formattazione, **Vitest** per i test unitari

## Avvio

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Script

| Comando | Descrizione |
| --- | --- |
| `npm run dev` | Velite + dev server |
| `npm run build` | Velite + build di produzione |
| `npm run lint` | Biome check |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest |

## Stato

- Contenuti e testi: segnaposto, da sostituire.
- Chatbot (`/api/chat`): placeholder, non chiama ancora Gemini.
- Newsletter: form senza backend, da collegare.
