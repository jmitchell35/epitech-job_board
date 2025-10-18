
document.addEventListener("DOMContentLoaded", async (evt) => {
  const cardContainer = document.getElementById("card-container");

  const response = await fetch("http://localhost:3000/api/v1/job_advertisements", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });



  const ads = await response.json();
  console.log("ADS JSON:", ads); 

  ads.forEach((ad) => {
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
      "justify-between",
      "min-w-[75%]"
    );
    

    card.innerHTML = `
      <div>
        <h3 class="flex flex-col text-xl font-bold mb-2 text-gray-800 ">${ad.title}</h3>
        <p class="text-gray-600 mb-4">${ad.shortDescription}</p>
        <ul id = "ul-${ad.advertisement_id}" class="text-sm text-gray-500 space-y-1 hidden">
          <li><strong>Description :</strong> ${ad.fullDescription}</li>
          <li><strong>Ville :</strong> ${ad.city}</li>
          <li><strong>Salaire :</strong> ${ad.wages}</li>
          <li><strong>Type :</strong> ${ad.workingTime}</li>
          <li><strong>Remote :</strong> ${ad.remoteWork}</li>
        </ul>
      </div>
      <div class = "flex flex-col">
        <button id = "btn1-${ad.advertisement_id}" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl  hover:bg-blue-700 transition ml-6">
        En savoir plus
        </button>
      </div>

      `;
    cardContainer.append(card);


    const btn1 = card.querySelector(`#btn1-${ad.advertisement_id}`);
    const ul = card.querySelector(`#ul-${ad.advertisement_id}`);

      btn1.addEventListener('click', () => {
        ul.classList.toggle('hidden');
        if (ul.classList.contains('hidden')){
          btn1.innerHTML= "En savoir plus";
        } else {
          btn1.innerHTML= "Voir moins";
        }
      });

  });
});
