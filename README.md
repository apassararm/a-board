# Full Stack Project

This project consists of a frontend built with Next.js and a backend built with NestJS.

## Table of Contents

- [Application Architecture](#application-architecture)
    - [Frontend (Next.js)](#frontend-nextjs)
        - [Pages](#pages)
    - [Backend (NestJS)](#backend-nestjs)
- [Installation](#installation)
- [Setting Up Database](#setting-up-database)
- [Running the Project](#running-the-project)
- [Scripts](#scripts)
- [Dependencies](#dependencies)


## Application Architecture

The application follows a client-server architecture, with `Next.js` handling the frontend and `NestJS` managing the backend.

### Frontend (Next.js)

<div id="pages"></div>
- **Pages** : Different pages for :
    - `Homepage` : Show all blogs from the community.
        - Displaying blogs (titles, desctiptions, authors and categories).
        - Creating new blogs. (need to sign in)
    - `Our Blog` : Show all blogs that user created. (`need to sign in`)
        - Displaying blogs.
        - Creating new blogs.
        - Deleting blogs.
    - `Blog Detail` : Show details of a specific blog post.
        - Display the title, description, author, category and creation date of the blog post.
        - Allow users to view comments associated with the blog post.
        - Option to comment on the blog post and can edit or delete the comment (if the user is the author). (`need to sign in`)
    - `Sign In` : Users can sign in using their username.
        - Validate if the username exists. If it doesn't, display a warning message.
        - Include a link to redirect users to the registration page if they don't have an account yet.
    - `Register` : Users can create a new account.
        - Validate the following criteria :
            - Username must be unique and not already taken.
            - Username must be at least 5 characters long.
            - Username field cannot be left blank.
        - Upon successful registration, redirect the user to the sign-in page.

> [!NOTE]
> `Homepage` and `Our Blog` :
> - Implementing a search function to `search by title` (starting from 2 alphabets or more).
> - Implementing a `filter by category` option.
> 
> `All pages` :
> - Automatic sign-out after `5 minutes` of user inactivity (session timeout).


- **Components** : Reusable UI components for consistent design and functionality.
    - `Modal Component` :
        - Modal for creating/editing a blog post.
        - Modal for editing a comment.
        - Modal for confirming user actions, such as deleting content.
        - Modal that appears when the session times out and prompts the user to sign back in.
    - `Navbar Component` :
        - Navigation bar component displayed at the `top of every pages`.
    - `Sidebar Component` :
        - Side bar component displayed at the `left-hand side` of every pages (`laptop screen`).
    - `Mobile Menu Component` :
        - Mobile Menu component displayed at the `right-hand side` of every pages (`mobile screen`).
    - `Sign in/ Sign out Button Component` :
        - Which checks the user's sign-in status. If the user is signed in,
          it displays the `Sign out` button; otherwise, it displays the `Sign in` button.


- **API Routes** : Communicate with the backend API to fetch and manipulate data.

    The API service files are located in `frontend/src/app/services` folder. Below are examples from each service file :

    #### blogService.js
    
    ```javascript
    import axios from 'axios';
    
    const API_URL = 'http://localhost:5000';

    // Example of getting all blogs
    export const getAllBlogs = async () => {
      const response = await axios.get(`${API_URL}/blogs`);
      return response.data;
    };
    
    // Example of creating a new blog post
    export const createBlog = async (blog) => {
      const response = await axios.post(`${API_URL}/blogs`, blog);
      return response.data;
    };
    
    // Example of updating an existing blog post
    export const updateBlog = async (id, blog) => {
      const response = await axios.patch(`${API_URL}/blogs/${id}`, blog);
      return response.data;
    };
    
    // Example of deleting a blog post
    export const deleteBlog = async (id) => {
      const response = await axios.delete(`${API_URL}/blogs/${id}`);
      return response.data;
    }
    ```


    #### commentService.js
    
    ```javascript
    // Example of getting comments by blog ID
    export const getCommentByBlogId = async (blogId) => {
      const response = await axios.get(`${API_URL}/comments/blog/${blogId}`);
      return response.data;
    };
    
    // Example of creating a new comment
    export const createComment = async (comment) => {
      const response = await axios.post(`${API_URL}/comments`, comment);
      return response.data;
    };
    
    // Example of updating an existing comment
    export const updateComment = async (id, comment) => {
      const response = await axios.patch(`${API_URL}/comments/${id}`, comment);
      return response.data;
    };
    
    // Example of deleting a comment
    export const deleteComment = async (id) => {
      const response = await axios.delete(`${API_URL}/comments/${id}`);
      return response.data;
    };
    ```
    

    #### userService.js
    
    ```javascript
    // Example of getting all users
    export const getAllUsers = async () => {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    };
    
    // Example of getting a user by ID
    export const getUserById = async (id) => {
      const response = await axios.get(`${API_URL}/users/${id}`);
      return response.data;
    };
    
    // Example of creating a new user
    export const createUser = async (user) => {
      const response = await axios.post(`${API_URL}/users`, user);
      return response.data;
    };



### Backend (NestJS)

In the backend, the project structure is organized as follows:

- **main.ts**: Entry point of the application.
- **app.module.ts**: Main module of the application, where modules, controllers, and providers are registered.
- **app.service.ts**: Main service of the application, responsible for providing common functionalities across modules.
- **app.controller.ts**: Main controller of the application, responsible for handling incoming HTTP requests.

The backend further consists of three main modules:

1. **Blogs Module**:
   - Contains functionality related to blogs.
   - Organized into separate folders:
     - **dto**: Contains Data Transfer Objects (DTOs) for creating and updating blogs (`create-blog.dto.ts` and `update-blog.dto.ts`).
     - **entities**: Contains database entities related to blogs (`blog.entity.ts`).
     - **blogs.module.ts**: Module file where the blogs-related components are registered.
     - **blogs.service.ts**: Service file containing business logic for blogs.
     - **blog.controller.ts**: Controller file responsible for handling HTTP requests related to blogs.

2. **Comments Module**:
   - Contains functionality related to comments. (Include similar breakdown as the Blogs Module)

3. **Users Module**:
   - Contains functionality related to users. (Include similar breakdown as the Blogs Module)

Each module follows the same structure, with DTOs, entities, module, service, and controller files organized within their respective folders for better maintainability and organization.

## Database Design
The database consists of three main tables:

1. **Blogs Table**:
    - Stores information about each blog post, such as title, content, author ID, and creation date.
2. **Comments Table**:
    - Holds comments associated with each blog post, including the commenter's name, email, comment content, and timestamp.
3. **Users Table**:
    - Contains user data, including username, email, password (hashed), and any additional profile information.

## API Endpoints
The backend exposes RESTful API endpoints for performing CRUD operations on blogs, comments, and users.

- `/api/blogs`: CRUD operations for blogs.
- `/api/comments`: CRUD operations for comments.
- `/api/users`: CRUD operations for users.



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

## Setting Up Database

> [!WARNING]
> Before running the project, you need to set up the database using `PHPMyAdmin` and `XAMPP`.


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
         database: 'your-database-name',
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


## Running the Project

### Frontend

To run the `frontend` part of the project :

#### Development
```sh
cd frontend
npm run dev
```

This will start the frontend development server at `http://localhost:3000`.

#### Production

To build the frontend for `production` :

```sh
cd frontend
npm run build
```

To start the `production server` :

```sh
cd frontend
npm start
```


### Backend

To run the `backend` part of the project :

#### Development
```sh
cd backend
npm run start:dev
```

This will start the backend development server at `http://localhost:5000`.


#### Production

To build the backend for `production` :

```sh
cd backend
npm run build
```

To start the `production server` :

```sh
cd backend
npm run start:prod
```



## Scripts

The following scripts are defined in the `package.json` files :

### Frontend Scripts
- **`dev`** : Starts the development server.
- **`build`** : Builds the project for production.
- **`start`** : Starts the production server.

### Backend Scripts
- **`build`** : Builds the project.
- **`start`** : Starts the application.
- **`start:dev`** : Starts the application in development mode with file watching.
- **`start:debug`** : Starts the application in debug mode with file watching.
- **`start:prod`** : Starts the application in production mode.
- **`test`** : Runs the tests.
- **`test:watch`** : Runs the tests in watch mode.
- **`test:cov`** : Runs the tests and generates coverage reports.
- **`test:debug`** : Runs the tests in debug mode.
- **`test:e2e`** : Runs the end-to-end tests.


## Dependencies

The project has the following dependencies :

### Frontend Dependencies
- **`axios`** : ^1.7.2
- **`next`** : 14.2.3
- **`react`** : ^18
- **`react-dom`** : ^18

### Backend Dependencies
- **`@nestjs/common`** : ^10.0.0
- **`@nestjs/core`** : ^10.0.0
- **`@nestjs/mapped-types`** : *
- **`@nestjs/platform-express`** : ^10.0.0
- **`@nestjs/typeorm`** : ^10.0.2
- **`mysql2`** : ^3.10.0
- **`typeorm`** : ^0.3.20
