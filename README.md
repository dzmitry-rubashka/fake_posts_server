# Fake Posts Server

> - Before starting server and connecting it to the database, create in the root folder `.env` file with variables definition according this example file [Link to .env.example](./.env.example). You can copy the content of this file to your own .env file and enter the variables values. After this the server will be able to start with your own local variables.

### How to run server in development mode:

> - Install all dependencies by running `npm install` command from root folder
> - To run the server use command `npm run nodemon` and after the server will be started on [http://localhost:3001](http://localhost:3001)

### How to create database in development mode
> - To create database run `npm run create-db` from root folder and this script will create local database
> - To create tables in the database run `npm run migrate` from root folder and this script will create tables
> - To add data in the database run `npm run seed` from root folder and this script will create some data from seeds files
> - You can also undo migrates and seeds running `npm run undo-migrate` or `npm run undo-seed` accordingly