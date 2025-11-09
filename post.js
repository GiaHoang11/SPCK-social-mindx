// script.js
const postButton = document.getElementById("postButton");
const postContent = document.getElementById("postContent");
const postImages = document.getElementById("postImages");
const feed = document.getElementById("feed");

postButton.addEventListener("click", () => {
  const text = postContent.value.trim();
  const files = Array.from(postImages.files);

  if (!text && files.length === 0) {
    alert("Vui lòng nhập nội dung hoặc chọn ảnh!");
    return;
  }

  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  const time = new Date().toLocaleString();

  // Hiển thị nhiều ảnh
  let imageHTML = "";
  if (files.length > 0) {
    imageHTML = `<div class="image-grid">`;
    files.forEach((file) => {
      const imgURL = URL.createObjectURL(file);
      imageHTML += `<img src="${imgURL}" alt="post image">`;
    });
    imageHTML += `</div>`;
  }

  postDiv.innerHTML = `
    <div class="post-time">${time}</div>
    <p>${text}</p>
    ${imageHTML}

    <div class="post-actions">
      <button class="like-btn">👍 Thích (<span class="like-count">0</span>)</button>
      <button class="comment-btn">💬 Bình luận</button>
      <button class="delete-btn">🗑️ Xóa</button>
    </div>

    <div class="comment-section" style="display:none;">
      <input type="text" placeholder="Viết bình luận...">
      <div class="comments"></div>
    </div>
  `;

  feed.prepend(postDiv);

  postContent.value = "";
  postImages.value = "";

  addPostFunctionality(postDiv);
});

function addPostFunctionality(post) {
  const likeBtn = post.querySelector(".like-btn");
  const commentBtn = post.querySelector(".comment-btn");
  const deleteBtn = post.querySelector(".delete-btn");
  const commentSection = post.querySelector(".comment-section");
  const commentInput = commentSection.querySelector("input");
  const commentList = commentSection.querySelector(".comments");
  const likeCount = post.querySelector(".like-count");

  let likes = 0;

  // Like
  likeBtn.addEventListener("click", () => {
    likes++;
    likeCount.textContent = likes;
  });

  // Hiện khung comment
  commentBtn.addEventListener("click", () => {
    commentSection.style.display =
      commentSection.style.display === "none" ? "block" : "none";
  });

  // Gửi comment khi nhấn Enter
  commentInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && commentInput.value.trim() !== "") {
      const newComment = document.createElement("div");
      newComment.classList.add("comment");
      newComment.textContent = commentInput.value;
      commentList.appendChild(newComment);
      commentInput.value = "";
    }
  });

  // Xóa bài đăng
  deleteBtn.addEventListener("click", () => {
    if (confirm("Bạn có chắc muốn xóa bài này?")) {
      post.remove();
    }
  });
}
