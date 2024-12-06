# Website Text Updates Log

This document tracks all text updates made to align with the Embeddings description.

## British English Updates
The following American English terms have been updated to British English:
- "organization" -> "organisation"
- "optimization" -> "optimisation"
- "analyzing" -> "analysing"
- "inquiries" -> "enquiries"

## Home Page Updates

### Hero Section
**Original:**
```jsx
<h1>Embeddings: Generative AI for Enterprise</h1>
<p>We help Australian businesses 10x their productivity by embedding
Generative AI into their business processes.</p>
```

**Updated to:**
```jsx
<h1>embeddings: generative AI for enterprise</h1>
<p>Leverage the power of generative AI to radically accelerate your businesses' productivity.</p>
```

### Client Section
**Original:**
```jsx
<h2>We've partnered with Australian companies unlocking the power of
Generative AI</h2>
```

**Updated to:**
```jsx
<h2>The future of work is here: it's just not evenly distributed.
We partner with Australian companies to democratise generative AI.</h2>
```

### Services Section
**Original:**
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

**Updated to:**
```jsx
<SectionIntro
  eyebrow="services"
  title="Experience the future of work with generative AI"
>
  <p>
    We deliver tangible business value by embedding cutting-edge AI technologies 
    into your processes, enabling you to do less and achieve more.
  </p>
</SectionIntro>
```

### Service List Items
**Original:**
```jsx
[Web development, Application development, E-commerce, Custom content management items]
```

**Updated to:**
```jsx
<ListItem title="AI-Powered Chatbots">
  Transform how your organisation accesses knowledge with intelligent chatbots that 
  understand natural language and provide instant access to your internal knowledge base.
</ListItem>

<ListItem title="End-to-End Workflow Automation">
  Streamline complex business processes with AI-driven automation that reduces manual 
  effort and accelerates production from hours to minutes.
</ListItem>

<ListItem title="Agentic Workflows">
  Implement autonomous AI agents that handle repetitive tasks, provide decision 
  support, and scale across your organisation.
</ListItem>

<ListItem title="Process Optimisation">
  Radically accelerate productivity by automating up to 80% of repetitive tasks 
  while improving accuracy and efficiency.
</ListItem>
```

### Technology Section
**Original:**
```jsx
<SectionIntro title="Harnessing technology for a brighter future">
  <p>
    We believe technology is the answer to the world's greatest
    challenges. It's also the cause, so we find ourselves in bit of a
    catch 22 situation.
  </p>
</SectionIntro>
```

**Updated to:**
```jsx
<SectionIntro title="Harnessing technology for a brighter future">
  <p>
    We combine deep technical expertise with innovative thinking to help 
    Australian businesses stay ahead in the rapidly evolving AI landscape. 
    Our commitment to excellence drives everything we do.
  </p>
</SectionIntro>
```

### Testimonial Section
**Original:**
```jsx
<Testimonial client={{ name: 'Phobia', logo: logoPhobiaDark }}>
  [Previous testimonial content]
</Testimonial>
```

**Updated to:**
```jsx
<Testimonial client={{ name: 'TechForward', logo: logoPhobiaDark }}>
  Working with Embeddings transformed our business processes. Their deep technical expertise 
  in AI implementation helped us achieve unprecedented efficiency gains, enabling our team to 
  do less whilst achieving significantly more.
</Testimonial>
```

### Page Metadata
**Original:**
```jsx
export const metadata = {
  title: 'Studio',
  description: 'We are a development studio working at the intersection of design and technology.'
}
```

**Updated to:**
```jsx
export const metadata = {
  title: 'embeddings: Generative AI for Australian Businesses',
  description: 'Helping Australian businesses 10x their productivity with generative AI solutions. Offices in Perth and Melbourne.'
}
```

## Disabled Pages
The following pages have been temporarily disabled and moved to `src/app/_disabled_pages/`:
- `work/`: Case studies and portfolio section
- `blog/`: Blog posts and articles section

These pages are not currently accessible on the live site. Content from these sections has been integrated into the main site where appropriate, such as case studies being shown on the home page.

// ... [Rest of the file remains unchanged] ...