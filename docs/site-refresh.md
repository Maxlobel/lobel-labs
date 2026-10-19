# Portfolio maintenance

## Content

Project descriptions and status labels live in `src/data/projects.ts`. Keep descriptions accurate, avoid unsupported performance claims, and exclude confidential client data.

Approved testimonials live in `src/data/testimonials.ts`. Add a quote only after reviewing its original source and obtaining permission to publish the quote and attribution. Submitted notes are reviewed before publication.

Personal facts live in `src/data/funFacts.ts`. Keep stable IDs when changing wording so the visitor's fact history continues to work.

## Visual direction

The design preserves the original personal portfolio identity: a centered name and glowing lightbulb opening, blue and gold accents, ambient and pointer glow, centered headings, and spacious project cards. The page flows from About to tools, projects, consulting, and contact options.

Motion respects the visitor's reduced-motion preference. Pointer movement updates a decorative element without re-rendering the page.

## Application updates

Après Boston is served under `/projects/apres-boston/`. Only browser assets belong in this portfolio. Keep private source, environment files, and client data out of the public repository. The importer in `scripts/import-apres.mjs` can rebuild those assets from an authorized local checkout.

Private lab configuration is managed separately through the hosting dashboard. The lab stays unavailable until its required configuration is present.

## Verification

The build, TypeScript checks, and changed component lint pass. Browser checks cover desktop and mobile navigation, the opening and glow, reduced motion, project pages, inquiry validation and duplicate prevention, note consent and error recovery, persistent fact history, and nested application routes. Form database responses are mocked in browser checks; live database receipt and inbox delivery require separate verification.

Preview changes require review before publishing to the live website.
