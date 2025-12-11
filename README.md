**PokeShare ⚡🔴**

PokeShare is a full-stack Next.js application that allows users to browse, search, and "like" their favorite Pokémon. It integrates the PokeAPI for Pokémon data and uses MongoDB to handle user authentication and persist "like" counts globally across the platform.

🚀 Key Features

Pokémon Browser: Browse a paginated list of Pokémon with data fetched server-side.

Search Functionality: Instantly search for specific Pokémon by name.

Detailed Stats: View weight, height, and abilities in a modal view.

Authentication System: Custom Sign Up and Log In functionality using MongoDB.

Social Liking: Users can "like" Pokémon. The total like count is displayed globally (All-time likes).

Favorites List: Authenticated users can view their personally selected favorite Pokémon.

Responsive Design: Fully responsive UI built with SCSS modules and Framer Motion animations.

🛠️ Tech Stack

Frontend:

Next.js (React Framework)

Redux (State Management with Thunk)

Sass/SCSS (Styling)

Framer Motion (Animations)

SimpleBar (Custom scrollbars)

Backend:

Next.js API Routes (Serverless functions)

MongoDB (Database for Users and Likes)

Mongoose (ODM)

External API:

PokeAPI v2

⚙️ Prerequisites

Before running the project, ensure you have the following installed:

Node.js (v14 or higher)

MongoDB (Local instance or Atlas Cluster)

📦 Installation

Clone the repository:

```bash
git clone https://github.com/Brkic365/PokeShare.git
cd PokeShare
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Environment Setup:
Create a .env.local file in the root directory and add your MongoDB connection string:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

📂 Project Structure
```bash
├── Components/       # Reusable UI components (Grid, Pokemon Card, Modals)
├── lib/              # Database connection utility (MongoDB)
├── pages/
│   ├── api/          # Backend API routes
│   │   ├── auth/     # Login and Signup endpoints
│   │   └── pokemon/  # Like/Dislike and counter endpoints
│   ├── all.js        # Paginated list of all Pokemon
│   ├── favourite.js  # User's favorite Pokemon page
│   ├── index.js      # Landing page
│   └── search.js     # Search results page
├── redux/            # Redux setup
│   ├── actions/      # Async actions (Auth, Error handling)
│   ├── reducers/     # State reducers
│   └── store.js      # Store configuration
└── styles/           # Global CSS and SCSS Modules
```
🔌 API Routes Reference

The application uses Next.js API routes to handle backend logic:

Auth

POST /api/auth/signup: Registers a new user.

POST /api/auth/login: Authenticates a user.

Pokémon

POST /api/pokemon/like: Adds a like to a Pokémon and updates the user's profile.

POST /api/pokemon/dislike: Removes a like.

POST /api/pokemon/getlikes: Retrieves the global like count for a specific Pokémon.

🤝 Contributing

Contributions are welcome!

Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📄 License

Distributed under the MIT License. See LICENSE for more information.
