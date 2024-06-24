This is a Next.js project bootstrapped with `create-next-app` for a practical task for Interview process metamask technologies.

## Getting Started

To run the development server, use one of the following commands:

```bash
npm run dev
yarn dev
pnpm dev
bun dev
```

### Based on the task details provided, here is an outline of the features to be implemented:

1. **Registration Page and API**:
   - User inputs: Email, Password, Phone Number, Profile Image, Full Name, DOB.
   - API endpoint for user registration.

2. **Login Page and API**:
   - User login using Email & Password with validation.
   - Handling incorrect email or password scenarios.
   - Display 2 left side menus after successful login: Other User List and My Profile.

3. **Other User List Page**:
   - Display other user list in table format.
   - Implement pagination and filters like search by name with API call.

4. **My Profile Page**:
   - Show logged-in user profile details.
   - Allow users to edit and update their profile details.
   - Provide an option to permanently remove the account.
  
5. **Connect wallet metamask**:
   - connect to metamask wallet (rainbow-ki)
   - show coins in wallet

5. **Technologies Stack**:
   - Next.js ,tailwind css , redux-toolkit , frammer-motion etc..


## Project Structure

### Components
The components in this project are located in the `components` directory. Each component is responsible for a specific UI element or functionality.

### Pages
The pages of the application are located in the `pages` directory. Each page corresponds to a specific route in the application.

### Hooks
Custom hooks used in the project are located in the `hooks` directory. These hooks provide reusable logic across components.

### Utils
Utility functions, such as date formatting, are located in the `utils` directory.

### API
API routes are defined in the `pages/api` directory. These routes handle authentication and other server-side logic.

## NPM Scripts

### `dev`
Starts the development server.

### `build`
Builds the production application.

### `start`
Starts the production server.

### `lint`
Runs ESLint to check for code quality issues.

### `test`
Runs the test suite for the application.

### `storybook`
Starts the Storybook server for component development.

### `analyze`
Analyzes the bundle size of the application.

### `deploy`
Deploys the application to a hosting service.
