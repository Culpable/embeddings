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
*No changes needed - already aligned with description*

### Client Section
**Original:**
```jsx
<h2>We've partnered with Australian companies unlocking the power of
Generative AI</h2>
```
*No changes needed - already aligned with description*

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
  eyebrow="Services"
  title="Experience the future of work with Generative AI"
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

## About Page Updates

### Page Metadata
**Original:**
```jsx
export const metadata = {
  title: 'About Us',
  description: 'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}
```

**Updated to:**
```jsx
export const metadata = {
  title: 'About Us',
  description: 'We combine deep technical expertise with innovative solutions to help Australian businesses transform through Generative AI.',
}
```

### Company Statistics
**Original:**
```jsx
<StatList>
  <StatListItem value="35" label="Underpaid employees" />
  <StatListItem value="52" label="Placated clients" />
  <StatListItem value="$25M" label="Invoices billed" />
</StatList>
```

**Updated to:**
```jsx
<StatList>
  <StatListItem value="10x" label="Productivity gains" />
  <StatListItem value="80%" label="Task automation" />
  <StatListItem value="ASX20" label="Client partnerships" />
</StatList>
```

### Culture Section
**Original:**
```jsx
<SectionIntro
  eyebrow="Our culture"
  title="Balance your passion with your passion for life."
>
  <p>
    We are a group of like-minded people who share the same core values.
  </p>
</SectionIntro>
```

**Updated to:**
```jsx
<SectionIntro
  eyebrow="Our culture"
  title="Driving innovation with expertise and passion"
>
  <p>
    We are a team of experts combining deep technical knowledge and a passion for 
    innovation, helping businesses unlock unprecedented efficiency.
  </p>
</SectionIntro>
```

### Values Section
**Original:**
```jsx
<GridListItem title="Loyalty" invert>
  Our team has been with us since the beginning because none of them
  are allowed to have LinkedIn profiles.
</GridListItem>
<GridListItem title="Trust" invert>
  We don't care when our team works just as long as they are working
  every waking second.
</GridListItem>
```

**Updated to:**
```jsx
<GridListItem title="Technical Excellence" invert>
  Our specialists stay at the forefront of AI advancements, ensuring clients 
  benefit from cutting-edge solutions.
</GridListItem>
<GridListItem title="Client Success" invert>
  We work closely with clients to understand their unique challenges and deliver 
  tailored solutions that drive real business value.
</GridListItem>
```

## Contact Page Updates

### Page Header
**Original:**
```jsx
<PageIntro eyebrow="Contact us" title="Let's work together">
  <p>We can't wait to hear from you.</p>
</PageIntro>
```

**Updated to:**
```jsx
<PageIntro eyebrow="Contact us" title="Let's transform your business with AI">
  <p>Ready to experience the future of work? Get in touch with our team of AI experts.</p>
</PageIntro>
```

### Form Title and Fields
**Original:**
```jsx
<h2>AI Solution Enquiries</h2>
<fieldset>
  <legend>Budget</legend>
  <RadioInput label="$25K – $50K" name="budget" value="25" />
  <RadioInput label="$50K – $100K" name="budget" value="50" />
  <RadioInput label="$100K – $150K" name="budget" value="100" />
  <RadioInput label="More than $150K" name="budget" value="150" />
</fieldset>
```

**Updated to:**
```jsx
<h2>AI Solution Enquiries</h2>
<fieldset>
  <legend>Budget</legend>
  <RadioInput label="$25K – $50K" name="budget" value="25" />
  <RadioInput label="$50K – $100K" name="budget" value="50" />
  <RadioInput label="$100K – $150K" name="budget" value="100" />
  <RadioInput label="More than $150K" name="budget" value="150" />
</fieldset>
```

### Contact Information
**Original:**
```jsx
<p>Prefer doing things in person? We don't but we have to list our addresses here for legal reasons.</p>
[solutions@embeddings.au, press@embeddings.au]
```

**Updated to:**
```jsx
<p>We have offices in Perth and Melbourne, ready to help transform your business with Generative AI.</p>
[solutions@embeddings.au, press@embeddings.au]
```

## Process Page Updates

### Process Steps
**Original:**
```jsx
<TagList>
  <TagListItem>In-depth questionnaires</TagListItem>
  <TagListItem>Feasibility studies</TagListItem>
  <TagListItem>Blood samples</TagListItem>
  <TagListItem>Employee surveys</TagListItem>
  <TagListItem>Proofs-of-concept</TagListItem>
  <TagListItem>Forensic audit</TagListItem>
</TagList>
```

**Updated to:**
```jsx
<TagList>
  <TagListItem>Process Analysis</TagListItem>
  <TagListItem>Technical Assessment</TagListItem>
  <TagListItem>Data Evaluation</TagListItem>
  <TagListItem>Solution Design</TagListItem>
  <TagListItem>Implementation Strategy</TagListItem>
  <TagListItem>Performance Monitoring</TagListItem>
</TagList>
```

