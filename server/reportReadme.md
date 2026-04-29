# Backend Project Report

## 1. Project Overview

The backend of this Blog App is a Node.js and Express-based REST API that manages user accounts, blog creation, blog updates, blog retrieval, and blog deletion. It acts as the application's data and business logic layer, connecting the frontend to MongoDB through Mongoose models.

The backend is intentionally lightweight and focused on core blog management operations. It exposes a small set of RESTful endpoints that support the full lifecycle of posts and user authentication through email/password login and signup.

## 2. Purpose and Objectives

The backend was built to:

- Provide a reliable API for the frontend blog application.
- Store user and blog data in MongoDB.
- Support authentication-related operations such as signup and login.
- Manage relationships between users and their posts.
- Return structured success and error responses.
- Keep the service simple enough to run locally or in Docker.

## 3. Key Features and Functionalities

- User registration with password hashing.
- User login with password verification.
- Create, read, update, and delete blog posts.
- Retrieve all blogs or only blogs for a specific user.
- Populate user and blog references for richer responses.
- Consistent API response and error formatting.
- MongoDB integration through Mongoose schemas.

## 4. Technology Stack

### Core Technologies

- **Node.js**: Runtime environment for the backend.
- **Express**: Web framework used to define routes and middleware.
- **MongoDB**: NoSQL database used to store users and blogs.
- **Mongoose**: Object data modeling library for MongoDB.

### Security and Utility Libraries

- **bcryptjs**: Used to hash passwords during signup and compare them during login.
- **cors**: Enables cross-origin requests from the frontend.
- **helmet**: Adds common security-related HTTP headers.
- **dotenv**: Loads environment variables from `.env`.
- **nodemon**: Reloads the server automatically during development.

### Why These Technologies

- Express keeps the API implementation simple and readable.
- MongoDB fits document-oriented blog and user data well.
- Mongoose provides validation, references, and easier query handling.
- bcryptjs is appropriate for password protection without adding unnecessary complexity.
- Helmet and CORS help harden and connect the API safely during development.

## 5. Project Structure

### Important Files and Directories

- `server.js`: Main application bootstrap file.
- `config/db.js`: MongoDB connection setup.
- `controller/user-contoller.js`: User signup, login, and user listing logic.
- `controller/blog-controller.js`: Blog CRUD and lookup logic.
- `model/User.js`: User schema and database model.
- `model/Blog.js`: Blog schema and database model.
- `routes/user-routes.js`: Routes for authentication and user listing.
- `routes/blog-routes.js`: Routes for blog operations.
- `utils/ApiResponse.js`: Standard success response wrapper.
- `utils/ApiError.js`: Standard error response wrapper.
- `.env.example`: Example environment file for local setup.

### Structure Summary

The backend is organized using a conventional MVC-inspired pattern:

- Routes map URLs to controllers.
- Controllers implement business logic.
- Models define database shape.
- Utilities standardize response payloads.

## 6. Setup and Installation

### Prerequisites

- Node.js and npm installed.
- MongoDB available locally, in Docker, or via MongoDB Atlas.

### Local Setup

1. Open the backend directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory.

4. Add the MongoDB connection string:

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/BlogApp
   ```

5. Start the backend server:

   ```bash
   npm start
   ```

6. The API will run on:

   ```bash
   http://localhost:5001
   ```

### Docker Setup

The repository also includes `docker-compose.yaml`, which starts:

- the frontend container,
- the backend container,
- and a MongoDB container.

## 7. Application Architecture and Code Flow

The backend follows a clear request-processing flow:

1. The client sends an HTTP request to an API endpoint.
2. Express matches the route in `routes/`.
3. The route forwards the request to a controller function.
4. The controller performs database operations using Mongoose models.
5. The controller wraps the result in `ApiResponse` or `ApiError`.
6. The JSON response is returned to the frontend.

### Request-Response Lifecycle Example

For a blog creation request:

1. The frontend posts blog data to `/api/blogs/add`.
2. `blog-controller.js` validates the associated user ID.
3. A new `Blog` document is created.
4. The blog reference is pushed into the user's `blogs` array.
5. A success response is sent back.

### Data Flow

- **Frontend -> Backend**: JSON request payloads are sent using Axios.
- **Backend -> Database**: Mongoose reads and writes user/blog documents.
- **Database -> Backend**: Query results are populated and serialized.
- **Backend -> Frontend**: JSON responses are returned to update the UI.

## 8. Core Functionalities

### User Signup

The signup flow checks for duplicate emails, hashes the password, and stores the new user.

```js
const hashedPassword = bcrypt.hashSync(password, 10);
```

### User Login

The login flow finds the user by email and compares the submitted password against the stored hash.

### Blog Creation

The backend verifies that the user exists before accepting a blog post. It then creates the blog and associates it with the user.

### Blog Retrieval

- All blogs can be retrieved with populated user details.
- A single blog can be fetched by ID.
- A user's blogs can be loaded by user ID.

### Blog Update

The update endpoint modifies blog title and description fields.

### Blog Deletion

The delete endpoint removes the blog from the database and also updates the owning user's blog list.

## 9. API Documentation

### Base URL

```text
http://localhost:5001/api
```

### User Endpoints

#### `GET /users`

Returns all users.

Response example:

```json
{
  "statusCode": 200,
  "data": {
    "users": []
  },
  "message": "Users fetched successfully",
  "success": true
}
```

#### `POST /users/signup`

Creates a new user account.

Request body:

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "secret123"
}
```

