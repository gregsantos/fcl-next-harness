This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It demonstrates some of the basic features of a **Flow Dapp** using **FCL**

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Check the console output for useful logs and transaction status.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## FCL Local Development

Use `npm link` to install local packages
- `npm link ../path-to-fcl/fcl-js/packages/*`

From `../path-to-fcl/fcl-js/packages/fcl`
- `npm run start`

## Learn More

To learn more about FCL, take a look at the following resources:
- [FCL DOCS Home](https://docs.onflow.org/fcl/)
- [Flow Developer Onboarding Guide](https://docs.onflow.org/dapp-development/)
- [Flow App Quickstart](https://github.com/onflow/fcl-js/blob/master/docs/tutorials/flow-app-quickstart.mdx)
- [FCL API Quick Reference](https://github.com/onflow/fcl-js/blob/master/docs/reference/api.md)
- [More on Scripts](https://github.com/onflow/fcl-js/blob/master/docs/reference/scripts.mdx)
- [More on Transactions](https://github.com/onflow/fcl-js/blob/master/docs/reference/transactions.mdx)
- [User Signatures](https://github.com/onflow/fcl-js/blob/master/docs/reference/user-signatures.mdx)
- [Proving Account Ownership](https://github.com/onflow/fcl-js/blob/master/docs/reference/proving-authentication.mdx)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
