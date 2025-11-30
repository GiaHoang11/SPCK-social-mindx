// login.js

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const email = document.getElementById("form2Example18").value.trim();
    const password = document.getElementById("form2Example28").value.trim();

    // Kiểm tra dữ liệu nhập
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    // Giả sử kiểm tra mật khẩu (ở đây chỉ demo, sau này có thể kết nối server)
    // Ví dụ: mật khẩu phải có ít nhất 6 ký tự
    if (password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    // Tạo object user
    const user = {
      displayName: email.split("@")[0], // lấy phần trước @ làm tên hiển thị
      email: email,
    };

    // Lưu vào localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Chuyển hướng sang account.html
    window.location.href = "account.html";
  });
});
