# Locations to Update in Template

## Home Page
Location: `/src/app/page.jsx`

### Hero Section
```jsx
<h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
  Embeddings: Generative AI for Enterprise
</h1>
<p className="mt-6 text-xl text-neutral-600">
  We help Australian businesses 10x their productivity by embedding
  Generative AI into their business processes.
</p>
```

### Client Section
```jsx
<h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
  We've partnered with Australian companies unlocking the power of
  Generative AI
</h2>
```

### Services Section
```jsx
<SectionIntro
  eyebrow="Services"
  title="We help you identify, explore and respond to new opportunities."
>
  <p>
    As long as those opportunities involve giving us money to re-purpose
    old projects — we can come up with an endless number of those.
  </p>
</SectionIntro>
```

### Service List Items
```jsx
<ListItem title="Web development">
  We specialise in crafting beautiful, high quality marketing pages.
  The rest of the website will be a shell that uses lorem ipsum
  everywhere.
</ListItem>
<ListItem title="Application development">
  We have a team of skilled developers who are experts in the latest
  app frameworks, like Angular 1 and Google Web Toolkit.
</ListItem>
<ListItem title="E-commerce">
  We are at the forefront of modern e-commerce development. Which
  mainly means adding your logo to the Shopify store template we've
  used for the past six years.
</ListItem>
<ListItem title="Custom content management">
  At Studio we understand the importance of having a robust and
  customised CMS. That's why we run all of our client projects out
  of a single, enormous Joomla instance.
</ListItem>
```

## About Page
Location: `/src/app/about/page.jsx`

### Page Metadata
```jsx
export const metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}
```

### Team Section
```jsx
const team = [
  {
    title: 'Leadership',
    people: [
      {
        name: 'Leslie Alexander',
        role: 'Co-Founder / CEO',
        image: { src: imageLeslieAlexander },
      },
      // ... other team members
    ],
  },
]
```

### Company Statistics
```jsxx
<StatList>
  <StatListItem value="35" label="Underpaid employees" />
  <StatListItem value="52" label="Placated clients" />
  <StatListItem value="$25M" label="Invoices billed" />
</StatList>
```

### Culture Section
```jsx
<SectionIntro
  eyebrow="Our culture"
  title="Balance your passion with your passion for life."
  invert
>
  <p>
    We are a group of like-minded people who share the same core values.
  </p>
</SectionIntro>

<GridListItem title="Loyalty" invert>
  Our team has been with us since the beginning because none of them
  are allowed to have LinkedIn profiles.
</GridListItem>
<GridListItem title="Trust" invert>
  We don't care when our team works just as long as they are working
  every waking second.
</GridListItem>
```

### Values Section
```jsx
<SectionIntro
  eyebrow="Our values"
  title="Balancing reliability and innovation"
>
  <p>
    We strive to stay at the forefront of emerging trends and
    technologies, while completely ignoring them and forking that old
    Rails project we feel comfortable using.
  </p>
</SectionIntro>
```

## Contact Page
Location: `/src/app/contact/page.jsx`

### Page Header
```jsx
<PageIntro eyebrow="Contact us" title="Let's work together">
  <p>We can't wait to hear from you.</p>
</PageIntro>
```

### Form Title
```jsx
<h2 className="font-display text-base font-semibold text-neutral-950">
  Work inquiries
</h2>
```

### Form Fields
```jsx
<TextInput label="Name" name="name" autoComplete="name" />
<TextInput
  label="Email"
  type="email"
  name="email"
  autoComplete="email"
/>
<TextInput
  label="Company"
  name="company"
  autoComplete="organization"
/>
<TextInput label="Phone" type="tel" name="phone" autoComplete="tel" />
<TextInput label="Message" name="message" />
```

### Budget Options
```jsx
<fieldset>
  <legend className="text-base/6 text-neutral-500">Budget</legend>
  <RadioInput label="$25K – $50K" name="budget" value="25" />
  <RadioInput label="$50K – $100K" name="budget" value="50" />
  <RadioInput label="$100K – $150K" name="budget" value="100" />
  <RadioInput label="More than $150K" name="budget" value="150" />
</fieldset>
```

### Submit Button
```jsx
<Button type="submit" className="mt-10">
  Let's work together
</Button>
```

### Office Description
```jsx
<p className="mt-6 text-base text-neutral-600">
  Prefer doing things in person? We don't but we have to list our
  addresses here for legal reasons.
</p>
```

### Email Contacts
```jsx
{[
  ['Careers', 'careers@studioagency.com'],
  ['Press', 'press@studioagency.com'],
].map(([label, email]) => (
  // ... email contact structure
))}
```

## Process Page
Location: `/src/app/process/page.jsx`

### Process Steps
```jsx
<TagList className="mt-4">
  <TagListItem>In-depth questionnaires</TagListItem>
  <TagListItem>Feasibility studies</TagListItem>
  <TagListItem>Blood samples</TagListItem>
  <TagListItem>Employee surveys</TagListItem>
  <TagListItem>Proofs-of-concept</TagListItem>
  <TagListItem>Forensic audit</TagListItem>
</TagList>
```

