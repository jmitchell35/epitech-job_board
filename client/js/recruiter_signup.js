
const recruiterForm = document.getElementById("recruiter-form");

recruiterForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    const requestUser = new Request('http://127.0.0.1:3000/api/v1/users', {
        method: 'POST',
        headers: requestHeaders,
        credentials: 'include',
        body:JSON.stringify({ 
            email: recruiterForm.email.value,
            password: recruiterForm.password.value,
            profile: "USER"
        })
    });

    const userResponse = await fetch(requestUser);

    if (userResponse.ok) {
        console.log('Response ok');
    }
    

    const userData = await userResponse.json();
    const userId = userData.id; 

    const requestRecruiter = new Request('http://127.0.0.1:3000/api/v1/recruiters', {
        method: 'POST',
        headers: requestHeaders,
        body:JSON.stringify({ 
            application_email: recruiterForm.application_email.value,
            company:recruiterForm.company.value,
            user: { connect: { id: userId } }
        })
    });

    const recruiterResponse = await fetch(requestRecruiter);

    if (recruiterResponse.ok) {
        console.log('Response ok');
        window.location.href = './index.html';
    }
});