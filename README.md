# Smart Meal Planner

![Project Screenshot](/src/assets/images/readme.png)

## Description

**Smart Meal Planner** is a React-based application designed to simplify meal planning and make cooking more enjoyable. Whether you're looking to organize your weekly meals, explore new recipes, or get inspiration when you're unsure what to cook, this app has you covered. Built with React and Vite, it emphasizes clean design, reusable components, and user-friendly functionality.

## Features

- **Meal Entry:** Add meals with details such as cooking time, calories, step-by-step instructions, special notes, and images.
- **Categorization:** Organize meals by type (breakfast, lunch, dinner, drinks) for easy browsing.
- **Random Meal Suggestion:** Get inspired with random meal ideas when you don’t know what to cook.
- **Drag-and-Drop Sorting:** Effortlessly rearrange cooking steps with a simple drag-and-drop feature.
- **Explore Recipes:** Discover recipes added by other users and filter them by category or country of origin.
- **Weekly Planner:** Plan your meals for the week with a built-in planner.
- **Cooking Timer:** Stay on track with an integrated cooking timer.
- **Favorites:** Save your favorite meals for quick access.
- **Search Functionality:** Easily find meals by name or category.
- **Reusable Components:** Designed with reusable UI components for efficient development.
- **Data Management:** API integration for accurate and real-time data handling.

## Demo

Check out the live demo here: **[Smart Meal Planner Demo](https://your-demo-link.com)**

## Lessons Learned

- Prioritized **functionality** with a clean and simple UI over unnecessary complexity.
- Developed **reusable components** to speed up the development process and ensure code consistency.
- Implemented a **basic Firebase setup** as a foundation for future scalability.

## Setup and Installation

To run the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/monaeslah/BitebyBite.git
   cd BitebyBite
   ```

````

2. **Install dependencies**:

  ```bash
  npm install
````

3. **Configure environment variables** (see [Environment Variables](#environment-variables)).

4. **Run the application**:

   ```bash
   npm run dev
   ```

   This will start the development server. You can access the app at `http://localhost:5173`.

## Project Structure

````plaintext
src/
├── assets/         # Static assets (images, icons, etc.)
├── components/     # Reusable UI components (Forms, MealCards, etc.)
├── context/        # Global state management (e.g., favorite meals)
├── pages/          # Page-level components (Home, Planner, RecipeDetail, etc.)
├── services/       # API integration and handlers
├── styles/         # CSS Module stylesheets
└── utils/          # Utility functions (e.g., timer helpers, search filters)
## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
VITE_API_URL=<Backend API Base URL>
VITE_CLOUDINARY_NAME=<Cloudinary Upload URL>
VITE_UNSIGNED_UPLOAD_PRESET=<Your Cloudinary Upload Preset>
````

## Demo

backend repository can be found [here](https://bitebybite.netlify.app/)
