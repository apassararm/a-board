# Full Stack Project

This project consists of a frontend built with Next.js and a backend built with NestJS.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Frontend](#running-the-frontend)
- [Setting Up Database](#setting-up-database)
- [Running the Backend](#running-the-backend)
- [Scripts](#scripts)
- [Frontend](#frontend)
- [Backend](#backend)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)

## Project Structure

The project is structured as follows:





## Installation

To install the project dependencies, you need to navigate to each directory and run the installation commands.

### Frontend

Navigate to the `frontend` directory and install dependencies:

```sh
cd frontend
npm install
```

### Backend

Navigate to the `backend` directory and install dependencies:

```sh
cd backend
npm install
```

## Running the Frontend

### Frontend
To run the `frontend` part of the project:

#### Development
```sh
cd frontend
npm run dev
```

This will start the frontend development server at http://localhost:3000.

Production
To build the frontend for production:

cd frontend
npm run build

To start the production server:

cd frontend
npm start

## Setting Up Database

> [!WARNING]
> Before running the backend, you need to set up the database using `PHPMyAdmin` and `XAMPP`.


1. **Install XAMPP**

    - Download and install XAMPP from [Download XAMPP](https://www.apachefriends.org/index.html) based on your operating system.


2. **Start Apache and MySQL**

    - Start the `Apache` and `MySQL` services from the XAMPP control panel.


3. **Access PHPMyAdmin**

    - Open your web browser and navigate to [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/).


4. **Create Database**

   - Click on the "New" button on the left sidebar to `create a new database`. Enter the desired database name and click "Create".


5. **Set Up Database Configuration**

    - Open the backend project directory and locate the `app.module.ts` file. Update the database configuration with the `database name`, `username` and `password`.

   In file `backend/src/app.module.ts`:

   ```typescript
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { Blog } from './blogs/blog.entity';
   import { Comment } from './comments/comment.entity';
   import { User } from './users/user.entity';
   import { BlogsModule } from './blogs/blogs.module';
   import { CommentsModule } from './comments/comments.module';
   import { UsersModule } from './users/users.module';

   @Module({
     imports: [
       TypeOrmModule.forRoot({
         type: 'mysql',
         host: 'localhost',
         port: 3306,
         username: 'root',
         password: '',
         database: 'your_database_name',
         entities: [Blog, Comment, User],
         synchronize: true,
       }),
       BlogsModule,
       CommentsModule,
       UsersModule,
     ],
   })
   export class AppModule {}

  Replace $\color{#F23536}\textsf{your-database-name}$ with the name of the database you created in PHPMyAdmin.

> [!NOTE]
> This section provides clear steps on setting up the database using XAMPP, creating a database using PHPMyAdmin,
> and configuring the backend project to connect to the database.



## Running the Backend

### Backend
To run the backend part of the project:

Development
cd backend
npm run start:dev

This will start the backend development server at http://localhost:3000.

Production
To build the backend for production:
cd backend
npm run build

To start the production server:
cd backend
npm run start:prod


