
const applicationForm = document.getElementById("application-form");

applicationForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const theCandidateId = getCookie("userId");
    const theAdvertisementId = getCookie("advertisementId");

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    const requestAd = new Request('http://127.0.0.1:3000/api/v1/job_applications', {
        method: 'POST',
        headers: requestHeaders,
        credentials: 'include',
        body:JSON.stringify({ 
            message: applicationForm.message,
            candidateEmail: applicationForm.email,
            firstName: applicationForm.firstName,
            lastName: applicationForm.lastName,
            phone: applicationForm.phone,
            candidateId : theCandidateId,
            advertisementId :theAdvertisementId

        })
    });
    
    const adResponse = await fetch(requestAd);

    if (adResponse.ok) {
        console.log('Response ok');
        window.alert("Envoie de la candidature effectuée");
    }

    window.location.href = './index.html';


})