
document.addEventListener("DOMContentLoaded", async (evt) => {
  const cardContainer = document.getElementById("card-container");

  const response = await fetch("http://localhost:3000/api/v1/job_applications", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });



  const apps = await response.json();
  console.log("ADS JSON:", apps); 

  apps.forEach((app) => {
    const card = document.createElement("article");
    card.classList.add(
      "bg-white",
      "p-6",
      "rounded-2xl",
      "shadow-lg",
      "hover:shadow-xl",
      "transition",
      "duration-300",
      "flex",
      "flex-col",
      "justify-between"
    );
    

    card.innerHTML = `
      <div>
        <h3 class="text-xl font-bold mb-2 text-gray-800">${app.firstName} ${app.lastName}</h3>
        <p class="text-gray-600 mb-4">${app.message}</p>
        <ul class="text-sm text-gray-500 space-y-1">
          <li><strong>Description :</strong> ${app.phone}</li>
          <li><strong>Ville :</strong> ${app.candidateEmail}</li>
        </ul>
      </div>
    `;
    cardContainer.append(card);
  });
});
