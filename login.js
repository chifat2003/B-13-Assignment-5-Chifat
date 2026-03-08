// console.log("Login script initialized.");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const signIn = document.querySelector("#sign-in");

function onGoing() {
    window.location.href = '/main.html'
}

signIn.addEventListener("click", (e) => {
    e.preventDefault();
    const user = username.value;
    const pass = password.value;
    if (user === "admin" && pass === "admin123") {
        onGoing();
    } else {
        alert("Invalid username or password.");
    }
});
