document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM chargé");

    const informationForm = document.getElementById("info-form");
    if (!informationForm) {
        console.error("Le formulaire #info-form est introuvable !");
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

        const usersEmail = await response.json();
        

        informationForm.userEmail.value = usersEmail.email;
        informationForm.password.value = usersEmail.password;
        // Checked

        const userResponse = await fetch(`http://localhost:3000/api/v1/candidates/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!userResponse.ok) {
            console.error("Erreur lors de la récupération du candidat :", userResponse.status, userResponse.statusText);
            return;
        }

        const user = await userResponse.json();
            informationForm.firstName.value = user.firstName;
            informationForm.lastName.value = user.lastName;
            informationForm.phone.value = user.phone;
            informationForm.message.value = user.message;

    } catch (err) {
        console.error("Erreur fetch candidats :", err);
    }

    informationForm.addEventListener("submit", async (evt) => {
        evt.preventDefault();

        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");

        const requestModif = new Request(`http://localhost:3000/api/v1/users/${userId}`, {
            method: 'PUT',
            headers: requestHeaders,
            credentials: 'include',
            body:JSON.stringify({ 
                email: informationForm.userEmail.value,
                password: informationForm.password.value,
            })
        });
        
        const modifEmailPassword = await fetch(requestModif);

        if (modifEmailPassword.ok) {
            console.log('modifEmailPassword ok');
        } else{
            console.log(err);
        }

        const requestModif2 = new Request(`http://localhost:3000/api/v1/candidates/user/${userId}`, {
            method: 'PUT',
            headers: requestHeaders,
            credentials: 'include',
            body:JSON.stringify({ 
                firstName: informationForm.firstName.value,
                lastName: informationForm.lastName.value,
                phone: informationForm.phone.value,
                message: informationForm.message.value,

            })
        });

        const modifCandidate = await fetch(requestModif2);

        if (modifCandidate.ok) {
            console.log('modifCandidate ok');
            window.alert("Vous avez modifié votre profil!");
            window.location.href = './index.html';
        } else{
            console.log(err);
        }


    })
})