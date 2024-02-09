# KanSync

This web application is for managing and organizing tasks using the Kanban methodology similar to Trello with Pluggable components and customizable boards.

[deployed demo](https://kanban-board-nwiv.onrender.com/)
> [!NOTE]
> As this uses a free tier you may need to wait up to 2-3 minutes until the server wakes up.
## Features

![animation-1](https://github.com/User0k/kanban-board/assets/25122117/6eb5b774-d2b0-46b7-9cf9-2548f6dc0c71)

<details>
  <summary>Board customization gif</summary>
  
  ![animation-2](https://github.com/User0k/kanban-board/assets/25122117/f74e2242-0d75-4e10-a01c-a56f5bdfeeeb)
    
</details>

## Features
This project includes the following features:
- Secure authentication using JWT tokens, ensuring the utmost protection for user data.
- Private routing, offering exclusive access to designated areas.
- Internationalization, currently supporting English and Russian languages.
- Intuitive task management, empowering users to effortlessly create, update, and delete columns and tasks on the board.
- Board background customization.
- Drag and drop: users can easily move columns and tasks between columns or within same column using drag and drop functionality.
- Collaboration: users can assign themselves or their team members to certain tasks.
- Adaptive from 1920px to 320px.

## Technologies Used
- Frontend: React, TypeScript, Vite, Material-UI, Emotion, React Hook Form, React Router
- Backend: Express.js, PostgreSQL, Sequelize, JSON Web Tokens (JWT), bcrypt

## Getting Started
To run this locally, follow these steps:
1. Clone the repository: `git clone [<repository-url>](https://github.com/User0k/kanban-board)https://github.com/User0k/kanban-board`
2. Install dependencies: as the project uses root package.json you can install dependencies for both client and server running `npm run install:all`. Or install them manually for each folder.
3. Get an url of a deployed Postgres. This project was tested using free tier of Supabase.
4. Set up environment variables:
- 4.1. Rename `.env.example` file into `.env`.
- 4.2. Fill up `DATABASE_URL` variable with your databse url. Usually it follows this pattern: `postgres://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]`.
- 4.3. Fill up `JWT_ACCESS_KEY` and `JWT_REFRESH_KEY` with any characters you like.
5. Start the development servers: `npm run dev` will run both client and server. If you want to start them independently, run `cd client && npm run dev` for client and `cd server && npm run dev` for server.
> [!WARNING]
> You should see `server is running on port` in your terminal after server has run. Otherwise you may have issues connecting to your database.
> Most parts of the application will be unavailbale if the server is not running. Anyway, you can access it at `http://localhost:3000`.

## Tips to deploy
1. Follow steps 1 - 4.3 above.
2. Instead of running the client, you should build it: `npm run build:client`.
3. If you want to test how your pre-deploy works locally, inside the .env file rename these variables: `MODE` to 'production', `CLIENT_URL` to the deployed url, `VITE_BASE_URL` to `<CLIENT_URL>/api/`. If you deploy it somewhere, than you need to pass variables from the `.env` file to secrets of your service.
