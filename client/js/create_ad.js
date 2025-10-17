
const advertisementForm = document.getElementById("create-offer-form");

advertisementForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const theCompanyId = getCookie("companyId");
    const theRecruiterId = getCookie("userId");

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    const requestAd = new Request('http://localhost:3000/api/v1/job_advertisements', {
        method: 'POST',
        headers: requestHeaders,
        credentials: 'include',
        body:JSON.stringify({ 
            title: advertisementForm.title.value,
            shortDescription: advertisementForm.shortDescription.value,
            fullDescription: advertisementForm.fullDescription.value,
            wages: advertisementForm.wages.value,
            city: advertisementForm.city.value,
            workingTime: advertisementForm.workingTime.value,
            remoteWork: advertisementForm.remoteWork.value,
            companyId: theCompanyId,
            recruiterId: theRecruiterId

        })
    });
    
    const adResponse = await fetch(requestAd);

    if (adResponse.ok) {
        console.log('Response ok');
        window.alert("Annonce crée avec succès");
    }

    //window.location.href = './recruiter_dashboard.html';


})