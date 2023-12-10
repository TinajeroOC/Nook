<h1 align="center">
Nook
</h1>
<p align="center">
Nook is a full-stack web application for combining multiple links into one. It is built using Next.js, NextUI, and PocketBase.
</p>

## Requirements

- Node.js V16 or higher

## Installation

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

4. Add the PocketBase executable to `src/pocketbase`

5. Open `src/pocketbase` in a separate terminal and run PocketBase using `./pocketbase serve`

6. Create a PocketBase administrator account

7. Create `.env.local` in the root directory and copy the template from `.env.local.example`

8. Update `PB_ADMIN_EMAIl` and `PB_ADMIN_PASSWORD` with your administrator account credentials

9. Run Nook in development mode

```
npm run dev
```
