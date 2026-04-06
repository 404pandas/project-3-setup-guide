<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributors](https://img.shields.io/github/contributors/404pandas/project-3-setup-guide.svg?style=plastic&logo=appveyor)](https://github.com/404pandas/project-3-setup-guide/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/404pandas/project-3-setup-guide.svg?style=plastic&logo=appveyor)](https://github.com/404pandas/project-3-setup-guide/network/members)
[![Stargazers](https://img.shields.io/github/stars/404pandas/project-3-setup-guide.svg?style=plastic&logo=appveyor)](https://github.com/404pandas/project-3-setup-guide/stargazers)
[![Issues](https://img.shields.io/github/issues/404pandas/project-3-setup-guide.svg?style=plastic&logo=appveyor)](https://github.com/404pandas/project-3-setup-guide/issues)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black.svg?style=plastic&logo=linkedin&colorB=555)](https://linkedin.com/in/404pandas)

</div>

<div align="center">

  <h1>The Novigrad Underground</h1>
  <p><em>Buy. Sell. Don't ask questions.</em></p>

  <p>
    <a href="https://novigradunderground.onrender.com/"><strong>View Live App »</strong></a>
    &nbsp;·&nbsp;
    <a href="https://github.com/404pandas/project-3-setup-guide"><strong>Explore the docs »</strong></a>
    &nbsp;·&nbsp;
    <a href="https://github.com/404pandas/project-3-setup-guide/issues">Report Bug</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/404pandas/project-3-setup-guide/issues">Request Feature</a>
  </p>

</div>

---

## About The Project

The Novigrad Underground is a Witcher-themed black market trading board built on the MERN stack. It started as my own take on the Project 3 Setup Guide skeleton I built for bootcamp students — fully redesigned with new models, a custom visual identity, and features well beyond the original template.

Users can post listings and wanted ads, leave inquiries on items, vouch or burn other users, and climb a reputation leaderboard. All protected behind JWT auth with server-side ownership enforcement.

### Built With

<div align="center">

[![JavaScript](https://img.shields.io/badge/Language-JavaScript-ff0000?style=plastic&logo=JavaScript&logoWidth=10)](https://javascript.info/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-80ff00?style=plastic&logo=MongoDB&logoWidth=10)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-ff0000?style=plastic&logo=Node.js&logoWidth=10)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Framework-Express-80ff00?style=plastic&logo=Express&logoWidth=10)](https://expressjs.com/)
[![React](https://img.shields.io/badge/Framework-React-ff8000?style=plastic&logo=React&logoWidth=10)](https://react.dev/)
[![Apollo GraphQL](https://img.shields.io/badge/API-Apollo_GraphQL-ff0000?style=plastic&logo=apollographql&logoWidth=10)](https://www.apollographql.com/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-ff8000?style=plastic&logo=vite&logoWidth=10)](https://vitejs.dev/)
[![Render](https://img.shields.io/badge/Cloud-Render-00ff00?style=plastic&logo=render&logoWidth=10)](https://render.com/)

</div>

---

## Features

- **Market Board** — post items for sale with category, risk level, region, and pricing. Listings are sorted newest-first. Only the owner can edit or delete their own.
- **Wanted Board** — post what you're looking to acquire and what you'll pay. Mark fulfilled when a deal is done.
- **Inquiries** — leave questions directly on a listing. Per-listing threads, editable by their authors.
- **Reputation System** — vouch or burn other users. One rating per pair, enforced at the database level with a unique compound index. Score = vouches minus burns.
- **Leaderboard** — ranks the most trusted contacts by reputation score using a MongoDB aggregation pipeline. All entries link through to that user's profile.
- **User Profiles** — each user has a stash page showing their active listings and reputation panel.
- **JWT Auth** — protected routes, ownership-gated edits and deletes, server-side identity. No client-supplied usernames trusted.

---

## Getting Started

### Prerequisites

- Node.js
- A MongoDB Atlas cluster (or local MongoDB instance)

### Installation

1. Clone the repo

```sh
git clone https://github.com/404pandas/project-3-setup-guide.git
```

2. Install all dependencies

```sh
npm run install
```

3. Create a `.env` file in the `server/` directory

```sh
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

4. Seed the database

```sh
npm run seed
```

5. Start the development server

```sh
npm run develop
```

6. Visit the app at:

```
http://localhost:3000
```

GraphQL sandbox:

```
http://localhost:3001/graphql
```

---

## Deployment

Deployed on [Render](https://render.com) with MongoDB Atlas.

**Build command:** `cd server && npm install && cd ../client && npm install --include=dev && npm run build`

**Start command:** `npm start`

**Required environment variables on Render:**
- `NODE_ENV` = `production`
- `MONGODB_URI`
- `JWT_SECRET_KEY`

---

## Roadmap

- [x] Market Board (listings)
- [x] Wanted Board
- [x] Inquiries on listings
- [x] JWT authentication
- [x] Ownership-gated edits and deletes
- [x] Reputation system (vouch / burn)
- [x] Leaderboard
- [x] User profiles
- [ ] Search and filtering on listings
- [ ] Direct messaging between users
- [ ] Notification system

See [open issues](https://github.com/404pandas/project-3-setup-guide/issues) for proposed features and known bugs.

---

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License. See `LICENSE.txt` for details.

---

## Contact

[Mary Elenius](https://maryelenius.com/d20) — mary.panda.jackson@gmail.com

[GitHub Repository](https://github.com/404pandas/project-3-setup-guide)

[Live App](https://novigradunderground.onrender.com/)

---

## Acknowledgments

Big shoutout to my daughter Yennefer — small yet mighty, and the reason half the Witcher character names in the seed data hit different.

And to every bootcamp student who used the Project 3 Setup Guide: this one's for you.
