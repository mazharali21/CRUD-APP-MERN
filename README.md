A full-stack CRUD (Create, Read, Update, Delete) application built using the MERN stack — React, Node.js, Express.js, and MongoDB.

This project demonstrates a complete client-server architecture with RESTful APIs and a responsive frontend.

Features
Create new records
View all records
Update existing records
Delete records
REST API integration
Responsive UI
Modular code structure

Installation & Setup

1️. Clone the repository
  git clone https://github.com/mazharali21/CRUD-APP-MERN

2. Setup Server --> Terminal
  cd Server
  npm install

4. Create a .env file inside server directory and set the env variables
  PORT=5000
  MONGO_URI=your_mongodb_connection_string

5. Run the server 
  npm start

6. Setup Client --> Terminal
  cd client
  npm install
  npm run dev

Once both client and server are running:

The backend will run on: http://localhost:5000
The frontend will run on: http://localhost:5173 (or similar)

You can now perform full CRUD operations through the UI.
