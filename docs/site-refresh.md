# Site refresh

## Content maintenance

Edit `src/data/projects.ts` for project descriptions and statuses. The current list contains Après Boston (Beta), ComboGuard (In progress), casting business technical support (Complete), and RoleVista (In progress). Project overviews exclude private client data and performance figures.

Approved testimonials belong in `src/data/testimonials.ts`. The array is intentionally empty because no approved original quotes have been supplied. Only entries explicitly marked approved are rendered. Notes are stored in the existing Supabase `notes.content` field, including author, relationship, optional private email, and explicit publication preference. They never appear publicly without editorial review.

Facts live in `src/data/funFacts.ts`. Keep stable IDs. Browser local storage remembers the facts already shown. A new round requires an explicit visitor action.

## Private lab configuration

The public route is `/lab`. It fetches `/api/lab` only after a password is entered. The server checks a password of at least 20 characters, compares fixed-size hashes in constant time, and returns only title, description, and status fields. No private entries, password, or password hash are included in the public source or browser bundle. Responses are not cached. Access lasts for the current page view; refreshing or choosing Lock lab requires the password again.

Set `LAB_PASSWORD` to a strong randomly generated password as a Secret in Vercel. Set `LAB_CONTENT_JSON` to a JSON array in Vercel, for example:

```json
[{"title":"Private experiment","description":"A description visible only after unlocking.","status":"Researching"}]
```

Configure both Production and Preview, then redeploy. Without either value, the endpoint fails closed with 503. Do not put real private content into this public repository, build variables with a VITE_ prefix, or example files.

The connected Vercel account rejected environment-variable read and creation requests with HTTP 403 during implementation. The CLI had no existing credentials. Server configuration therefore remains an owner action.

## Après Boston

The public app is served directly at `/projects/apres-boston/`, including nested routes. It is a static browser build of the authorized private repository `Maxlobel/apres_boston`, source commit `01650e593cab3afef8630c96ee2b913bc2585797`.

Only browser assets are committed to this public portfolio. Private source, migrations, environment files, and source maps are excluded. The app continues using its own existing Supabase project. The build adapts Vite base URL, React Router basename, callback cleanup, not-found links, and PWA scope. Development authentication shortcuts are disabled in the production build. Email OTP and SMS behavior still depend on the original Supabase provider configuration.

To refresh the snapshot, obtain an authorized source checkout. Put only the app's browser-safe `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in that checkout's `.env.local`, then run:

```sh
node scripts/import-apres.mjs /path/to/apres_boston
npm run build
```

The importer stages the source in `.apres-build.local`, applies the hosting adaptations, builds it, and copies only `dist` into `public/projects/apres-boston`. Remove that ignored staging directory before rerunning. Update the source commit recorded here after importing a newer revision.

## Inquiry flow

The guided inquiry uses the existing `contact_submissions` table, category `client`, with name, email, and structured message. Notes use the existing `notes` table. Neither form duplicates submission text into analytics. Any existing Make automations remain responsible for downstream notifications. Database receipt and inbox delivery are separate verification steps.

## Validation

Run `npm run build`, `npx tsc -p tsconfig.app.json --noEmit`, and `node --test tests/lab.test.mjs`. Browser verification covers mobile navigation, guided inquiry, note consent and error retention, fact history, and Après Boston routes. Private lab verification must cover unauthorized requests as well as correct-password access after server configuration.

### Checks completed during this refresh

The production build and app TypeScript check passed. Lint passed for changed React components and data files. Two server security tests passed for lab access, including fail-closed configuration, wrong passwords, malformed requests, allowed output fields, and no-cache headers.

Browser checks passed at desktop and 390px mobile width: required intake fields, answer retention, duplicate submit prevention, note failure recovery and publication consent, 19 unique facts and persistence after reload, all three project overviews, lab unlock and relock against a local test configuration, mobile navigation, no horizontal overflow, and Après Boston nested navigation and refresh. No uncaught page errors were observed. Database responses were mocked for these browser checks; this does not establish delivery to a live database or inbox. No real OTP or SMS was sent.

A real portrait and approved testimonial quotations remain content inputs. The placeholders and unsupported testimonials have been removed, and the testimonial display is ready for approved entries.
