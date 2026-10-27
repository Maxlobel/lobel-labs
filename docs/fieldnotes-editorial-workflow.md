# Fieldnotes publication system

`/projects/fieldnotes` is the future public editorial home for Max Lobel's work across data, AI, systems, sports, cities, and culture. It appears as a project in the main site's Featured Projects section, not a separate top-level site or navigation category. The first implementation is an editorial **concept preview**, not six completed research articles.

## Editorial standard

A Fieldnote should do more than summarize news or present a pretty chart. It should make an interesting question concrete, identify the original evidence, show the analysis or build, discuss alternative explanations and limitations, and leave a reader with a useful takeaway.

Do not publish claims about Max's employers, clients, confidential work, coworkers, costs, outcomes, or personal information unless the underlying facts are cleared for public use. AI output is a draft, not evidence. No invented quotes, statistics, or case studies.

## What makes the visual identity consistent

Every cover uses the same framing, typography, numbered issue system, margin rules, grid texture, contrast, and composition. The central vector graphic and restrained accent color change with the subject. The reusable graphic component lives in `src/components/FieldnotePoster.tsx`, and the theme is in `src/pages/fieldnotes.css`.

Actual data visualizations should be derived from verified datasets. Decorative cover art can suggest the topic, but it must not imply an unverified statistic or geographic result. A future export step can render each cover into a shareable 4:5 social PNG and 1.91:1 link preview image. The current implementation displays the covers on the site; it does **not** yet generate social image files or server rendered Open Graph pages.

## Later automation with a human decision gate

1. **Capture:** collect an idea, original source files, URL list, or an internally cleared project artifact.
2. **Research:** preserve raw evidence, dates, definitions, analysis code, and the source trail. Flag missing or contradictory evidence.
3. **Draft:** an AI proposes an editorial structure, headline, claims with citations, caveats, category, and a visual motif.
4. **Validate:** check schema, links, data calculations, originality, privacy, permissions, image rights, and unsupported claims. Require manual review for ambiguous cases.
5. **Preview:** create a GitHub branch and pull request with a Vercel preview. Draft changes do not merge or deploy to production automatically.
6. **Approve:** Max reviews the factual story, language, visuals, and public sharing classification. Explicit approval is required for publication.
7. **Release:** merge the approved pull request to the production branch. Archive the source versions and approval record.
8. **Learn:** inspect useful site engagement and reader feedback to improve the work, without optimizing solely for clickbait.

Recommended visibility states for a future CMS or automation service are **Private**, **Shareable for review**, and **Public approved**. These are workflow states, not a substitute for true authorization checks. The `/lab` route remains separate and protected.

## Current implementation and handoff

The six entries are defined in `src/data/fieldnotes.ts`. They deliberately have `status: "concept"` and contain investigative questions, not findings. Individual concept pages have `noindex, nofollow` metadata. A production release should first settle the editorial brand, choose genuine first stories, complete the research, approve the facts and visuals, and replace or remove the concept entries.

For scalable publishing, move from manually edited TypeScript entries to Markdown or a schema validated content store, add draft and approval states enforced on the server or at build time, add image exports and per article social metadata, and build a repeatable evidence checklist. Avoid introducing autonomous publishing or a CMS login before the first editorial examples prove that the format is useful.
