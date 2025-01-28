<h1 align="center"> Twitter-Backend </h1>

#### This is a Twitter backend REST APIs.

## 🚀 Installation & Setup

Follow these steps to get the project up and running on your machine:

### 📋 Steps

1. **Clone the repository:**

   Clone the repository to your local machine using git.

   ```bash
   git clone https://github.com/Rushi1109/Twitter-Backend.git
   cd Twitter-Backend
   ```

2. **Install dependencies:**

   Run the command to install dependencies.

   ```bash
   npm install
   ```

3. **Create `.env` file:**

   - Add the `MONGO_URL` variable with the appropriate MongoDB URI. Make sure to append `/your_database_name` at the end of the URI.
   - Add the `PORT` number to run for backend service.
   - Set the `JWT_SECRET` to sign the jwt tokens.

4. **Start the Server**
    **🧊 Run using Docker-Compose**

    Make sure you have installed `Docker-Compose` on your machine.
   
    Run the following command to run backend server using docker-compose.
    ```bash
    docker-compose up
    ```

## 🌱 Health Check
   To ensure that the application and the MongoDB database are running smoothly, you can perform a health check by sending a GET request to the following endpoint:

   ```bash
   GET http://localhost:8000/api/healthy
   ````

## ✨ Features

- User can Signup/Login.

- User password is stored in encrypted form.

- User can create a Tweet.

- Tweets can also include hashtags.

- User can Like/UnLike a Tweet.

- User can Comment on a Tweet as well as on a Comment.

- User can Delete Tweets and Comments.

## 🛠️ TechStack

- [NodeJS](https://nodejs.org/en) Runtime for running JavaScript.

- [ExpressJS](https://expressjs.com/) NodeJS based web application framework for building API.

- [MongoDB](https://www.mongodb.com/docs/) NoSQL, Document based Database.

- [Mongoose](https://mongoosejs.com/) ODM for MongoDB.

- [PassportJS](https://www.passportjs.org/) NodeJS library for JWT based user authentication.