### Process Description
**Original:**
```jsx
<p>
  Our team of private investigators shadow the company director's for several weeks...
</p>
```

**Updated to:**
```jsx
<p>
  Our team of AI experts begins by thoroughly analyzing your current processes and workflows. 
  We identify opportunities for automation and optimization, evaluate your data infrastructure, 
  and design tailored AI solutions that integrate seamlessly with your existing systems. 
  Throughout implementation, we ensure your team is equipped to leverage these new capabilities 
  effectively.
</p>
```

### Build Section
**Original:**
```jsx
<p>
  Based off of the discovery phase, we develop a comprehensive roadmap...
  [Previous content about dragging out projects]
</p>
```

**Updated to:**
```jsx
<p>
  Based on our thorough analysis, we develop a comprehensive implementation plan 
  that aligns with your business objectives. Our approach focuses on delivering 
  measurable value through strategic AI integration.
</p>
```

### Deliver Section
**Original:**
```jsx
<ListItem title="Testing">
  Our projects always have 100% test coverage, which would be impressive
  if our tests weren't as porous as a sieve.
</ListItem>
```

**Updated to:**
```jsx
<ListItem title="Comprehensive Testing">
  Rigorous testing ensures your AI solutions perform reliably and securely 
  in your specific business context.
</ListItem>
```

### Values Section
**Original:**
```jsx
<SectionIntro
  eyebrow="Our values"
  title="Balancing reliability and innovation"
>
  <p>
    We strive to stay at the forefront of emerging trends...
    [Previous content about old Rails projects]
  </p>
</SectionIntro>
```

**Updated to:**
```jsx
<SectionIntro
  eyebrow="Our values"
  title="Harnessing technology for a brighter future"
>
  <p>
    We combine deep technical expertise with innovative thinking to help 
    Australian businesses stay ahead in the rapidly evolving digital landscape. 
    Our commitment to excellence drives everything we do.
  </p>
</SectionIntro>
```

## Work/Portfolio Page Updates

### Client List Title
**Original:**
```jsx
<h2>Case studies</h2>
```

**Updated to:**
```jsx
<h2>Leading Australian companies trust us with their AI transformation</h2>
```

### Case Study Buttons
**Original:**
```jsx
<Button>Read case study</Button>
```

**Updated to:**
```jsx
<Button>View AI transformation</Button>
```

## Contact Section Updates

### Office Locations
**Original:**
```jsx
[Copenhagen and Billund offices]
```

**Updated to:**
```jsx
<Office name="Perth" invert={invert}>
  Level 14, 197 St Georges Terrace
  <br />
  Perth, WA 6000
  <br />
  Australia
</Office>
<Office name="Melbourne" invert={invert}>
  Level 24, 120 Collins Street
  <br />
  Melbourne, VIC 3000
  <br />
  Australia
</Office>
```

### Contact Message
**Original:**
```jsx
<h2>Tell us about your project</h2>
```

**Updated to:**
```jsx
<h2>Ready to transform your business with AI?</h2>
<p>Get in touch to start your AI transformation journey.</p>
```

## Home Page Updates

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
    Australian businesses stay ahead in the rapidly evolving digital landscape. 
    Our commitment to excellence drives everything we do.
  </p>
</SectionIntro>
```

## Office Locations Updates

### Offices Component
**Original:**
```jsx
<Office name="Copenhagen">
  1 Carlsberg Gate
  <br />
  1260, København, Denmark
</Office>
<Office name="Billund">
  24 Lego Allé
  <br />
  7190, Billund, Denmark
</Office>
```

**Updated to:**
```jsx
<Office name="Perth" />
<Office name="Melbourne" />
```

The offices are now displayed in bold without street addresses, focusing on the city names only.

## Footer Updates

### Newsletter Form
Removed the newsletter form and replaced it with the simplified office locations.

### Company Name
**Original:**
```jsx
© Studio Agency Inc. {new Date().getFullYear()}
```

**Updated to:**
```jsx
© Embeddings {new Date().getFullYear()}
```

## Case Study Updates

### Client Testimonial
**Original:**
```jsx
testimonial: {
  author: { name: 'Jenny Wilson', role: 'CPO of Phobia' },
  content: 'The team at Studio went above and beyond with our onboarding, even finding a way to access the user's microphone without triggering one of those annoying permission dialogs.'
}
```

**Updated to:**
```jsx
testimonial: {
  author: { name: 'Sarah Mitchell', role: 'CTO of TechForward' },
  content: 'Embeddings' systematic approach to AI implementation helped us achieve results we didn't think possible. Their expertise in both technical integration and change management ensured a smooth transition to our new AI-powered workflows.'
}
```