const cardsContainer = document.getElementById("cards-container");

async function getLearnings() {
  try {
    const data = await fetch("/api");
    const response = await data.json();
    renderLearnings(response);
  } catch (err) {
    console.log(err);
  }
}

function renderLearnings(learnings) {
  let cards = learnings
    .map(
      (learning) => `
    <div class="card">
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
            <span class="add-fav"> ★ Favorite </span>

            <span class="delete"> Delete </span>
          </div>
        </div>`,
    )
    .join("");

  cardsContainer.innerHTML = cards;
}

getLearnings();
