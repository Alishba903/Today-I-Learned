const cardsContainer = document.getElementById("cards-container");

const learnings = [
  {
    id: 1,
    category: "JavaScript",
    date: "18 May 2026",
    topic: "Event Loop",
    description:
      "Learned how JavaScript handles asynchronous operations using the call stack, callback queue, and event loop.",
    favorite: true,
  },

  {
    id: 2,
    category: "CSS",
    date: "17 May 2026",
    topic: "Glassmorphism UI",
    description:
      "Practiced creating modern glassmorphism effects using backdrop-filter, transparency, and glow shadows.",
    favorite: false,
  },

  {
    id: 3,
    category: "Node.js",
    date: "16 May 2026",
    topic: "Creating HTTP Server",
    description:
      "Built a basic HTTP server using vanilla Node.js and learned how routing works without Express.",
    favorite: false,
  },

  {
    id: 4,
    category: "HTML",
    date: "15 May 2026",
    topic: "Semantic HTML",
    description:
      "Understood semantic tags like header, main, section, article, and footer for better structure and accessibility.",
    favorite: true,
  },

  {
    id: 5,
    category: "Git & GitHub",
    date: "14 May 2026",
    topic: "First GitHub Repository",
    description:
      "Learned how to initialize git, commit changes, and push projects to GitHub repositories.",
    favorite: false,
  },

  {
    id: 6,
    category: "Frontend",
    date: "13 May 2026",
    topic: "Responsive Layouts",
    description:
      "Practiced building responsive layouts using flexbox, CSS grid, and media queries.",
    favorite: true,
  },
];

let cards = learnings.map((learning)=>`
    <div class="card">
          <!-- Card Header -->
          <div class="card-header">
            <span class="category-name"> ${learning.category} </span>

            <div class="card-date">
              <span class="material-symbols-outlined"> calendar_today </span>

              <span class="date-text"> ${learning.date} </span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="learning-details">
            <h3 class="learning-topic">${learning.topic}</h3>

            <p class="learning-description">
              ${learning.description}
            </p>
          </div>

          <!-- Card Footer -->
          <div class="fav-del">
            <span class="add-fav"> ★ Favorite </span>

            <span class="delete"> Delete </span>
          </div>
        </div>`).join("");

cardsContainer.innerHTML = cards;