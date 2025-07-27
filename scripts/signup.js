document.addEventListener("DOMContentLoaded", function () {
  var fform = document.getElementById("f-signupForm");
  var fmessage = document.getElementById("f-signup-message");

  if (fform) {
    fform.addEventListener("submit", function (e) {
      e.preventDefault();

      var usernameField = document.getElementById("f-username");
      var emailField = document.getElementById("f-email");
      var passwordField = document.getElementById("f-password");
      var username = usernameField.value.trim();
      var email = emailField.value.trim();

      var password = passwordField.value.trim();

      usernameField.className = "f-input";
      emailField.className = "f-input";

      passwordField.className = "f-input";

      if (!username || !email || !password) {
        fmessage.textContent = "Please fill all fields";
        fmessage.className = "f-message error";

        if (!username) usernameField.classList.add("input-error");
        if (!email) emailField.classList.add("input-error");
        if (!password) passwordField.classList.add("input-error");
        return;
      }
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      var hasLetter = /[A-Za-z]/.test(password);
      var hasNumber = /\d/.test(password);
      var hasSymbol = /[^A-Za-z0-9]/.test(password);

      if (!emailRegex.test(email)) {
        fmessage.textContent = "email should be valid email format (@ .. .com)";
        fmessage.className = "f-message error";
        emailField.classList.add("input-error");
        return;
      }
      if (username.length < 3) {
        fmessage.textContent = "Username must be at least 3 characters";
        fmessage.className = "f-message error";
        usernameField.classList.add("input-error");
        return;
      }

      if (password.length < 6) {
        fmessage.textContent = "Password must be at least 6 characters ";
        fmessage.className = "f-message error";
        passwordField.classList.add("input-error");
        return;
      }

      if (!hasLetter && !hasNumber && !hasSymbol) {
        fmessage.textContent =
          "Password must contain letters, numbers and symbols";
        fmessage.className = "f-message error";
        passwordField.classList.add("input-error");
        return;
      }

      if (!hasLetter) {
        fmessage.textContent = "Password must include at least one letter";
        fmessage.className = "f-message error";
        passwordField.classList.add("input-error");
        return;
      }

      if (!hasNumber) {
        fmessage.textContent = "Password must include at least one number";
        fmessage.className = "f-message error";
        passwordField.classList.add("input-error");
        return;
      }

      if (!hasSymbol) {
        fmessage.textContent =
          "Password must include at least one symbol (! @ # $ ...)";
        fmessage.className = "f-message error";
        passwordField.classList.add("input-error");
        return;
      }

      // ==================Safe parsing============================
      let users = [];
      try {
        var stored = JSON.parse(localStorage.getItem("person"));
        if (Array.isArray(stored)) {
          users = stored;
        }
      } catch (e) {
        users = [];
      }
      // ==========================================================

      var fexists = users.some((u) => u.email === email);

      if (fexists) {
        fmessage.textContent = "Account with this email already exists";
        fmessage.className = "f-message error";
        emailField.classList.add("input-error");
        return;
      }

      var id = Date.now().toString();
      var user = { id, username, email, password };

      users.push(user);
      localStorage.setItem("person", JSON.stringify(users));

      fmessage.textContent = "Registered Successfully!";

      fmessage.className = "f-message success";

      usernameField.classList.add("input-success");
      emailField.classList.add("input-success");

      passwordField.classList.add("input-success");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    });
  }
});
