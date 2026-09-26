# CED operations platform

Functional Next.js and Supabase prototype for multi-site industrial procurement, machinery booking, logistics, remediation and emergency support.

## Local setup

1. Create a Supabase project.
2. Run `supabase/migrations/202609260001_initial_schema.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local` and add the project URL and anon key.
4. Run `npm run dev`.

When Supabase keys are absent, authentication explicitly opens a non-persistent preview so the product can still be reviewed. With keys present, the portal is protected by Supabase Auth and workflow forms persist tenant-scoped records under RLS.

## Product routes

- `/` — public marketing site
- `/auth` — sign in, organization signup and onboarding
- `/portal/dashboard` — multi-site operations overview
- `/portal/catalog` — searchable equipment, aggregates and manpower
- `/portal/rfqs` — RFQ builder and quote management
- `/portal/bookings` — machinery booking and logistics tracking
- `/portal/remediation` — environmental request and vision assessment
- `/portal/orders` — order board and shipment status
- `/portal/emergency` — AI triage and emergency escalation
- `/portal/admin` — CMS, organization and user management

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
