# Content Editor's Guide - Studio Website

## Main Pages (Basic Content)
Location: `/src/app/`

- `page.jsx` - Home page content
- `about/page.jsx` - About page content
- `contact/page.jsx` - Contact information
- `process/page.jsx` - Process descriptions
- `work/page.jsx` - Portfolio overview
- `not-found.jsx` - 404 page message

## Blog Posts
Location: `/src/app/blog/`

- Each blog post is a separate folder with `page.mdx`
- Include images in the same folder
- Format:
  ```mdx
  export const article = {
    title: 'Your Title',
    description: 'Description here',
    author: {
      name: 'Author Name',
      role: 'Role',
    },
    date: 'YYYY-MM-DD'
  }

  // Content goes here in markdown
  ```

## Case Studies
Location: `/src/app/work/`

- Each case study is a separate folder with `page.mdx`
- Format:
  ```mdx
  export const caseStudy = {
    client: 'Client Name',
    title: 'Case Study Title',
    description: 'Description',
    summary: [
      'Point 1',
      'Point 2'
    ],
    date: 'YYYY-MM',
    service: 'Service Type'
  }

  // Content goes here in markdown
  ```

## Company Information
Location: `/src/components/`

### Office Addresses
File: `Offices.jsx`
```jsx
<Office name="Copenhagen">
  1 Carlsberg Gate
  1260, København, Denmark
</Office>
```

### Footer Links
File: `Footer.jsx`
```jsx
const navigation = [
  {
    title: 'Work',
    links: [
      { title: 'FamilyFund', href: '/work/family-fund' },
      // Add more links here
    ]
  }
]
```

### Social Media
File: `SocialMedia.jsx`
```jsx
export const socialMediaProfiles = [
  { title: 'Facebook', href: 'https://facebook.com' },
  // Add more social media links here
]
```

## Site Metadata
File: `/src/app/layout.jsx`
```jsx
export const metadata = {
  title: {
    template: '%s - Studio',
    default: 'Studio - Award winning developer studio based in Denmark'
  }
}
```

## Important Notes:
1. All blog posts and case studies use MDX (Markdown with JSX)
2. Images should be placed in the same folder as the content
3. Dates should follow the format YYYY-MM-DD
4. Remember to update both the content and metadata for each page
5. Navigation links in Footer.jsx need to be updated when adding new pages