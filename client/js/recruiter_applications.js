// /js/recruiter_applications.js
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("applications-container");

  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  }

  const recruiterId = getCookie("userId"); // ID du recruteur connecté
  if (!recruiterId) {
    container.innerHTML = `<p class="text-center text-red-600">Erreur : recruteur non identifié.</p>`;
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:3000/api/v1/applications", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) throw new Error("Impossible de charger les candidatures.");
    const applications = await res.json();

    // On garde uniquement les candidatures liées aux offres du recruteur connecté
    const filtered = applications.filter(
      (app) => app.jobAdvertisement.recruiterId === recruiterId
    );

    if (filtered.length === 0) {
      container.innerHTML = `<p class="text-center text-gray-500">Aucune candidature reçue pour le moment.</p>`;
      return;
    }

    filtered.forEach((app) => {
      const card = document.createElement("article");
      card.className =
        "bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 mb-4";

      card.innerHTML = `
        <h3 class="text-lg font-bold text-indigo-700 mb-1">
          ${app.firstName} ${app.lastName}
        </h3>
        <p class="text-sm text-gray-600 mb-2"><strong>Email :</strong> ${app.candidateEmail}</p>
        <p class="text-sm text-gray-600 mb-2"><strong>Téléphone :</strong> ${app.phone}</p>
        <p class="text-sm text-gray-600 mb-2"><strong>Offre :</strong> ${app.jobAdvertisement.title}</p>
        <p class="text-gray-700 mt-3 border-t pt-3"><strong>Message :</strong><br>${app.message}</p>
        <p class="text-xs text-gray-400 mt-2">Candidature envoyée le ${new Date(app.createdAt).toLocaleDateString()}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="text-center text-red-600">Erreur lors du chargement des candidatures.</p>`;
  }
});
