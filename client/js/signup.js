
const candidateForm = document.getElementById("candidate-form");


candidateForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");


    const requestUser = new Request('http://127.0.0.1:3000/api/v1/users', {
        method: 'POST',
        headers: requestHeaders,
        body:`{ 
            "email" = "${candidateForm.email.value}",
            "password" = "${candidateForm.password.value}"
        }`
    });

    fetch(requestUser)
    .then((response) => {
        console.log(response);
    })
    /*.then((data) => {
        setAlert(typeAlertDiv, data.typeOK, data.typeValidation);
        setAlert(brandAlertDiv, data.brandOK, data.brandValidation);
    })*/
    .catch(console.error);


    
    const requestCandidate = new Request('http://127.0.0.1:3000/api/v1/candidates', {
        method: 'POST',
        headers: requestHeaders,
        body:`{ 
            "phone" = "${candidateForm.phone.value}",
            "message" = "${candidateForm.message.value}",
            "firstName" = "${candidateForm.first_name.value}",
            "lastName" = "${candidateForm.last_name.value}"
            }`
    });

    fetch(requestCandidate)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        setAlert(typeAlertDiv, data.typeOK, data.typeValidation);
        setAlert(brandAlertDiv, data.brandOK, data.brandValidation);
    })
    .catch(console.error);


    
})