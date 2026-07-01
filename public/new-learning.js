const form = document.getElementById("eventform");
const formMessage = document.querySelector(".form-message");
const topicInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("details");
const submitBtn = document.getElementById("submit-btn");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
submitBtn.textContent = id ? "Update Learning" : "Add Learning";

if (id) {
  const response = await fetch(`/api/${id}`);

  if (!response.ok) {
    formMessage.textContent = "Learning not found.";
    throw new Error("Learning not found");
  }

  const data = await response.json();

  topicInput.value = data.topic;
  categoryInput.value = data.category;
  descriptionInput.value = data.description;
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const topic = topicInput.value.trim();
  const category = categoryInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!topic || !category || !description) {
    formMessage.textContent = "Please Complete All Fields!";
    return;
  }

  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formData = {
    topic,
    category,
    description,
    date,
  };

  const url = id ? `/api/${id}` : "/api";
  const method = id ? "PUT" : "POST";

  try {
    formMessage.textContent = "";
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Request Failed!");
    }

    formMessage.innerHTML = id
      ? `Learning updated successfully. View it <a href="./index.html">here</a>.`
      : `Your learning was uploaded. View it <a href="./index.html">here</a>.`;

    form.reset();
  } catch (err) {
    formMessage.textContent = "Oops! Something went wrong. Please try again.";
    console.error(err);
  }
});
