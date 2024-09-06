//Client-Side Code (login.js):
document.addEventListener("DOMContentLoaded", function () {
  const loginForms = document.querySelectorAll("#login-form");

  // Event listeners for login forms
  loginForms.forEach(function (form) {
    const loginBtn = form.querySelector("#login-btn");

    //login btn
    loginBtn.addEventListener("click", function (event) {
      event.preventDefault();
      const currentPage =
        "file:///C:/Users/Admin%20pc/Desktop/Form%20node/public/html/login.html"
          .split("/")
          .pop();
      if (currentPage === "signup.html") {
        window.location.href = "login.html";
      } else if (currentPage === "login.html") {
        loginSubmission(event);
      }
    });
  });
});

function loginSubmission(event) {
  event.preventDefault();
  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document.querySelector("input[name=psw]").value;

  const loginData = {
    email: email,
    password: password,
  };

  fetchLoginData(loginData);
}

function fetchLoginData(loginData) {
  fetch("http://localhost:3000/form/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (response.status === 401) {
        window.alert("User not found");
      } else if (!response.ok) {
        console.log("server side error");
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        // Log the token in the browser console
        console.log("Token:", data.token);

        window.alert("Login successful");
        // Navigate to another page upon successful login
        window.location.href = "form.html";
        console.log("form.html");
      } else {
        window.alert("Login failed");
      }
      return data;
    })
    .catch((error) => {
      console.error("Fetch error: ", error);
    });
}






