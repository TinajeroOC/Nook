# Nook

Nook is a full-stack web application for aggregating multiple links into one. It is built using [Next.js](https://nextjs.org/), [NextUI](https://nextui.org/), [Tailwind CSS](https://tailwindcss.com/), and [PocketBase](https://pocketbase.io/)

## Installation

Nook requires Node.js V16+ to run.

1. Clone the repository

```
git clone git@github.com:TinajeroOC/Nook.git
cd Nook
```

2. Install dependencies

```
npm install
```

3. Download [PocketBase](https://pocketbase.io/docs/) for your platform

4. Extract the zip and drop the PocketBase executable into `src/pocketbase`

5. Run PocketBase

```
npm run pocketbase
```

> If you are on MacOS, open `src/pocketbase` in a separate terminal and type `./pocketbase serve`

6. Create a PocketBase administrator account

7. Create a `.env.local` file in the root directory and copy the template from the `.env.local.example` file

8. Update `PB_ADMIN_EMAIl` and `PB_ADMIN_PASSWORD` with your credentials

9. Run application in development mode

```
npm run dev
```
