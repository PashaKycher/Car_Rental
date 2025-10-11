# CarRental (Client + Server)

A full-stack car rental application with a React + Vite client and an Express + MongoDB server.

## Overview

- Client: React (Vite) single-page app providing browsing, searching and booking cars, owner dashboard to list/manage cars and bookings.
- Server: Express API with JWT authentication, image uploads via ImageKit, and MongoDB (Mongoose) for persistence.

## Features

- User registration & login with JWT authentication.
- Owners can switch role, upload car listings with images, toggle availability and view dashboard stats.
- Users can search availability by date and location, create bookings, view own bookings.
- Image uploads handled via ImageKit.
- Simple role-based authorization for owner endpoints.

## Repo structure

- server/ — Express server
	- server/server.js — server entry
	- server/configs/db.js — MongoDB connection
	- server/configs/imageKit.js — ImageKit client
	- server/routes/ — route definitions
	- server/controllers/ — route handlers
	- server/middleware/ — auth and multer
	- server/models/ — Mongoose models
- client/ — React application (Vite)
	- client/src/main.jsx — client entry
	- client/src/context/AppContext.jsx — global app context (auth, axios, state)
	- client/src/pages/ — pages including owner dashboard and car flows
	- client/src/components/ — UI components and owner components

## Prerequisites

- Node.js 18+ (or current LTS)
- MongoDB instance (URI)
- ImageKit account (optional for production image upload)

## Environment variables

Create `.env` files for server and client as appropriate.

Server `.env` (server/.env) — required:
- MONGODB_URI — e.g. `mongodb+srv://user:pass@cluster0.mongodb.net`
- JWT_SECRET — secret for JWT signing
- IMAGEKIT_PUBLIC_KEY — (optional) ImageKit public key
- IMAGEKIT_PRIVATE_KEY — (optional) ImageKit private key
- IMAGEKIT_URL_ENDPOINT — (optional) ImageKit URL endpoint
- PORT — (optional) server port (default: 3000)

Client `.env` (client/.env) — examples:
- VITE_BASE_URL — e.g. `http://localhost:3000/`
- VITE_CURRENCY — e.g. `$`

## Install & Run

1. Install server deps and start server:
	 ```sh
	 cd server
	 npm install
	 npm run dev   # uses nodemon
	 ```
	 Server entry: server/server.js

2. Install client deps and start client:
	 ```sh
	 cd client
	 npm install
	 npm run dev
	 ```
	 Client entry: client/src/main.jsx

## API (high level)

- Auth-protected routes expect Authorization header set by client:
	- Client sets header in client/src/context/AppContext.jsx.

Main endpoints:
- POST /api/user/register — register user — handler: server/controllers/userController.js
- POST /api/user/login — login user — handler: server/controllers/userController.js
- GET /api/user/data — get user from token — protected by server/middleware/auth.js
- GET /api/user/cars — list available cars — handler: server/controllers/userController.js

Owner endpoints (require owner role or role switch):
- POST /api/owner/change-role — promote to owner — handler: server/controllers/ownerController.js
- POST /api/owner/add-car — add car (multipart, image) — handler: server/controllers/ownerController.js
- GET /api/owner/cars — list owner cars — handler: server/controllers/ownerController.js
- GET /api/owner/dashbord — dashboard data — handler: server/controllers/ownerController.js

Booking endpoints:
- POST /api/bookings/cheak-availability — search available cars for date & location — handler: server/controllers/bookingController.js
- POST /api/bookings/create — create booking — handler: server/controllers/bookingController.js
- GET /api/bookings/user — user bookings — handler: server/controllers/bookingController.js
- GET /api/bookings/owner — owner bookings — handler: server/controllers/bookingController.js

## Important implementation notes

- JWT token generation and decoding use `jsonwebtoken` and helpers in server/controllers/userController.js.
- Auth middleware decodes token in server/middleware/auth.js and attaches user to `req.user`.
- Image uploads use multer at server/middleware/multer.js and ImageKit client at server/configs/imageKit.js.
- Mongoose models: server/models/UserModels.js, server/models/CarModels.js, server/models/BookingModel.js.

## Client specifics

- Global axios base URL and header management performed in client/src/context/AppContext.jsx.
- Client flow: users can search in client/src/components/Hero.jsx and view car details in client/src/pages/CarDetails.jsx.
- Owner dashboard and pages: client/src/pages/owner/

## Troubleshooting

- If images fail to upload, check ImageKit credentials in server/configs/imageKit.js.
- If DB fails to connect, verify `MONGODB_URI` and network access; DB connection code in server/configs/db.js.

## Scripts

- Server:
	- `npm run dev` — start server with nodemon (in server/)
	- `npm start` — start server with node
- Client:
	- `npm run dev` — start Vite dev server (in client/)
	- `npm run build` — build production client

## Contributing

1. Fork the repo.
2. Create a branch for your feature or fix.
3. Open a pull request describing changes.

## License

Add your license information here.

