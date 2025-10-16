const applicationsForm = document.getElementById("apply-form");

applicationsForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const theAdvertisementId = urlParams.get('advertisementId');
    const theCandidateId = getCookie("userId");


    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    const requestApp = new Request('http://127.0.0.1:3000/api/v1/job_applications', {
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
        console.log(error)
    }


})
