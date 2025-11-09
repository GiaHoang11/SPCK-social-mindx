var formRegister = document.querySelector("#form-register");
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Email", e.target[0].value);
  console.log("password", e.target[1].value);
  console.log(email, password);

  const userData = JSON.parse(localStorage.getItem("userData")) || [];
  const userExists = userData.find(
    (user) => user.email === email && user.password === password
  );

  if (userExists) {
    console.log("found user", userExists);
    localStorage.setItem("currentUser", JSON.stringify(userExists));
    window.location.href = "index.html";
  } else {
    alert("Tai khoan hoac mat khau khong dung!");
  }
});
