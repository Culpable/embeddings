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
├── lib/
│   └── images.ts        # Site-wide image configuration (featured image for social sharing)
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

## Image Handling

### Featured Image
The site's featured image (used for social sharing and meta tags) is handled differently from other images:
- Location: `public/images/embeddings-agentic-shopping.png`
- Configuration: `src/lib/images.ts`
- URL Structure: Maps directly to `https://embeddings.au/images/...`
- No optimization: Pre-optimized image bypasses Next.js image processing

### Other Images
All other images should be placed in `src/images/` to benefit from Next.js optimization:
- Client logos: `src/images/clients/`
- Team photos: `src/images/team/`
- General images: `src/images/`

These images are automatically optimized and will have URLs like:
`https://embeddings.au/_next/static/media/[name].[hash].[ext]`

## Sitemap Generation

The site includes an automated sitemap generation system that creates `sitemap.xml` during the build process:

### Process Overview
- **Script location:** `src/scripts/generate-sitemap.js`
- **Output:** `public/sitemap.xml`
- **Execution:** Automatically runs during `npm run build` and `npm run deploy`
- **Manual generation:** `npm run generate-sitemap`

### Configuration
The sitemap generation script:
- Uses the App Router file structure to discover pages
- Configures URLs with proper metadata (priority, change frequency)
- Includes core routes (`/`, `/about`, `/process`, `/contact`)
- Excludes special Next.js files and disabled pages
- Ensures consistent URL formatting without trailing slashes

### Dependencies
The script uses:
- Node.js native `fs` module
- `fast-glob` package (included in project dependencies)

When adding new pages to the site, they will automatically be included in the sitemap on the next build, with no manual intervention required.
