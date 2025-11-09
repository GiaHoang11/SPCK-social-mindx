var formRegister = document.querySelector("#form-register");
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Email", e.target[0].value);
  console.log("password", e.target[1].value);
  console.log("repeat password", e.target[2].value);
  let email = e.target[0].value;
  let password = e.target[1].value;
  let rePassword = e.target[2].value;

  let lowerCaseLetter = /[a-z]/g;
  let upperCaseetter = /[A-Z]/g;
  let numbers = /[0-9]/g;
  if (!email) {
    alert("Vui long nhap email");
    return;
  }
  if (!password) {
    alert("Vui long nhap password");
    return;
  }
  if (!rePassword) {
    alert("Vui long nhap rePassword");
    return;
  }
  if (password.lenght < 8) {
    alert("Mat khau phai tren 8 ki tu");
    return;
  }
  if (!password.match(LowerCaseLetter)) {
    alert("Mat khau phai co chua it nhat 1 chu cai");
  }
  if (!password.match(upperCaseLetter)) {
    alert("Mat khau phai co chua it nhat 1 chu in hoa ");
  }
  if (!password.match(numbers)) {
    alert("Mat khau phai co it nhat 1 chu so");
  }
  if (password !== rePassword) {
    alert("Mat khau ban nhap khong trung voi mat khau nhap lai");
  }
  console.log("register thanh cong", email, password, rePassword);

  const userData = JSON.parse(localStorage.getItem("userData")) || [];
  const newUser = {
    email,
    password,
    rePassword,
  };
  userData.push(newUser);
  localStorage.setItem("userDate", JSON.stringify(userData));
  window.location;
});
