# Subhankar Pattnaik — Azure Solution Architect Portfolio

Production-grade portfolio website showcasing 6+ years of Azure architecture experience, built with vanilla HTML/CSS/JS.

## 🚀 Quick Deploy to GitHub Pages

### Option 1: Manual Deploy
1. Create a new repository on GitHub (e.g., `portfolio`)
2. Push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git remote add origin https://github.com/pattnaik-subhankar/portfolio.git
   git push -u origin main
   ```
3. Go to **Settings → Pages** in your repo
4. Set **Source** to `Deploy from a branch`, select `main` and `/ (root)`
5. Click **Save** — your site will be live at `https://pattnaik-subhankar.github.io/portfolio/`

### Option 2: Custom Domain
1. Add your domain to the `CNAME` file (edit the placeholder)
2. In GitHub repo **Settings → Pages**, enter your custom domain
3. Configure your DNS provider with the records described below

### DNS Configuration for Custom Domain
| Type  | Name  | Value                        |
|-------|-------|------------------------------|
| CNAME | www   | pattnaik-subhankar.github.io |
| A     | @     | 185.199.108.153              |
| A     | @     | 185.199.109.153              |
| A     | @     | 185.199.110.153              |
| A     | @     | 185.199.111.153              |

## 📁 Project Structure

```
portfolio-site/
├── index.html          # Main portfolio page (all sections)
├── css/
│   └── style.css       # Complete stylesheet (dark theme, responsive)
├── js/
│   └── main.js         # Nav behavior, scroll reveal, skill bar animations
├── CNAME               # Custom domain placeholder
└── README.md           # This file
```

## 🎨 Features

- **Dark premium theme** — Deep background (#0a0a0e) with teal/cyan accent and gold highlights
- **Single-page design** — Smooth scroll navigation with all sections
- **Responsive** — Mobile-first, works on all screen sizes
- **No frameworks** — Pure vanilla HTML/CSS/JS, zero dependencies
- **Interactive** — Expandable project cards, animated skill bars, scroll-reveal animations
- **SEO optimized** — Meta tags, semantic HTML, structured content
- **Accessible** — ARIA labels, keyboard-friendly, high contrast

## 🖥️ Local Development

Open `index.html` directly in your browser — no build step, no server required:

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

For live reload during development, use any static file server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## 📊 Content Overview

| Section | Content |
|---------|---------|
| **Hero** | Professional statement, architecture visual, CTAs |
| **Story** | The Architect Arc — PaaS → Security → Data → Governance |
| **Projects** | 4 project cards (ShopFlow, PaySecure, MediSync, EdgeForge) |
| **Skills** | Skills matrix with animated bars, WAF pillar alignment |
| **Philosophy** | 5 architecture principles |
| **Contact** | LinkedIn, GitHub, role preferences |

## 🔗 Links

- **Live Portfolio:** [subhankarcloud.in](https://subhankarcloud.in) (once deployed)
- **GitHub:** [@pattnaik-subhankar](https://github.com/pattnaik-subhankar)
- **LinkedIn:** [subhankarpattnaik007](https://linkedin.com/in/subhankarpattnaik007)
- **Azure Portfolio Repo:** [azure-portfolio](https://github.com/pattnaik-subhankar/azure-portfolio)
