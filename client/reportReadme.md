# Frontend Project Report

## 1. Project Overview

The frontend of this Blog App is a React-based single-page application built to provide a clean, responsive, and modern interface for creating, viewing, updating, and deleting blog posts. It acts as the presentation and interaction layer of the MERN stack solution, communicating with the backend through REST APIs.

The user interface is designed around two main usage patterns:

- Public access to authentication pages.
- Authenticated access to blog browsing, personal blog management, and blog creation.

The application emphasizes usability, visual clarity, and responsive design. It uses a modern card-based layout, a light/dark theme toggle, and live preview elements to improve the writing and reading experience.

## 2. Purpose and Objectives

The frontend was developed with the following objectives:

- Provide a responsive and intuitive interface for blog readers and authors.
- Enable authentication-driven navigation with persistent login state.
- Support blog creation with preview and image handling.
- Present the blog feed in a readable and visually engaging format.
- Allow users to manage their own posts efficiently.
- Keep the UI modular so that features can be extended without major restructuring.

## 3. Key Features and Functionalities

- User login and signup flow.
- Persistent login state using `localStorage`.
- Blog feed page showing all blogs from the backend.
- Personal blog dashboard for the logged-in user.
- Blog creation form with live preview.
- Blog editing screen for updating title and description.
- Blog deletion with confirmation dialog.
- Theme switching between light and dark modes.
- Responsive layout using Material UI and custom CSS.

## 4. Technology Stack

### Core Technologies

- **React 18**: Used to build the component-based user interface.
- **React Router DOM v6**: Handles client-side routing and navigation.
- **Redux Toolkit**: Manages application state such as authentication and theme settings.
- **React Redux**: Connects React components to the Redux store.
- **Axios**: Performs HTTP requests to the backend API.

### UI and Styling

- **Material UI (MUI)**: Provides ready-made UI components such as AppBar, Tabs, Cards, Dialogs, Buttons, and TextFields.
- **MUI Styles**: Used for some component-level styling helpers.
- **Styled Components**: Available in the project dependencies for CSS-in-JS styling support.
- **Custom CSS**: Implements the visual theme, layout system, glass effects, responsive behavior, and typography.

### Why These Technologies

- React is well suited for modular, reusable UI composition.
- React Router keeps navigation clean and declarative.
- Redux Toolkit simplifies global state handling for auth and theme.
- MUI speeds up implementation while keeping the interface consistent.
- Axios is easy to use for REST-based communication.

## 5. Project Structure

### Important Files and Directories

- `src/App.js`: Main application shell and route definitions.
- `src/index.js`: React entry point that mounts the app, store, and router.
- `src/store/index.js`: Redux slices for auth and theme state.
- `src/config.js`: Central API base URL configuration.
- `src/utils/theme.js`: Theme constants used by styling logic.
- `src/componets/Header.js`: Top navigation bar, tabs, auth buttons, and theme toggle.
- `src/componets/Login.js`: Login and signup form handling.
- `src/componets/Blogs.js`: Displays the full blog feed.
- `src/componets/Blog.js`: Reusable card component for a single blog post.
- `src/componets/UserBlogs.js`: Shows blogs created by the current user.
- `src/componets/AddBlogs.js`: Blog creation page with live preview.
- `src/componets/BlogDetail.js`: Blog editing form for an existing post.
- `src/componets/DeleteBlogs.js`: Standalone delete button component.
- `src/componets/utils.js`: Shared formatting and styling helpers.
- `src/index.css`: Global styles, CSS variables, layout rules, and theme definitions.
- `src/App.css`: Page-specific styles for forms, preview panels, and blog composer layout.

### Structure Summary

The frontend follows a feature-oriented component structure. Route-level screens are separated from reusable UI elements, which improves maintainability and makes the application easier to extend.

## 6. Setup and Installation

### Prerequisites

- Node.js and npm installed.
- Backend service running on `http://localhost:5001`.
- MongoDB running through the backend or Docker stack.

### Local Setup

1. Open the frontend directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open the app in a browser:

   ```bash
   http://localhost:3000
   ```

### Environment Variables and Configuration

This frontend currently uses a static API base URL defined in `src/config.js`:

```js
const config = {
  BASE_URL: "http://localhost:5001",
};
```

If the backend host changes, this value should be updated accordingly.

## 7. Application Architecture and Code Flow

The frontend is structured around a route-driven React application:

1. `index.js` renders `App` inside `BrowserRouter` and `Provider`.
2. The Redux store is shared across the app.
3. `App.js` defines the main routes and checks local authentication state.
4. `Header.js` controls navigation, theme switching, and auth actions.
5. Screen components call backend APIs through Axios.
6. Responses are stored in component state and then rendered to the UI.