### Discovery Phase Description
```jsx
<p>
  Our team of private investigators shadow the company director's for
  several weeks while our account managers focus on going through their
  trash. Our senior security experts then perform social engineering
  hacks to gain access to their business accounts — handing that information 
  over to our forensic accounting team.
</p>
```

## Work/Portfolio Page
Location: `/src/app/work/page.jsx`

### Client List Title
```jsx
<h2 className="font-display text-2xl font-semibold text-neutral-950">
  You're in good company
</h2>
```

### Case Study Buttons
```jsx
<Button
  href={caseStudy.href}
  aria-label={`Read case study: ${caseStudy.client}`}
>
  Read case study
</Button>
```

## Case Studies
Location: `/src/app/work/`

### Case Study Overview
```jsx
<PageIntro
  eyebrow="Our work"
  title="Proven solutions for real-world problems."
>
  <p>
    We believe in efficiency and maximizing our resources to provide the
    best value to our clients. The primary way we do that is by re-using
    the same five projects we've been developing for the past decade.
  </p>
</PageIntro>
```

### Performance Stats (Unseal)
```jsx
<StatList>
  <StatListItem value="34%" label="Fewer transactions" />
  <StatListItem value="10%" label="Slower transactions" />
  <StatListItem value="1000ms" label="Transaction latency" />
  <StatListItem value="3" label="Active nodes" />
</StatList>
```

### App Stats (Phobia)
```jsx
<StatList>
  <StatListItem value="20%" label="Churn rate" />
  <StatListItem value="5x" label="Uninstalls" />
  <StatListItem value="2.3" label="App store rating" />
  <StatListItem value="8" label="Pending lawsuits" />
</StatList>
```

### Technology Tags
```jsx
<TagList>
  <TagListItem>Frontend (Next.js)</TagListItem>
  <TagListItem>Custom CMS</TagListItem>
  <TagListItem>SEO</TagListItem>
  <TagListItem>Infrastructure</TagListItem>
</TagList>
```

## Blog Page
Location: `/src/app/blog/page.jsx`

### Blog Metadata
```jsx
export const metadata = {
  title: 'Blog',
  description:
    'Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.',
}
```

### Blog Read More Button
```jsx
<Button
  href={article.href}
  aria-label={`Read more: ${article.title}`}
  className="mt-8"
>
  Read more
</Button>
```

## Error Pages
Location: `/src/app/not-found.jsx`

### 404 Page Content
```jsx
<p className="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
  404
</p>
<h1 className="mt-4 font-display text-2xl font-semibold text-neutral-950">
  Page not found
</h1>
<p className="mt-2 text-sm text-neutral-600">
  Sorry, we couldn't find the page you're looking for.
</p>
<Link
  href="/"
  className="mt-4 text-sm font-semibold text-neutral-950 transition hover:text-neutral-700"
>
  Go to the home page
</Link>
```

## Components

### Contact Section
Location: `/src/components/ContactSection.jsx`

```jsx
<Button href="/contact" invert>
  Say Hej
</Button>
```

### Newsletter Form
Location: `/src/components/Footer.jsx`

```jsx
<form className="max-w-sm">
  <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
    Sign up for our newsletter
  </h2>
  <p className="mt-4 text-sm text-neutral-700">
    Subscribe to get the latest design news, articles, resources and
    inspiration.
  </p>
  <input
    type="email"
    placeholder="Email address"
    autoComplete="email"
    aria-label="Email address"
  />
</form>
```

## Comprehensive Update Checklist

1. Replace all placeholder text with authentic content
2. Update company values and mission statements
3. Customize all form labels and placeholders
4. Update contact information and office locations
5. Replace client testimonials with real feedback
6. Update case studies with actual client work
7. Adjust service descriptions to match offerings
8. Update team member information and photos
9. Replace client logos with actual clients
10. Update social media links
11. Configure newsletter form with email service
12. Update metadata descriptions
13. Adjust budget ranges to reflect pricing
14. Update navigation structure
15. Customize button text to match brand voice
16. Update statistics with actual metrics
17. Update technology tags to match stack
18. Customize process steps
19. Review all aria-labels for accessibility
20. Update error pages for brand consistency
21. Configure form validation messages
22. Set up success/failure notifications
23. Update loading states
24. Replace all placeholder images
25. Update email addresses
26. Configure form submissions

## Images
Location: `/src/images/`

### Team Member Photos
All team member photos in `/src/images/team/`:
- angela-fisher.jpg
- benjamin-russel.jpg
- blake-reid.jpg
- chelsea-hagon.jpg
- dries-vincent.jpg
- emma-dorsey.jpg
- jeffrey-webb.jpg
- kathryn-murphy.jpg
- leonard-krasner.jpg
- leslie-alexander.jpg
- michael-foster.jpg
- whitney-francis.jpg

