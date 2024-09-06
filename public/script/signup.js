//Client-Side Code (signup.js):
document.addEventListener("DOMContentLoaded", function () {
    const signupForms = document.querySelectorAll("#signup-form");
  
    // Event listeners for signup forms
    signupForms.forEach(function (form) {
      const signupBtn = form.querySelector("#signup-btn");
  
      //signup btn
      signupBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default action
  
        const currentPage =
          "file:///C:/Users/Admin%20pc/Desktop/Form%20node/public/html/signup.html"
            .split("/")
            .pop();
  
        if (currentPage === "login.html") {
          window.location.href = "signup.html";
        } else if (currentPage === "signup.html" && signupValidation()) {
          signupSubmission(event);
        }
      });
    });
  });
  
  function signupValidation() {
    console.log("validation called");
    var userInput = document.querySelector('input[name="name"]');
    var name = userInput.value.trim();
    var isValid = true;
  
    if (name.length < 5) {
      userInput.classList.remove("is-valid");
      userInput.classList.add("is-invalid");
      document.getElementById("name-validation").innerText =
        "Name must be at least 5 characters";
      isValid = false;
    } else {
      userInput.classList.remove("is-invalid");
      userInput.classList.add("is-valid");
      document.getElementById("name-validation").innerText = "";
    }
  
    return isValid;
  }
  
  function signupSubmission(event) {
    event.preventDefault(); // Prevent default form submission
  
    if (!signupValidation()) {
      console.log("Form validation failed");
      return; // Exit function if validation fails
    }
  
    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="psw"]').value;
  
    const signupData = {
      name: name,
      email: email,
      password: password,
    };
    fetchSignupData(signupData);
  }
  
  function fetchSignupData(signupData) {
    fetch("http://localhost:3000/form/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then((response) => {
        if (response.status === 400) {
          window.alert("Email already exists");
        } else if (!response.ok) {
          console.log("Server side error");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data from server:", data.message);
        if (data.message === "signup data successfully") {
          window.alert("Signup successful");
        }
        return data;
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
      });
  }
  