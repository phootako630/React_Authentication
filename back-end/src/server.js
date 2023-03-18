import express from 'express';
import { routes } from './routes';
import cors from 'cors';
import { initializeDbConnection } from './db';
import dotenv from 'dotenv';

dotenv.config();

// The rest of your code


const PORT = process.env.PORT || 8080;

const app = express();

app.use(
    cors({
        origin: [
            "https://react-authentication-phootako630.vercel.app",
            "https://react-authentication-git-awscognitoauth-phootako630.vercel.app",
            "https://react-authentication-five.vercel.app",
            "https://react-authentication-n5xugd1dk-phootako630.vercel.app"
            // Add more domains as needed
        ],
    })
);
// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });