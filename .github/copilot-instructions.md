# Copilot instructions

## Project overview

The Wetherby Papers is a React single-page mystery puzzle about Ambrose Wetherby's fictional estate papers. The investigation has six documents: inventory, letters, cipher, journal, surveyor's register, and testament. The first five stages are answered in sequence; the testament is the final reveal.

## Architecture

- `src/App.jsx` owns stage navigation, hints, answer submission, and saved progress. Progress is stored in `localStorage` under `wetherby-progress`.
- Each document's presentation lives in its own component under `src/components/`. Keep stage-specific content and interactions there; keep shared progression logic in `App.jsx` or `src/puzzle.js`.
- `src/styles.css` contains the global styles, layout, and shared design tokens. Reuse existing classes, colors, and typography before adding new patterns.
- Images and other static assets belong in `src/assets/`. Use `lucide-react` for interface icons.
- `api/check-answer.js` is the Vercel serverless endpoint for validating answers. It reads the five-answer JSON array from the server-side `PUZZLE_ANSWERS` environment variable.

## Puzzle and answer handling

- Keep answer keys out of client-side code and committed files. Configure `PUZZLE_ANSWERS` only in the server environment; `.env.example` documents the variable without supplying answers.
- Preserve the order of the five answer stages when changing stage navigation or answer validation.
- Keep hints progressive and avoid revealing later puzzle answers prematurely.
- Preserve the fictional-only location notice in the final document; do not introduce a real cache location.

## Code and UI conventions

- Use React function components and hooks, JavaScript/JSX, and ES modules.
- Follow the existing Prettier configuration: tabs, single quotes, and trailing commas.
- Use semantic HTML, accessible names for interactive controls, and the existing modal keyboard and dismissal patterns.
- Keep content, styling, and behavior changes focused. Add or update tests for behavior changes.

## Common commands

- `npm run dev` starts the Vite frontend.
- `npm run dev:vercel` starts the Vercel development server, including the answer-checking API.
- `npm test` runs the Vitest suite.
- `npm run lint` runs ESLint.
- `npm run build` creates the production build.
- `npm run format` formats the project files covered by the package script.
