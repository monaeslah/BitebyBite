import React from 'react'

const AboutProject = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>About the Project</h1>
      <p>
        This project is a <strong>Meal Planner App</strong> designed to make
        planning, creating, and discovering meals easy and enjoyable. Here’s
        what you can do with it:
      </p>
      <ul>
        <li>
          <strong>Add Recipes:</strong> Write your recipes step by step, and if
          the steps are out of order, you can simply rearrange them with a
          drag-and-drop feature.
        </li>
        <li>
          <strong>Upload Photos:</strong> Showcase your dishes by uploading
          images directly into the app.
        </li>
        <li>
          <strong>Track Calories:</strong> Enter and manage calorie information
          for your meals.
        </li>
        <li>
          <strong>Discover New Recipes:</strong> Explore recipes shared by
          others and get inspired by the community.
        </li>
        <li>
          <strong>Random Meal Suggestions:</strong> If you’re unsure what to
          cook, the app can suggest a random meal for you.
        </li>
        <li>
          <strong>Filter Recipes:</strong> Search and filter meals by categories
          or their country of origin.
        </li>
        <li>
          <strong>Save Your Favorites:</strong> Bookmark your favorite recipes
          for easy access.
        </li>
        <li>
          <strong>Weekly Planner:</strong> Create a personalized meal plan for
          the week.
        </li>
        <li>
          <strong>Cooking Timer:</strong> Use a built-in timer to help you
          during the cooking process.
        </li>
        <li>
          <strong>Search Functionality:</strong> Easily find meals using a
          robust search feature.
        </li>
      </ul>
      <p>
        The app draws inspiration from the animated movie <em>Ratatouille</em>{' '}
        and its message: <strong>“Anyone can cook.”</strong> Whether you're an
        experienced chef or a complete beginner, this app is here to make meal
        planning simple and fun.
      </p>

      <h2>A Note on Security</h2>
      <p>
        Currently, the app doesn’t implement advanced security features, but I’m
        always open to feedback and ideas to improve it.
      </p>

      <h2>My Inspiration</h2>
      <p>
        I’m constantly inspired by creative projects like the{' '}
        <strong>Dream Catcher app</strong>, which I highly recommend checking
        out! If you’d like to explore more of my work or stay in touch, feel
        free to connect with me:
      </p>
      <ul>
        <li>
          <strong>LinkedIn:</strong>{' '}
          <a
            href='https://www.linkedin.com/in/monaeslah'
            target='_blank'
            rel='noopener noreferrer'
          >
            My LinkedIn Profile
          </a>
        </li>
        <li>
          <strong>GitHub:</strong>{' '}
          <a
            href='https://github.com/monaeslah'
            target='_blank'
            rel='noopener noreferrer'
          >
            My GitHub Profile
          </a>
        </li>
      </ul>
      <p>Let’s create something amazing together! 🌟</p>
    </div>
  )
}

export default AboutProject
