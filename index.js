window.onload = function () {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let feed = document.getElementById("feed");

  posts.forEach((post) => {
    let div = document.createElement("div");
    div.className = "post card mb-3 p-3";

    // Tạo HTML phần ảnh
    let imgHTML = "";
    if (post.images && post.images.length > 0) {
      imgHTML = `<div class="image-grid" style="margin-top: 10px;">`;
      post.images.forEach((src) => {
        imgHTML += `<img src="${src}" alt="post" style="width:100%; border-radius:10px; margin-top:10px;">`;
      });
      imgHTML += `</div>`;
    }

    // Tạo nội dung bài đăng
    div.innerHTML = `
      <p class="text-muted">${post.time}</p>
      <p>${post.content}</p>
      ${imgHTML}

      <div class="post-actions" style="display:flex; gap:15px; margin-top:10px;">
        <button class="like-btn">👍 Thích (<span class="like-count">${post.likes}</span>)</button>
        <button class="comment-btn">💬 Bình luận</button>
      </div>

      <div class="comment-section" style="display:none; margin-top:10px;">
        <input type="text" class="comment-input" placeholder="Viết bình luận..." style="width:100%; padding:8px; border-radius:6px; border:1px solid #ddd;">
        <div class="comments"></div>
      </div>
    `;

    feed.appendChild(div);

    addIndexPageFunctions(div, post.id);
  });
};

// ⭐ CHỨC NĂNG LIKE – COMMENT CHO INDEX TRANG CHỦ
function addIndexPageFunctions(postDiv, postId) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  const likeBtn = postDiv.querySelector(".like-btn");
  const likeCount = postDiv.querySelector(".like-count");
  const commentBtn = postDiv.querySelector(".comment-btn");
  const commentSection = postDiv.querySelector(".comment-section");
  const commentInput = postDiv.querySelector(".comment-input");
  const commentList = postDiv.querySelector(".comments");

  let selectedPost = posts.find((p) => p.id === postId);

  // LIKE
  likeBtn.addEventListener("click", () => {
    selectedPost.likes++;
    likeCount.textContent = selectedPost.likes;

    localStorage.setItem("posts", JSON.stringify(posts));
  });

  // HIỆN / ẨN COMMENT
  commentBtn.addEventListener("click", () => {
    commentSection.style.display =
      commentSection.style.display === "none" ? "block" : "none";
  });

  // GỬI COMMENT
  commentInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && commentInput.value.trim() !== "") {
      let newComment = commentInput.value.trim();

      selectedPost.comments.push(newComment);
      localStorage.setItem("posts", JSON.stringify(posts));

      let c = document.createElement("div");
      c.classList.add("comment");
      c.textContent = newComment;
      commentList.appendChild(c);

      commentInput.value = "";
    }
  });

  // HIỂN THỊ COMMENT CŨ
  selectedPost.comments.forEach((c) => {
    let cmt = document.createElement("div");
    cmt.classList.add("comment");
    cmt.textContent = c;
    commentList.appendChild(cmt);
  });
}
