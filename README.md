This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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


[shadcn: label, input, textarea, select]

NPM RUN DEV TO START


1. Började med basic Frontend och UI där jag använder Shadcn för komponenter. Behöver ingen npm packages för Shadcn (?).
2. Satte upp bas komponenter, layout, folders.
3. Installerade Kinde Auth och fixade ENV variabler + API handling för det. Inga speciella API calls för Kinde Login/Register. Bara två Links, RegisterLink och LoginLink komponenter som vi copy/pastar.

Rose Color: #E21C49


Database pw supabase: potatis0228

npm i -D prisma

-D = Development Depedency, bundle wont show up in production. Only in Dev Environment until we deploy.

Sen

npm i @prisma/client

npx prisma init = INITALIZE THE CLIENT

Need TWO URLS for Prisma with Supabase, check DOCS

COMMAND: 
npx prisma db push (PUSH TO THE DATABASE)
npx prisma generate
npx prisma studio

Due to hot reloading. In a dev enviroment, create a new global prisma env.


db.ts:

If we are NOT in a prod env. set our prisma client to a Global Prisma. If we are in a prod env, use this normal new Prisma Client.



[id] folder = dynamic route, get the id through the pathname.
