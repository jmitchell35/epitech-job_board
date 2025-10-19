
document.addEventListener("DOMContentLoaded", async (evt) => {
  const cardContainer = document.getElementById("card-container");
  const userId = getCookie("userId");

  const companyResponse = await fetch(`http://localhost:3000/api/v1/job_advertisements/recruiter/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const ads = await companyResponse.json();
  // checked

  ads.forEach(async (ad) => {
    console.log(ad.id);
    const applicationResponse = await fetch(`http://localhost:3000/api/v1/job_applications/offer/${ad.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const apps = await applicationResponse.json();
    // checked

    const card = document.createElement("article");
    card.classList.add(
      "bg-white",
      "p-6",
      "m-6",
      "rounded-2xl",
      "shadow-lg",
      "hover:shadow-xl",
      "transition",
      "duration-300",
      "flex",
      "flex-row",
      "justify-center",
      "items-center",
      "w-3/4",
    );


    card.innerHTML = `
      <div class = "flex flex-col w-2/3">
        <h3 class="text-xl font-bold mb-2 text-gray-800 ">${ad.title}</h3>
        <p class="text-gray-600 mb-4">${ad.shortDescription}</p>
        <ul id = "ul-${ad.id}" class="text-sm text-gray-500 space-y-1 hidden">
          <li><strong>Description :</strong> ${ad.fullDescription}</li>
          <li><strong>Ville :</strong> ${ad.city}</li>
          <li><strong>Salaire :</strong> ${ad.wages}</li>
          <li><strong>Type :</strong> ${ad.workingTime}</li>
          <li><strong>Remote :</strong> ${ad.remoteWork}</li>
        </ul>
        <div class = "flex flex-col w-2/3 hidden" id="app-container-${ad.id}">
        </div>
      </div>
      <div class = "flex flex-col w-1/3">
        <button id = "btn1-${ad.id}" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl  hover:bg-blue-700 transition ml-6">
        En savoir plus
        </button>
      </div>

      `;
    cardContainer.append(card);

    const appContainer = document.getElementById(`app-container-${ad.id}`);
    const ulElement = document.getElementById(`ul-${ad.id}`);
    const button = document.getElementById(`btn1-${ad.id}`);
    // checked

    apps.forEach((app) => {
      const appCard = document.createElement("article");
      appCard.classList.add(
        "bg-white",
        "p-6",
        "m-6",
        "rounded-2xl",
        "shadow-lg",
        "hover:shadow-xl",
        "transition",
        "duration-300",
        "flex",
        "flex-row",
        "justify-center",
        "items-center",
        "w-3/4",
      );

      appCard.innerHTML = `
      <div class = "flex flex-col">
        <ul class="text-sm text-gray-500 space-y-1">
          <li><strong>Candidate :</strong> ${app.firstName} ${app.lastName}</li>
          <li><strong>Email :</strong> ${app.candidateEmail}</li>
          <li><strong>Phone :</strong> ${app.phone}</li>
          <li><strong>Message :</strong> ${app.message}</li>
        </ul>
      </div>
      `;
      appContainer.append(appCard);
    });

    button.addEventListener('click', () => {
      ulElement.classList.toggle('hidden');
      appContainer.classList.toggle('hidden');

      if (ulElement.classList.contains('hidden')) {
        button.innerHTML = "En savoir plus";
      } else {
        button.innerHTML = "Voir moins";
      }
    });
  });
});