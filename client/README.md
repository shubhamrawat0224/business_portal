# React Dashboard Client

This is a React-based dashboard client for the ride/order management system. It integrates with the backend RESTful API for dynamic data visualization and management.

## Features

- User authentication (login, registration)
- Dynamic dashboard with:
  - Welcome message with user name
  - Top drivers
  - Orders table
  - Statistics and charts
  - Knowledge base
  - Messages/notifications
- Role-based UI (admin, driver, client, moderator)
- Responsive and modern design

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure API base URL in `src/api/api.js` if needed.

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Integration

- The client uses Axios to communicate with the backend API.
- After login, the JWT token and user info are stored in localStorage.
- The dashboard reads the user info from localStorage to display the correct name and personalize the UI.

## Login Flow & Username Display

- On successful login, the backend returns a user object (including the name) and a JWT token.
- The client saves the user info:
  ```js
  localStorage.setItem("user", JSON.stringify(res.data.data.user));
  ```
- The dashboard component reads the user info:
  ```js
  const user = JSON.parse(localStorage.getItem("user"));
  // ...
  <h2>Good morning, {user ? user.name : "User"} 👋</h2>;
  ```
- This ensures the correct name is always shown on the dashboard after login.

## Customization

- You can add more widgets, charts, or tables by fetching data from the backend API and updating the dashboard components.
- For advanced state management, consider using React Context or Redux.

## Development

- Built with React and Vite for fast development and HMR.
- Uses Formik and Yup for forms and validation.
- Modular component structure for easy extension.

## License

MIT
