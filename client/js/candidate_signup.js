
const candidateForm = document.getElementById("candidate-form");

candidateForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    const requestUser = new Request('http://127.0.0.1:3000/api/v1/users', {
        method: 'POST',
        headers: requestHeaders,
        credentials: 'include',
        body:JSON.stringify({ 
            email: candidateForm.email.value,
            password: candidateForm.password.value,
            profile: "USER"
        })
    });

    const userResponse = await fetch(requestUser);

    if (userResponse.ok) {
        console.log('Response ok');
    }
    

    const userData = await userResponse.json();
    const userId = userData.id; 

    const requestCandidate = new Request('http://127.0.0.1:3000/api/v1/candidates', {
        method: 'POST',
        headers: requestHeaders,
        body:JSON.stringify({ 
            phone: candidateForm.phone.value,
            message: candidateForm.message.value,
            firstName: candidateForm.first_name.value,
            lastName: candidateForm.last_name.value,
            user: { connect: { id: userId } }
        })
    });

    const candidateResponse = await fetch(requestCandidate);

    if (candidateResponse.ok) {
        console.log('Response ok');
        window.location.href = './index.html';
    }
});