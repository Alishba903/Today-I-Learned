# Today I Learned

A simple and elegant full-stack learning journal built with Node.js and vanilla JavaScript. This project lets you capture what you learn each day, organize it by category, search and filter entries, and mark favorites.

## ✨ Features

- Add new learnings with topic, category, and description
- View all saved learnings in a clean card-based layout
- Search learnings by topic, category, or description
- Filter by category and sort by name, date, or favorites
- Mark entries as favorites
- Edit or delete existing learnings
- Persistent storage using a JSON file

## 🛠️ Tech Stack

- Node.js
- Vanilla JavaScript
- HTML/CSS
- JSON file-based storage

## 📁 Project Structure

- `server.js` — Starts the HTTP server and routes API requests
- `handlers/` — Request handlers for CRUD operations
- `utils/` — Helper functions for reading, writing, validating, and serving data
- `public/` — Frontend files for the web app
- `data/` — JSON data storage

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies (if any are added later)
3. Start the server:

```bash
npm start
```

4. Open your browser and visit:

```text
http://localhost:2000
```

## 📡 API Endpoints

The app uses a lightweight REST API:

- `GET /api` — Get all learnings
- `GET /api/:id` — Get a single learning by ID
- `POST /api` — Create a new learning
- `PUT /api/:id` — Update an existing learning
- `DELETE /api/:id` — Delete a learning
- `PATCH /api/favorite/:id` — Toggle favorite status

## 💡 Usage

- Visit the main page to view your learning entries
- Click the add button to create a new entry
- Use the search bar and filters to quickly find content
- Click the favorite icon to bookmark entries
- Use edit and delete actions directly from each card

## 📝 Notes

This project is a great example of building a small CRUD application with core web technologies and a custom Node.js server without frameworks.

## 👤 Author

Alishba
