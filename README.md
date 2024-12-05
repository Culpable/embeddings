# embeddings

Next.js 14 website with App Router and Tailwind CSS, deployed at [embeddings.au](https://embeddings.au).

## Prerequisites

### Node Version Manager (nvm)
Node Version Manager (nvm) is recommended for installing and managing multiple Node.js versions.

Installation on macOS:
```bash
brew install nvm
```

Add to shell configuration (~/.zshrc or ~/.bash_profile):
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"
```

Restart the terminal or run:
```bash
source ~/.zshrc  # or source ~/.bash_profile
```

### Node.js
Required version: v22.11.0
- Version specified in `.nvmrc`
- While in project directory, install correct version: `nvm install` and switch to installed version: `nvm use`

## Getting started

1. Clone the repository
2. Set Node version:
   ```bash
   nvm use
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Access [http://localhost:3000](http://localhost:3000)


## Deployment

Deployment occurs automatically via GitHub Actions (defined in `.github/workflows/deploy.yml`). No manual deployment steps required.

To trigger automatic deployment, simply push to the main branch:
```bash
git push origin main
```

**Automated deployment process:**
1. GitHub Actions runner starts on Ubuntu latest
2. Sets up Node.js environment (v20.10.0)
3. Installs dependencies using `npm ci`
4. Builds static site using `npm run build`
5. Deploys built files to `gh-pages` branch using `peaceiris/actions-gh-pages`
6. Configures custom domain (embeddings.au) via CNAME

**Important notes:**
- The `gh-pages` branch is managed automatically - DO NOT modify it directly
- All changes should be made to the main branch only
- Deployment status and logs available in the repository's Actions tab

## Project structure

Key files and directories:

```
src/
├── components/           # Reusable components
│   ├── RootLayout.jsx   # Main navigation and site structure
│   ├── Footer.jsx       # Footer structure and links
│   ├── Logo.jsx         # Site logo and hover states
│   └── Offices.jsx      # Office location information
├── app/                 # Next.js 14 App Router pages
│   ├── page.jsx         # Homepage
│   ├── about/           # About section
│   ├── process/         # Process section
│   └── contact/         # Contact form
└── images/              # Static assets
    ├── clients/         # Client logos
    └── team/            # Team photos
```

### Temporarily disabled sections
Currently disabled but preserved in `src/app/_disabled_pages/`:
- `/work`: Case studies and portfolio
- `/blog`: Blog posts and articles

## Development

The site auto-updates when files in `/src` are modified.

### Key component locations
- Navigation: `src/components/RootLayout.jsx`
- Footer: `src/components/Footer.jsx`
- Social links: `src/components/SocialMedia.jsx`
- Office locations: `src/components/Offices.jsx`

### Component Architecture
- Server Components are the default (no 'use client' directive needed)
- Client Components should be used only when necessary for:
  - React hooks (useState, useEffect)
  - Browser APIs
  - Interactive features
  - Event listeners
- Interactive components should be split into separate files
- Client Components must be marked with 'use client' directive
- Example structure:
  ```
  contact/
  ├── page.jsx           # Server Component (layout & static content)
  ├── ContactForm.jsx    # Client Component (interactive form)
  └── ContactDetails.jsx # Server Component (static content)
  ```

## Documentation

- [Next.js 14](https://nextjs.org/docs) - App Router and features
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling utilities
- [Framer Motion](https://www.framer.com/docs/) - Animations
- [MDX](https://mdxjs.com) - Blog and case study content