### Data Flow

- The user interacts with forms or navigation controls.
- The component triggers an API request using Axios.
- The backend returns structured JSON.
- The component stores the result in local state or Redux state.
- The UI re-renders based on updated state.

### Request-Response Lifecycle Example

When a user submits a blog:

1. `AddBlogs.js` collects the title, description, and image.
2. The user ID is read from `localStorage`.
3. Axios sends a `POST` request to `/api/blogs/add`.
4. The backend saves the blog and returns a response object.
5. The frontend navigates back to the blog list after success.

## 8. State Management and UI Flow

The frontend uses Redux Toolkit for a small but important global state layer.

### Auth State

The `auth` slice stores whether the user is logged in:

```js
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});
```

Login state is synchronized with `localStorage`. On app load, `App.js` checks whether a `userId` exists and dispatches `authActions.login()` if found.

### Theme State

The `theme` slice stores whether dark mode is enabled:

```js
const themeSlice = createSlice({
  name: "theme",
  initialState: { isDarkmode: false },
  reducers: {
    setDarkmode: (state, action) => {
      state.isDarkmode = action.payload;
    },
  },
});
```

The theme value is persisted in `localStorage` and applied to the document body through a CSS class toggle. This keeps the visual theme consistent across page refreshes.

### UI Flow

- `Header` decides which navigation controls are visible based on auth state.
- `Login` switches between login and signup modes.
- `Blogs` renders the public feed.
- `UserBlogs` renders only the current user's posts.
- `AddBlogs` includes an editor and a preview panel side by side on larger screens.
- `BlogDetail` allows editing an existing post and then redirects back to personal blogs.

### Example of Conditional Routing

```js
<Route
  path="/"
  element={<Navigate to={isLoggedIn ? "/blogs" : "/login"} replace />}/>
```

This keeps unauthenticated users on the login page and sends authenticated users to the main feed.

## 9. Authentication and Authorization

The frontend handles authentication state, but it does not implement token-based security on its own.

### How Authentication Works

- The user signs up or logs in through `Login.js`.
- The backend returns a user object.
- The frontend stores the user ID in `localStorage`.
- Redux updates `isLoggedIn`.
- Protected UI elements such as tabs and logout controls are shown only when logged in.

### Authorization Model

There is no fine-grained role-based authorization in the frontend. Access control is based on the presence of a stored `userId` and whether the UI considers the user logged in. Blog edit/delete controls are shown only when the current blog belongs to the logged-in user.

## 10. Core Functionalities

### Login and Signup

The `Login` component sends requests to `/api/users/login` or `/api/users/signup` and handles error messages gracefully.

### Blog Listing

`Blogs.js` requests all blogs from the server and renders them in a responsive grid of `Blog` cards.

### Personal Blog Dashboard

`UserBlogs.js` requests all blogs associated with the current user ID and deduplicates the results before rendering.

### Blog Creation

`AddBlogs.js` provides:

- Title input
- Description editor
- Image URL support
- Local file upload preview
- Live preview of the finished post

### Blog Editing

`BlogDetail.js` loads the selected blog, populates the form, and submits updates to the backend.

### Blog Deletion

Deletion is supported through the `Blog` card and `DeleteBlogs.js`. A confirmation dialog is displayed before the request is completed.

## 11. Challenges and Solutions

- **Challenge: Persisting login across refreshes**
  - Solution: The app uses `localStorage` to store the user ID and rehydrates auth state on load.

- **Challenge: Maintaining a clear interface across screen sizes**
  - Solution: Custom responsive CSS and MUI breakpoints are used to adapt layouts for mobile, tablet, and desktop.

- **Challenge: Supporting both reading and writing workflows**
  - Solution: Separate screens were designed for feed browsing, personal posts, and post composition with preview.

- **Challenge: Handling theme consistency**
  - Solution: Theme choice is stored in `localStorage` and reflected through CSS variables and a body class.

## 12. Future Improvements

- Add JWT-based authentication instead of local ID persistence.
- Introduce route guards for stronger client-side access control.
- Add search, filter, and pagination for larger blog collections.
- Improve rich text editing with markdown or WYSIWYG support.
- Add image upload to a storage service instead of relying on URLs or browser previews.
- Expand user profile and settings pages.
- Add client-side validation and form schemas.

## 13. Conclusion

The frontend delivers a modern and responsive interface for the Blog App while keeping the implementation modular and maintainable. It demonstrates practical use of React, Redux Toolkit, React Router, Material UI, and Axios in a real-world CRUD application.

The overall impact of this frontend is a smooth content management experience for users, with clear navigation, a readable UI, and an organized flow from authentication to publishing.
