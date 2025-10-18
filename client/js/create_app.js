document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM chargé");

    const applicationsForm = document.getElementById("apply-form");
    if (!applicationsForm) {
        console.error("Le formulaire #apply-form est introuvable !");
        return;
    }

    const userId = getCookie("userId");
    console.log("UserId récupéré depuis le cookie :", userId);

    try {
        const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            console.error("Erreur lors de la récupération du user:", response.status, response.statusText);
            window.alert("Veuillez vous connecter!");
            window.location.href = './login.html';
            return;
        }

        const user = await response.json();
        

        applicationsForm.candidateEmail.value = user.email;
        // Checked

        const candidateResponse = await fetch(`http://localhost:3000/api/v1/candidates/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!candidateResponse.ok) {
            console.error("Erreur lors de la récupération du candidat :", response.status, response.statusText);
            return;
        }

        const candidate = await candidateResponse.json();
            applicationsForm.firstName.value = candidate.firstName;
            applicationsForm.lastName.value = candidate.lastName;
            applicationsForm.phone.value = candidate.phone;
            applicationsForm.message.value = candidate.message;

    } catch (err) {
        console.error("Erreur fetch candidats :", err);
    }

    applicationsForm.addEventListener("submit", async (evt) => {
        evt.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const theAdvertisementId = urlParams.get('advertisementId');


        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");

        const requestApp = new Request('http://localhost:3000/api/v1/job_applications', {
            method: 'POST',
            headers: requestHeaders,
            credentials: 'include',
            body:JSON.stringify({ 
                message: applicationsForm.message.value,
                candidateEmail: applicationsForm.candidateEmail.value,
                firstName: applicationsForm.firstName.value,
                lastName: applicationsForm.lastName.value,
                phone: applicationsForm.phone.value,
                candidateId: theCandidateId,
                advertisementId: theAdvertisementId


            })
        });
        
        const appResponse = await fetch(requestApp);

        if (appResponse.ok) {
            console.log('Response ok');
            window.alert("Vous avez postulé avec succès!");
            window.location.href = './index.html';
        } else{
            console.log(error);
        }


    })
})