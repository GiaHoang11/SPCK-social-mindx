var formRegister = document.querySelector("#form-login");
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = e.target[0].value;
  let password = e.target[1].value;
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
    window.location.href = "account.html";
  } else {
    alert("Tai khoan hoac mat khau khong dung!");
  }
  // Lấy thông tin từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    document.getElementById("userName").textContent = user.displayName;
    document.getElementById("userEmail").textContent = user.email;
  } else {
    // Nếu chưa đăng nhập thì chuyển về trang login
    window.location.href = "account.html";
  }
});
