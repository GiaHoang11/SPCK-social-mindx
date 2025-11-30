// Khi trang được load xong
window.onload = function () {
  let posts = JSON.parse(localStorage.getItem("posts")) || []; // lấy danh sách bài từ localStorage
  let feed = document.getElementById("feed"); // phần tử hiển thị danh sách bài viết

  // duyệt qua từng bài viết
  posts.forEach((post) => {
    let div = document.createElement("div"); // tạo thẻ div cho bài viết
    div.className = "post card mb-3 p-3"; // gán class để có style bootstrap

    // Tạo HTML phần ảnh
    let imgHTML = "";
    if (post.images && post.images.length > 0) {
      imgHTML = `<div class="image-grid" style="margin-top: 10px;">`; // khung chứa ảnh
      post.images.forEach((src) => {
        // thêm từng ảnh vào khung
        imgHTML += `<img src="${src}" alt="post" style="width:100%; border-radius:10px; margin-top:10px;">`;
      });
      imgHTML += `</div>`;
    }

    // Tạo nội dung bài đăng
    div.innerHTML = `
      <p class="text-muted">${post.time}</p> <!-- thời gian đăng -->
      <p>${post.content}</p> <!-- nội dung -->
      ${imgHTML} <!-- ảnh nếu có -->

      <div class="post-actions" style="display:flex; gap:15px; margin-top:10px;"> <!-- các nút thao tác -->
        <button class="like-btn">👍 Thích (<span class="like-count">${post.likes}</span>)</button>
        <button class="comment-btn">💬 Bình luận</button>
      </div>

      <div class="comment-section" style="display:none; margin-top:10px;"> <!-- khu vực bình luận -->
        <input type="text" class="comment-input" placeholder="Viết bình luận..." 
               style="width:100%; padding:8px; border-radius:6px; border:1px solid #ddd;">
        <div class="comments"></div> <!-- nơi hiển thị các bình luận -->
      </div>
    `;

    feed.appendChild(div); // thêm bài viết vào feed

    addIndexPageFunctions(div, post.id); // gắn chức năng cho bài viết
  });
};

// ⭐ CHỨC NĂNG LIKE – COMMENT CHO INDEX TRANG CHỦ
function addIndexPageFunctions(postDiv, postId) {
  let posts = JSON.parse(localStorage.getItem("posts")) || []; // lấy danh sách bài từ localStorage

  // lấy các phần tử trong bài viết
  const likeBtn = postDiv.querySelector(".like-btn"); // nút like
  const likeCount = postDiv.querySelector(".like-count"); // số lượt like
  const commentBtn = postDiv.querySelector(".comment-btn"); // nút bình luận
  const commentSection = postDiv.querySelector(".comment-section"); // khu vực bình luận
  const commentInput = postDiv.querySelector(".comment-input"); // ô nhập bình luận
  const commentList = postDiv.querySelector(".comments"); // danh sách bình luận

  let selectedPost = posts.find((p) => p.id === postId); // tìm bài viết theo id

  // LIKE
  likeBtn.addEventListener("click", () => {
    selectedPost.likes++; // tăng số lượt thích
    likeCount.textContent = selectedPost.likes; // cập nhật hiển thị số like

    localStorage.setItem("posts", JSON.stringify(posts)); // lưu lại vào localStorage
  });

  // HIỆN / ẨN COMMENT
  commentBtn.addEventListener("click", () => {
    commentSection.style.display =
      commentSection.style.display === "none" ? "block" : "none"; // toggle hiển thị
  });

  // GỬI COMMENT
  commentInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && commentInput.value.trim() !== "") {
      // khi nhấn Enter và có nội dung
      let newComment = commentInput.value.trim(); // lấy nội dung bình luận

      selectedPost.comments.push(newComment); // thêm vào danh sách bình luận
      localStorage.setItem("posts", JSON.stringify(posts)); // lưu lại

      let c = document.createElement("div"); // tạo thẻ div cho bình luận mới
      c.classList.add("comment");
      c.textContent = newComment;
      commentList.appendChild(c); // thêm vào giao diện

      commentInput.value = ""; // reset ô nhập
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
