// Lấy ra các phần tử trong HTML bằng id
const postButton = document.getElementById("postButton"); // nút đăng bài
const postContent = document.getElementById("postContent"); // ô nhập nội dung bài viết
const postImages = document.getElementById("postImages"); // input chọn ảnh

// Lắng nghe sự kiện click vào nút đăng bài
postButton.addEventListener("click", () => {
  const text = postContent.value.trim(); // lấy nội dung người dùng nhập, bỏ khoảng trắng thừa

  const files = Array.from(postImages.files); // lấy danh sách file ảnh người dùng chọn

  // Nếu không có nội dung và không có ảnh thì báo lỗi
  if (!text && files.length === 0) {
    alert("Vui lòng nhập nội dung hoặc thêm ảnh!");
    return; // dừng hàm
  }

  let imageList = []; // mảng chứa dữ liệu ảnh sau khi đọc
  if (files.length > 0) {
    // duyệt qua từng file ảnh
    files.forEach((file) => {
      const reader = new FileReader(); // tạo đối tượng đọc file
      reader.onload = function (e) {
        imageList.push(e.target.result); // thêm dữ liệu ảnh (base64) vào mảng

        // khi đã đọc hết tất cả ảnh thì lưu bài viết
        if (imageList.length === files.length) {
          savePost(text, imageList);
        }
      };
      reader.readAsDataURL(file); // đọc file ảnh dưới dạng base64
    });
  } else {
    // nếu không có ảnh thì chỉ lưu nội dung
    savePost(text, imageList);
  }
});

// Hàm lưu bài viết vào localStorage
function savePost(text, images) {
  let posts = JSON.parse(localStorage.getItem("posts")) || []; // lấy danh sách bài từ localStorage

  // thêm bài mới vào đầu mảng
  posts.splice(0, 0, {
    id: Date.now(), // id duy nhất dựa trên thời gian
    content: text, // nội dung bài viết
    images: images, // danh sách ảnh
    time: new Date().toLocaleString(), // thời gian đăng
    likes: 0, // số lượt thích ban đầu
    comments: [], // danh sách bình luận ban đầu
  });

  localStorage.setItem("posts", JSON.stringify(posts)); // lưu lại vào localStorage

  postContent.value = ""; // reset ô nhập nội dung
  postImages.value = ""; // reset ô chọn ảnh

  window.location.reload(); // tải lại trang để hiển thị bài mới
}

// Khi load trang post.html thì hiển thị các bài viết
window.onload = function () {
  let posts = JSON.parse(localStorage.getItem("posts")) || []; // lấy danh sách bài
  let feed = document.getElementById("feed"); // nơi hiển thị bài viết

  posts.forEach((post) => {
    let div = document.createElement("div"); // tạo thẻ div cho bài viết
    div.className = "post"; // gán class

    let imgHTML = ""; // biến chứa HTML ảnh
    if (post.images && post.images.length > 0) {
      imgHTML = `<div class="image-grid">`; // tạo khung ảnh
      post.images.forEach((src) => {
        imgHTML += `<img src="${src}" alt="post image">`; // thêm từng ảnh
      });
      imgHTML += `</div>`;
    }

    // nội dung HTML của bài viết
    div.innerHTML = `
      <p class="post-time">${post.time}</p> <!-- thời gian đăng -->
      <p>${post.content}</p> <!-- nội dung -->
      ${imgHTML} <!-- ảnh -->

      <div class="post-actions"> <!-- các nút thao tác -->
        <button class="like-btn">👍 Thích (<span class="like-count">${post.likes}</span>)</button>
        <button class="comment-btn">💬 Bình luận</button>
        <button class="delete-btn">🗑️ Xóa</button>
      </div>

      <div class="comment-section" style="display:none;"> <!-- khu vực bình luận -->
        <input type="text" class="comment-input" placeholder="Viết bình luận...">
        <div class="comments"></div>
      </div>
    `;

    feed.appendChild(div); // thêm bài vào feed

    addFunctions(div, post.id); // gắn chức năng cho bài viết
  });
};

// ⭐ Hàm thêm chức năng LIKE – COMMENT – DELETE
function addFunctions(postDiv, postId) {
  let posts = JSON.parse(localStorage.getItem("posts")) || []; // lấy danh sách bài

  // lấy các phần tử trong bài viết
  const likeBtn = postDiv.querySelector(".like-btn");
  const likeCount = postDiv.querySelector(".like-count");
  const commentBtn = postDiv.querySelector(".comment-btn");
  const deleteBtn = postDiv.querySelector(".delete-btn");
  const commentSection = postDiv.querySelector(".comment-section");
  const commentInput = postDiv.querySelector(".comment-input");
  const commentList = postDiv.querySelector(".comments");

  let selectedPost = posts.find((p) => p.id === postId); // tìm bài viết theo id

  // LIKE
  likeBtn.addEventListener("click", () => {
    selectedPost.likes++; // tăng số lượt thích
    likeCount.textContent = selectedPost.likes; // cập nhật hiển thị

    localStorage.setItem("posts", JSON.stringify(posts)); // lưu lại
  });

  // HIỆN / ẨN COMMENT
  commentBtn.addEventListener("click", () => {
    commentSection.style.display =
      commentSection.style.display === "none" ? "block" : "none"; // toggle hiển thị
  });

  // THÊM COMMENT
  commentInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && commentInput.value.trim() !== "") {
      const newComment = commentInput.value.trim(); // lấy nội dung bình luận

      selectedPost.comments.push(newComment); // thêm vào danh sách bình luận
      localStorage.setItem("posts", JSON.stringify(posts)); // lưu lại

      let cmt = document.createElement("div"); // tạo thẻ div cho bình luận
      cmt.classList.add("comment");
      cmt.textContent = newComment;

      commentList.appendChild(cmt); // thêm bình luận vào giao diện
      commentInput.value = ""; // reset ô nhập
    }
  });

  // XOÁ BÀI
  deleteBtn.addEventListener("click", () => {
    if (confirm("Bạn có chắc muốn xóa bài này?")) {
      // xác nhận xoá
      let newPosts = posts.filter((p) => p.id !== postId); // lọc bỏ bài cần xoá
      localStorage.setItem("posts", JSON.stringify(newPosts)); // lưu lại

      postDiv.remove(); // xoá khỏi giao diện
    }
  });

  // HIỂN THỊ COMMENT CŨ
  selectedPost.comments.forEach((c) => {
    let cmt = document.createElement("div"); // tạo thẻ div cho bình luận cũ
    cmt.classList.add("comment");
    cmt.textContent = c;
    commentList.appendChild(cmt); // thêm vào giao diện
  });
}
