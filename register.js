// Lấy phần tử form đăng ký
const registerForm = document.querySelector("#registerForm");

// Nếu form tồn tại thì thêm sự kiện submit
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Ngăn hành vi mặc định

    // Lấy giá trị từ các ô input
    const displayName = e.target.displayName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Kiểm tra dữ liệu đầu vào
    if (!displayName || !email || !password) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Kiểm tra định dạng email đơn giản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ.");
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // Hiển thị dữ liệu ra console (có thể thay bằng gửi đến server)
    console.log("Đăng ký với:", { displayName, email, password });
    // lấy dữ liệu userData được lưu trong Localstorage ra, đồng thời ép kiểu về dạng json để trình duyệt hiểu
    // và cũng như dễ tương tác hơn
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    // kiểm tra xem email đã được đăng kí chưa
    const emailExists = userData.find((user) => user.email === email);
    if (emailExists) {
      alert("Email đã được đăng kí, vui lòng sử dụng email khác");
      return;
    }
    // nếu chưa thì thêm user mới vào mảng userData
    const newUser = {
      email,
      password,
      displayName,
    };
    userData.push(newUser);
    // sau đó lưu mảng userData đã được thêm user mới vào lại localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    window.location.href = "login.html"; // tự động di chuyển về trang login
  });
}