### Client Logos
All client logos in `/src/images/clients/`:
- bright-path/
- family-fund/
- green-life/
- home-work/
- mail-smirk/
- north-adventures/
- phobia/
- unseal/

## Navigation
Location: `/src/components/Footer.jsx`

### Full Navigation Structure
```jsx
const navigation = [
  {
    title: 'Work',
    links: [
      { title: 'FamilyFund', href: '/work/family-fund' },
      { title: 'Unseal', href: '/work/unseal' },
      { title: 'Phobia', href: '/work/phobia' },
      {
        title: (
          <>
            See all <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: '/work',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Process', href: '/process' },
      { title: 'Blog', href: '/blog' },
      { title: 'Contact us', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    links: socialMediaProfiles,
  },
]
```

## Social Media
Location: `/src/components/SocialMedia.jsx`

### Social Media Profiles
```jsx
export const socialMediaProfiles = [
  { title: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
  { title: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { title: 'GitHub', href: 'https://github.com', icon: GitHubIcon },
  { title: 'Dribbble', href: 'https://dribbble.com', icon: DribbbleIcon },
]
```

## Office Locations
Location: `/src/components/Offices.jsx`

### Office Addresses
```jsx
<Office name="Copenhagen" invert={invert}>
  1 Carlsberg Gate
  <br />
  1260, København, Denmark
</Office>

<Office name="Billund" invert={invert}>
  24 Lego Allé
  <br />
  7190, Billund, Denmark
</Office>
```

## Global Site Metadata
Location: `/src/app/layout.jsx`

### Site Title and Description
```jsx
export const metadata = {
  title: {
    template: '%s / Embeddings',
    default: 'Embeddings: Generative AI for Australian Businesses'
  }
}
```

## Individual Case Studies
Location: `/src/app/work/`

Each case study in the following files needs complete content updates:
- `family-fund/page.mdx`
- `phobia/page.mdx`
- `unseal/page.mdx`

Example structure from `family-fund/page.mdx`:
```mdx
export const caseStudy = {
  client: 'FamilyFund',
  title: 'Skip the bank, borrow from those you trust',
  description: '...',
  summary: [...],
  testimonial: {
    author: { name: 'Debra Fiscal', role: 'CEO of FamilyFund' },
    content: '...'
  }
}
```

## Copyright Notice
Location: `/src/components/Footer.jsx`

```jsx
<p className="text-sm text-neutral-700">
  © Studio Agency Inc. {new Date().getFullYear()}
</p>
```

## Client Logos and Usage
Location: `/src/images/clients/`

### Logo Files
All client logos need to be updated in these directories:
- bright-path/
  - logo-dark.svg
  - logo-light.svg
- family-fund/
  - logo-dark.svg
  - logo-light.svg
- green-life/
  - logo-dark.svg
  - logo-light.svg
- home-work/
  - logo-dark.svg
  - logo-light.svg
- mail-smirk/
  - logo-dark.svg
  - logo-light.svg
- north-adventures/
  - logo-dark.svg
  - logo-light.svg
- phobia/
  - logo-dark.svg
  - logo-light.svg
- unseal/
  - logo-dark.svg
  - logo-light.svg

### Logo Usage Locations

1. Home Page Client List
Location: `/src/app/page.jsx`

```jsx
const clients = [
  ['LangChain', logoLangChain],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoBrightPath],
  ['North Adventures', logoNorthAdventures],
]
```

2. Work Page Client Grid
Location: `/src/app/work/page.jsx`

```jsx
const clients = [
  ['Phobia', logoPhobia],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoBrightPath],
  ['North Adventures', logoNorthAdventures],
]
```

3. Case Study Pages
Location: `/src/app/work/[client]/page.mdx`

```jsx
// Example from family-fund/page.mdx
import logo from '@/images/clients/family-fund/logomark-dark.svg'
export const caseStudy = {
  client: 'FamilyFund',
  logo,
  // ... other case study content
}
```

4. Testimonial Components
Location: `/src/app/page.jsx`

```jsx
<Testimonial
  className="mt-24 sm:mt-32 lg:mt-40"
  client={{ name: 'Phobia', logo: logoPhobiaDark }}
>
  // ... testimonial content
</Testimonial>
```

### Import Statements to Update
The following files import client logos and need to be updated:
1. `/src/app/page.jsx`:

```jsx
import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-light.svg'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoHomeWork from '@/images/clients/home-work/logo-light.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-light.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import logoPhobiaLight from '@/images/clients/phobia/logo-light.svg'
import logoLangChain from '@/images/clients/langchain/logo-light2.png'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'
```

2. `/src/app/work/page.jsx`:

```jsx
import logoBrightPath from '@/images/clients/bright-path/logo-dark.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-dark.svg'
import logoGreenLife from '@/images/clients/green-life/logo-dark.svg'
// ... similar imports for other clients
```