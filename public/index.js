const cardsContainer = document.getElementById("cards-container");
const search = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const resultsCount = document.querySelector(".results-count");
const sort = document.getElementById("sort");

let allLearnings = [];

try {
  cardsContainer.innerHTML = `<p class="loading-msg">Loading learnings...</p>`;
  const response = await fetch("/api");

  if (!response.ok) {
    throw new Error("Failed to load learnings");
  }

  allLearnings = await response.json();
  renderLearnings(allLearnings);
} catch (err) {
  cardsContainer.innerHTML = `<h3 class="not-found">Failed to load learnings.</h3>`;
  console.log(err);
}

function renderLearnings(learnings) {
  const cards = learnings
    .map(
      (learning) => `
    <div class="card" data-id="${learning.id}">
    <!-- Card Header -->
    <div class="card-header">
    <span class="category-name"> ${learning.category} </span>
    
    <div class="card-date">
    <i class="fa-regular fa-calendar"></i>
    
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
            <span class="favorite"> ${learning.favorite ? "★" : "☆"} </span>
            <span class="edit"> <i class="fa-regular fa-pen-to-square edit"></i> </span>

            <span class="delete"> <i class="fa-solid fa-trash delete"></i> </span>
          </div>
        </div>`,
    )
    .join("");

  cardsContainer.innerHTML = cards;
}

cardsContainer.addEventListener("click", async (event) => {
  const card = event.target.closest(".card");
  if (!card) return;
  const id = card.dataset.id;

  if (event.target.classList.contains("delete")) {
    const confirmed = confirm("Are you sure you want to delete this learning?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/${id}`, { method: "DELETE" });
      if (response.ok) {
        card.remove();
      } else {
        console.error("Server error:", response.status);
      }
    } catch (error) {
      console.error("Network error or server is down:", error);
    }
  } else if (event.target.classList.contains("favorite")) {
    try {
      const response = await fetch(`/api/favorite/${id}`, { method: "PATCH" });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      const favoriteElement = event.target;

      favoriteElement.textContent = data.favorite ? "★" : "☆";
    } catch (err) {
      console.error("Failed to update favorite:", err);
    }
  } else if (event.target.classList.contains("edit")) {
    window.location.href = `new-learning.html?id=${id}`;
  }
});

search.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sort.addEventListener("change", applyFilters);

function applyFilters() {
  const searchTerm = search.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value.toLowerCase().trim();
  const sortOption = sort.value;

  let filteredLearnings = [...allLearnings];

  filteredLearnings = filteredLearnings.filter((learning) => {
    return (
      learning.topic.toLowerCase().includes(searchTerm) ||
      learning.category.toLowerCase().includes(searchTerm) ||
      learning.description.toLowerCase().includes(searchTerm)
    );
  });

  if (selectedCategory !== "all") {
    filteredLearnings = filteredLearnings.filter((learning) => {
      return learning.category.toLowerCase() === selectedCategory;
    });
  }

  switch (sortOption) {
    case "az":
      filteredLearnings.sort((a, b) => a.topic.localeCompare(b.topic));
      break;
    case "za":
      filteredLearnings.sort((a, b) => b.topic.localeCompare(a.topic));
      break;
    case "newest":
      filteredLearnings.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "oldest":
      filteredLearnings.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "favorites":
      filteredLearnings.sort((a, b) => Number(b.favorite) - Number(a.favorite));
      break;
  }

  resultsCount.textContent = `Showing ${filteredLearnings.length} of ${allLearnings.length} learnings`;

  if (filteredLearnings.length === 0) {
    cardsContainer.innerHTML = `<h3 class="not-found">Learnings Not Found.</h3>`;
    return;
  }

  renderLearnings(filteredLearnings);
}
