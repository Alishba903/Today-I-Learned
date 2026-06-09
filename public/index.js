const cardsContainer = document.getElementById("cards-container");

try {
  const data = await fetch("/api");
  const response = await data.json();
  renderLearnings(response);
} catch (err) {
  console.log(err);
}

function renderLearnings(learnings) {
  let cards = learnings
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

            <span class="delete"> Delete </span>
          </div>
        </div>`,
    )
    .join("");

  cardsContainer.innerHTML = cards;
}

cardsContainer.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete")) {
    const card = event.target.closest(".card");
    const id = card.dataset.id;

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
    const card = event.target.closest(".card");
    const id = card.dataset.id;

    try {
      const response = await fetch(`/api/favorite/${id}`, { method: "PATCH" });

      const data = await response.json();
      const favoriteElement = event.target;

      favoriteElement.textContent = data.favorite ? "★" : "☆";
    } catch (err) {
      console.log("Error while getting response", err);
    }
  }
});
