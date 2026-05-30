const form = document.getElementById("eventform");
const formMessage = document.getElementsByClassName("form-message")[0];

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const topic = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("details").value;

  if (!topic || !category || !description) {
    formMessage.textContent = "Please Complete All Fields!";

    return;
  }

  const formData = {
    topic: topic,
    category: category,
    description: description,
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

console.log(form);
