# LeetCode Stats Card

Show your dynamically generated LeetCode stats on your GitHub profile or your website. This project keeps the same Vite + React + Express + Netlify Functions architecture as the HackerRank card, but mirrors the visual design, API, and feature set of the LeetCode Stats Card service.

**Live demo:** https://leetcode-stats-card.netlify.app/

---

## Screenshots
![Demo](screenshots/screencapture-leetcode-stats-card-netlify-app-2025-12-29-16_56_59.png)

## Features

- Clean and simple LeetCode stats, for both `us` and `cn` sites
- Multiple themes and 1,300+ fonts
- Fully customizable using CSS overrides
- Activity / contest / heatmap extensions
- Cache controls and hideable elements
- Serverless-friendly API (`/api/leetcode-card` or `/:username`)

---

## Usage

Copy the code below, paste it into your `README.md`, and change the path to your LeetCode username (case-insensitive).

```md
![Leetcode Stats](https://leetcode-stats-card.netlify.app/ShaonMajumder)
```

Want a hyperlink? Try this:

```md
[![Leetcode Stats](https://leetcode-stats-card.netlify.app/ShaonMajumder)](https://leetcode.com/ShaonMajumder)
```

### Endpoint

The primary endpoint is:

```
https://leetcode-stats-card.netlify.app/
```

You can also call the Express route directly:

```
https://leetcode-stats-card.netlify.app/api/leetcode-card?username=ShaonMajumder
```

---

## Options

Pass options as query params.

#### `site` (default: `us`)

Data source, `us` or `cn`.

```
https://leetcode-stats-card.netlify.app/leetcode?site=cn
```

#### `theme` (default: `light,dark`)

Card theme. Use a comma to separate light and dark themes.

```
https://leetcode-stats-card.netlify.app/shaonmajumder?theme=unicorn
https://leetcode-stats-card.netlify.app/shaonmajumder?theme=light,unicorn
```

#### `colors` (default: `""`)

Override the card palette with a comma-separated list of hex colors:

`colors=bg0,bg1,text0,text1,color0,color1,color2,color3`

Example:

```
https://leetcode-stats-card.netlify.app/shaonmajumder?colors=012a4a,013a63,a9d6e5,ffffff,0077b6,0096c7,00b4d8,90e0ef
```

#### `font` (default: `Baloo_2`)

Use any Google Font name (case-insensitive).

```
https://leetcode-stats-card.netlify.app/shaonmajumder?font=Dancing_Script
```

#### `width` and `height` (default: `500` and `200`)

Change the card size (content does not scale automatically).

```
https://leetcode-stats-card.netlify.app/shaonmajumder?width=500&height=500
```

#### `border` and `radius` (default: `1` and `4`)

Change the card border and radius.

```
https://leetcode-stats-card.netlify.app/shaonmajumder?border=0&radius=20
```

#### `animation` (default: `true`)

Enable/disable animation.

```
https://leetcode-stats-card.netlify.app/shaonmajumder?animation=false
```

#### `hide` (default: `""`)

Hide specific elements (comma-separated ids).

```
https://leetcode-stats-card.netlify.app/shaonmajumder?hide=ranking,total-solved-text,easy-solved-count,medium-solved-count,hard-solved-count
```

#### `ext` (default: `""`)

Extension to render, one at a time: `activity`, `contest`, or `heatmap`.

```
https://leetcode-stats-card.netlify.app/shaonmajumder?ext=activity
```

#### `cache` (default: `60`)

Cache time in seconds.

```
https://leetcode-stats-card.netlify.app/shaonmajumder?cache=0
```

#### `sheets` (default: `""`)

External stylesheets (comma-separated URLs). They are injected in order.

```
https://leetcode-stats-card.netlify.app/shaonmajumder?sheets=url1,url2
```

#### Legacy Options

| Key             | Description                  | Default Value |
| --------------- | ---------------------------- | ------------- |
| `border_radius` | Same as `radius`             | `4`           |
| `show_rank`     | Display/Hide Rank: `Boolean` | `true`        |
| `extension`     | Same as `ext`                | `""`         |

---

## Getting Started

### 1. Prerequisites

- Node.js **18+**
- npm **10+**

### 2. Installation

```bash
git clone <your-repo-url>
cd leetcode-stats-card
npm install
```

### 3. Environment Variables

Create `.env` (already gitignored):

```bash
VITE_API_BASE_URL=""
```

Leave empty for same-origin calls in production. In dev, you can set this to `http://localhost:8787`.

### 4. Run locally

```bash
npm run dev
```

---

## Project Structure

```
leetcode-stats-card/
|-- src/
|   |-- data/google-fonts.ts  # Google font list for the playground
|   `-- pages/Index.tsx       # Main UI for generating cards
|-- server/
|   |-- app.js                # Express app shared by dev server + Netlify
|   `-- leetcode/             # LeetCode card generator + extensions
|-- netlify/
|   `-- functions/
|       `-- leetcode-card.js  # serverless-http wrapper
|-- netlify.toml              # Build + redirect configuration
|-- package.json
`-- README.md
```

---

## Deployment (Netlify)

1. Connect the repository in Netlify.
2. Netlify runs `npm run build` and publishes `dist/`.
3. `/api/*` and `/:username` routes are redirected to `/.netlify/functions/leetcode-card`.

---

## Author & Credits

**Built and maintained by [Shaon Majumder](https://shaonresume.netlify.app)**  
Senior Software Engineer - AI & Scalability

**Connect**

- Portfolio: https://shaonresume.netlify.app
- GitHub: https://github.com/ShaonMajumder
- LinkedIn: https://www.linkedin.com/in/shaonmajumder
- Medium: https://medium.com/@shaonmajumder
- Resume: https://shaonresume.netlify.app/resume.html

---

Happy coding! Feel free to open an issue or PR if you build something cool with the HackerRank Stats Card.
