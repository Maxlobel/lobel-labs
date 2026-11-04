# Website update workflow

Repository: Maxlobel/lobel-labs
Production domain: https://maxlobel.com
Vercel project: lobel-labs, in maxlobels-projects
Application: React, TypeScript, Vite, Tailwind CSS, shadcn/ui

## Request and implementation

1. Describe the desired change in ChatGPT and reference this repository.
2. Inspect the latest main branch and any applicable repository instructions. Create a separate branch for each change.
3. Implement the requested scope. Run the applicable checks from package.json, including npm run build and npm run lint. Report preexisting failures separately from new failures.
4. Open a draft pull request with a concise explanation, validation results, and any unresolved requirements.
5. Check the Vercel deployment status for the exact branch commit. Share a preview URL only once a successful preview is confirmed. If preview creation is skipped or blocked, report that explicitly.
6. Review the relevant pages and interactions on desktop and mobile. For forms, verify submission, validation, failure states, and the destination of submitted data. Do not treat a successful build as proof of functional correctness.

## Review and publication

Max reviews the preview and requests revisions in the conversation. Update the same branch and confirm checks on the latest commit.

Merge into main only after Max approves publication of the reviewed change. Before merging, confirm the Vercel production branch and project configuration. After merging, verify the production deployment and the affected behavior at maxlobel.com.

This document describes the working agreement. It does not configure branch protection or enforce an approval gate in GitHub.

## Recovery

If a release causes a regression, identify the offending commit and prepare a revert pull request. Obtain approval before changing production. If an urgent Vercel rollback is requested, verify the target deployment and follow up by reconciling Git history with the intended production state.

## Access and configuration

Keep credentials in the hosting provider's configuration rather than repository files or chat messages. Do not copy production secrets into previews. Confirm how preview forms interact with live data before testing submissions.

GitHub writes were verified by creating this branch. The existing main commit has a successful Vercel deployment, and Vercel confirms maxlobel.com belongs to this project. A new branch preview still needs to be verified; the existing deployment does not prove current preview behavior.
