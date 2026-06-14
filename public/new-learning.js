const form = document.getElementById("eventform");
const formMessage = document.querySelector(".form-message");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const topic = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value.trim();
  const description = document.getElementById("details").value.trim();

  if (!topic || !category || !description) {
    formMessage.textContent = "Please Complete All Fields!";
    return;
  }

  const date = new Date().toLocaleDateString(
    "en-GB", 
    {
      day: "numeric", 
      month: "short", 
      year: "numeric"
    }
  );

  const formData = {
    topic,
    category,
    description,
    date
  };

  try {
    formMessage.textContent = "";
    const response = await fetch("./api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      formMessage.innerHTML = `Your Learning was uploaded. View it <a href="./index.html">here</a>.`;
      form.reset();
    } else {
      formMessage.textContent = `The server Ghosted you(!). Please try again.`;
      console.error("Server Error:", response.statusText);
    }
  } catch (err) {
    formMessage.textContent = `Oops! My wires got crossed. Could you try uploading again?`;
    console.error("Error:", err);
  }
});