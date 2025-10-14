document.addEventListener("DOMContentLoaded", async () => {
  const cardContainer = document.getElementById("card-container");

  const response = await fetch("http://127.0.0.1:3000/api/v1/job_advertisements", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const ads = await response.json();

  ads.forEach((ad) => {
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
        <h3 class="text-xl font-bold mb-2 text-gray-800">${ad.title}</h3>
        <p class="text-gray-600 mb-4">${ad.shortDescription}</p>
        <ul class="text-sm text-gray-500 space-y-1">
          <li><strong>Ville :</strong> ${ad.city}</li>
          <li><strong>Salaire :</strong> ${ad.wages}</li>
          <li><strong>Type :</strong> ${ad.workingTime}</li>
          <li><strong>Remote :</strong> ${ad.remoteWork}</li>
        </ul>
      </div>
      <button class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
        Voir plus
      </button>
    `;

    cardContainer.append(card);
  });
});
