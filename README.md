# Social Media App

A full-stack social media app where users can sign up, share photo posts, like posts, and manage their own profile. Built with Node.js, Express, and MongoDB using the MVC pattern.

**Live demo:** [your-app-url-here](https://your-app-url-here)

![App screenshot](./screenshot.png)

---

## Features

- **User authentication**: sign up, log in, and log out with Passport.js and session-based auth
- **Image posts**: upload photos with a title and caption, stored in Cloudinary
- **Likes**: like posts from the feed or the post page
- **Profile page**: see all of your own posts in one place
- **Post management**: delete your own posts (and their images in Cloudinary)
- **Persistent sessions**: sessions stored in MongoDB, so you stay logged in after a server restart

## Tech Stack

| Layer | Tools |
| --- | --- |
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Views | EJS, Bootstrap |
| Auth | Passport.js (local strategy), express-session |
| File uploads | Multer, Cloudinary |

## How It's Built

The app follows the **Model-View-Controller** pattern:

- **Models** (`/models`): Mongoose schemas for users and posts
- **Views** (`/views`): EJS templates rendered on the server
- **Controllers** (`/controllers`): the logic for each route (auth, posts, home)
- **Routes** (`/routes`): map URLs to controller functions
- **Middleware** (`/middleware`): auth checks and Multer upload handling

## What I Learned

<!-- Write 2–4 honest bullets here. These are what interviewers ask about. Examples: -->
- How session-based authentication works, from login to protected routes
- Why images go to a separate service (Cloudinary) while MongoDB only stores the URL
- How MVC keeps routes, logic, and data separate as an app grows

## What I Added

<!-- List your own changes to the template here. This is the part that makes it yours. -->
- _Feature or improvement #1_
- _Feature or improvement #2_

## Run It Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the `config` folder with:

```
PORT=8888
DB_STRING=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

> `PORT` can be any open port (for example, 3000). Never commit your `.env` file. It's already listed in `.gitignore`.

### 3. Start the server

```bash
npm start
```

Then open `http://localhost:8888`.

## Credits

Built on the [100Devs](https://100devs.org) social media app template, then extended with the features listed above.

## License

[MIT](./LICENSE)