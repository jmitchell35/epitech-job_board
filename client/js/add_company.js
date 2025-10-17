window.addEventListener("DOMContentLoaded", () => {
  const API_COMPANIES = "http://localhost:3000/api/v1/companies";

  const companySelect = document.getElementById("company-select");
  const companyForm = document.getElementById("company-form");
  const toggleCompanyBtn = document.getElementById("toggle-company-form");
  const cancelCompanyBtn = document.getElementById("cancel-company");

  // --- CHARGEMENT DES ENTREPRISES EXISTANTES
  async function loadCompanies() {
    try {
      const res = await fetch(API_COMPANIES);
      if (!res.ok) throw new Error("Impossible de charger les entreprises.");

      const companies = await res.json();
      
      companies.sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })); // Mettre dans l'odre alphabétique les noms des entreprises

      companySelect.innerHTML = `<option value="">Sélectionnez votre entreprise</option>`;

      companies.forEach((c) => {
        const option = document.createElement("option");
        option.value = c.id;
        option.innerHTML = c.name;
        companySelect.appendChild(option);
      });
    } catch (err) {
      console.error("Erreur lors du chargement des entreprises :", err);
    }
  }

  loadCompanies();

  // AFFICHAGE / MASQUAGE DU FORMULAIRE ENTREPRISE
  toggleCompanyBtn?.addEventListener("click", () => {
    companyForm.classList.toggle("hidden");
  });

  cancelCompanyBtn?.addEventListener("click", () => {
    companyForm.classList.add("hidden");
  });

  // CRÉATION D’UNE NOUVELLE ENTREPRISE
  companyForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const data = Object.fromEntries(new FormData(companyForm).entries());
    
    if (data.name) {
      data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase(); // Mettre le nom de la company en minuscule et la première lettre en majuscule
    }

    try {
      const res = await fetch(API_COMPANIES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());
      const newCompany = await res.json();

      alert("Entreprise créée avec succès !");
      companyForm.reset();
      companyForm.classList.add("hidden");

      // Ajouter la nouvelle entreprise dans le select
      loadCompanies();
    } catch (err) {
      console.error("Erreur création entreprise :", err);
      alert("Erreur lors de la création de l'entreprise.");
    }
  });
});
