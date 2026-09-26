# Portfolio

Personal portfolio of Tomasz Gołąb: tells a recruiter (or an AI agent reading on their behalf) who he is, what he can do, and walks through selected projects.

## Language

### Content

**Content**:
Owner-editable text and data shown on the site — the Profile, Skills and Projects — stored per Locale and changeable without a deploy.
_Avoid_: data, CMS entries

**UI copy**:
Fixed interface text (navigation, buttons, section headings, form labels) that ships with the code.
_Avoid_: translations, strings, content

**Locale**:
The language a visitor reads the site in — `pl` (default) or `en` — always visible in the URL.
_Avoid_: language setting, lang

### Profile

**Profile**:
The single record describing the owner: name, Roles, contact links and CV.
_Avoid_: about, bio, user

**Role**:
One of the short job titles cycled by the typewriter in the hero (e.g. "Frontend Developer").
_Avoid_: title, position

### Skills

**Skill**:
A named technology or tool the owner works with (e.g. React, Playwright), belonging to exactly one Skill category.
_Avoid_: technology, tag, tech

**Skill category**:
An ordered group of Skills (e.g. "Frontend", "Testy").
_Avoid_: section, group

### Projects

**Project**:
A piece of work presented on the site, shown as a Project card in lists and as a Project page in full.
_Avoid_: case study, portfolio item, work

**Project card**:
The short form of a Project: title, context, summary, Metrics, Skills and cover image.
_Avoid_: tile, preview, thumbnail

**Project page**:
The full form of a Project on its own URL: problem, role, what was built, challenges, outcomes, stack and links.
_Avoid_: case study, detail view, subpage

**Metric**:
A short headline figure that shows a Project's scale or effect at a glance (e.g. "1,2 mln sesji dziennie").
_Avoid_: stat, KPI, number

**Screenshot**:
An image of a Project with alt text per Locale; the first one is the Project card's cover, all of them appear on the Project page.
_Avoid_: image, photo, gallery item

### Contact

**Contact message**:
A message a visitor sends through the contact form; stored and forwarded to the owner by email.
_Avoid_: lead, inquiry, submission
