# E-Commerce

<div align="center">

### <img src="https://raw.githubusercontent.com/rodolfole/next-ecommerce-front/main/app/favicon.ico" height="30px"/> [Ecommerce-Store](https://next-ecommerce-front-swart.vercel.app)

</div>

## Cloning the repository

```shell
git clone https://github.com/rodolfole/next-ecommerce-front.git
```

## Getting Started

Install the dependencies:

```sh
$ pnpm i
# or
$ yarn
# or
$ npm i
```

Setup .env file

```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_API_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

Config prisma

```sh
$ pnpm prisma generate
$ pnpm prisma db push
```

Start the app

```sh
$ pnpm dev
# or
$ yarn
# or
$ npm run dev
```

## Built With

- Nextjs 13
- Prisma
- MySQL
- Tailwind
- Zustand
