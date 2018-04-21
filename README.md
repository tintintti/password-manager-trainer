Simple web app for demonstrating using password managers.

First you can create a user with some password, and then log in with that user. After login the app simply shows your username. The hashed password is also shown white on white, so it can be highlighted if wanted to show how the hashed password is saved to the database.

#### Running locally
You need node installed and a MongoDB database to use.

Have the MongoDB database URI in `.env` file in root of the project for the database connection.

Run `npm install` and `npm start` in the root of the project and go to `localhost:3000`