Response example:

```json
{
  "statusCode": 201,
  "data": {
    "user": {
      "_id": "..."
    }
  },
  "message": "User registered successfully",
  "success": true
}
```

#### `POST /users/login`

Authenticates a user using email and password.

Request body:

```json
{
  "email": "alice@example.com",
  "password": "secret123"
}
```

### Blog Endpoints

#### `GET /blogs`

Returns all blogs with populated user references.

#### `POST /blogs/add`

Creates a new blog post.

Request body:

```json
{
  "title": "My First Blog",
  "desc": "Blog content here",
  "img": "https://example.com/image.jpg",
  "user": "userObjectId"
}
```

#### `GET /blogs/user/:id`

Returns blogs for a specific user.

#### `GET /blogs/:id`

Returns a single blog by its ID.

#### `PUT /blogs/update/:id`

Updates blog title and description.

Request body:

```json
{
  "title": "Updated Title",
  "desc": "Updated description"
}
```

#### `DELETE /blogs/:id`

Deletes a blog by its ID.

### Response Pattern

The backend uses a consistent wrapper:

```js
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
```

Errors use `ApiError`, which adds a status code, message, and optional error details.

## 10. Authentication and Authorization

### Authentication

Authentication is implemented at the application level using email/password login.

- Passwords are hashed with `bcryptjs` during signup.
- Login compares the submitted password against the stored hash.
- On successful login, the API returns the user object without the password field.

### Authorization

The backend does not implement token-based authorization or role-based access control. Access decisions are currently based on whether the frontend provides a valid user ID in the request body or route parameters.

### Security Note

This design is functional for a coursework or prototype-level project, but in a production system it should be replaced with JWT/session-based authentication and server-side authorization checks.

## 11. Database Design

The backend uses two MongoDB collections: `users` and `blogs`.

### `User` Schema

```js
{
  name: String,
  email: String,
  password: String,
  blogs: [ObjectId]
}
```

#### Fields

- `name`: Required user name.
- `email`: Required and unique identifier for login.
- `password`: Required hashed password with minimum length validation.
- `blogs`: Array of blog references belonging to the user.

### `Blog` Schema

```js
{
  title: String,
  desc: String,
  img: String,
  user: ObjectId,
  date: Date
}
```

#### Fields

- `title`: Required post title.
- `desc`: Required blog description.
- `img`: Required image URL or data URL.
- `user`: Required reference to the owning user.
- `date`: Automatically set when the blog is created.

### Relationships

- One user can have many blogs.
- Each blog belongs to exactly one user.
- Mongoose `populate()` is used to resolve references when reading data.

## 12. Challenges and Solutions

- **Challenge: Protecting passwords**
  - Solution: Passwords are hashed with `bcryptjs` before storage.

- **Challenge: Keeping user-blog relationships synchronized**
  - Solution: When a blog is created, its reference is added to the user document; when deleted, the reference is removed from the user document.

- **Challenge: Returning readable API data**
  - Solution: `populate()` is used for blog and user lookups so the frontend gets meaningful nested data.

- **Challenge: Consistent response formatting**
  - Solution: `ApiResponse` and `ApiError` ensure a predictable JSON structure across endpoints.

## 13. Future Improvements

- Add JWT-based authentication and protected routes.
- Add middleware for authorization and ownership checks.
- Introduce request validation for all endpoints.
- Add pagination and filtering for blog listings.
- Implement centralized error-handling middleware.
- Replace manual user-ID checks with secure authenticated sessions.
- Add unit and integration tests for controllers and models.

## 14. Conclusion

The backend provides the essential data and business logic layer for the Blog App. It successfully handles user management, blog CRUD operations, and MongoDB integration in a concise and maintainable structure.

Its impact is seen in the way it supports the full frontend experience while keeping the API design straightforward enough for local development, deployment with Docker, and future extension into a more secure production-grade service.
