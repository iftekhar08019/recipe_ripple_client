
# 🍽️ Recipe Ripple

Live Site: [https://recipe-ripple.web.app/](https://recipe-ripple.web.app/)

**Recipe Ripple** is a fully responsive, user-centric Recipe Book App designed for food enthusiasts to manage, discover, and share their culinary creations. Built with React, Firebase, MongoDB, and Express, it allows users to interact with a growing collection of recipes in a modern and seamless UI.

---

## 🚀 Features

- 🔐 **Authentication System** with Email/Password & Google Login using Firebase.
- 🍳 **Add, Update & Delete Recipes** – Users can manage their own recipes with form modals and real-time database updates.
- ❤️ **Top Recipes Section** – Dynamically shows the top 6 most-liked recipes from the database using MongoDB queries.
- 🔎 **Recipe Filtering** – Easily filter recipes by Cuisine Type from the All Recipes page.
- 🌓 **Dark/Light Theme Toggle** – User-controlled design mode for enhanced user experience.
- 🎨 **Modern Animations** – Enhanced with Lottie, React Simple Typewriter, React Awesome Reveal, and React Tooltip.
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop viewports.
- 🧾 **Private Routes** – Ensures protected content access with React Router and Auth-based logic.

---

## 📁 Pages Overview

### Home Page
- Welcome slider/banner
- Top 6 Recipes by like count
- CTA: See All Recipes
- Static info sections

### Authentication
- **Login Page**: Email/password login, Google login, password validation
- **Register Page**: Name, Email, PhotoURL, Password with validation

### All Recipes
- Grid layout (4-column) of all community-submitted recipes
- Cuisine Type Filter
- Recipe Detail navigation

### Recipe Details (Private Route)
- Full recipe info with “Like” functionality
- Like counter and restriction for user’s own recipes

### Add Recipe (Private Route)
- Form to add new recipes with categories, ingredients, etc.

### My Recipes (Private Route)
- View/Edit/Delete your submitted recipes
- Update via Modal form

### 404 Page
- Custom food-themed 404 screen (No Navbar/Footer)

---

## ⚙️ Tech Stack

| Tech         | Usage                                  |
|--------------|-----------------------------------------|
| React        | Frontend Framework                      |
| Firebase     | Auth & Hosting                          |
| Node.js      | Server Runtime                          |
| Express.js   | Backend Framework                       |
| MongoDB      | Database (CRUD & Aggregation)           |
| Tailwind CSS | Styling Framework                       |
| Vercel       | Server-Side Hosting                     |
| Lottie + Typewriter | Animation & Transitions        |

---

## 🔐 Environment Variables

Environment variables have been securely used to hide sensitive Firebase and MongoDB configuration data.

- `.env` contains:
  ```
  VITE_API_BASE_URL=your_api_url
  VITE_FIREBASE_API_KEY=your_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
  ```

---

## 📜 GitHub Activity

### Client Side:
✅ More than **15 meaningful commits** covering:
- UI components
- Routing
- Authentication
- Dark mode toggle
- Animations

### Server Side:
✅ More than **8 meaningful commits** including:
- CRUD API for Recipes
- MongoDB schema operations
- Protected endpoints

---

## 🛠️ Setup & Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/recipe-ripple.git
cd recipe-ripple

# Install dependencies
npm install

# Start the development server
npm run dev
```

To run the backend server:
```bash
cd server
npm install
npm run start
```

Make sure to create a `.env` file with necessary variables in both the client and server directories.

---

## 📞 Contact

📧 Email: yourname@example.com  
🔗 LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)  
🌐 Website: [https://recipe-ripple.web.app/](https://recipe-ripple.web.app/)

---

## 📄 License

This project is licensed under the MIT License.  
Feel free to use, modify, and share!
