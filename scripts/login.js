document.addEventListener("DOMContentLoaded", function () {
  var fform = document.getElementById("f-loginForm");
  var fmessage = document.getElementById("f-login-message");

  if (fform && fmessage) {
    fform.addEventListener("submit", function (e) {
      e.preventDefault();

      var emailField = document.getElementById("f-login-email");

      var passwordField = document.getElementById("f-login-password");
      var email = emailField.value;
      var password = passwordField.value;
      emailField.className = "f-input";
      passwordField.className = "f-input";

      var users = JSON.parse(localStorage.getItem("person")) || [];
      var user = users.find((u) => u.email === email);

      if (!user) {
        fmessage.textContent = "Invalid email or password";
        fmessage.className = "f-message error";
        emailField.classList.add("input-error");
        passwordField.classList.add("input-error");
        return;
      }

      if (user.password !== password) {
        fmessage.textContent = "Invalid email or password";
        fmessage.className = "f-message error";

        return;
      }

      fmessage.textContent = "Login successful!";
      fmessage.className = "f-message success";
      emailField.classList.add("input-success");

      passwordField.classList.add("input-success");

      localStorage.setItem("currentUser", JSON.stringify(user));
      setTimeout(() => {
        window.location.href = "m_home.html";
      }, 1000);
    });
  }
});
