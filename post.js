// Lấy phần tử HTML
const postButton = document.getElementById("postButton");
const postContent = document.getElementById("postContent");
const postImages = document.getElementById("postImages");

// Khi nhấn Đăng Bài
postButton.addEventListener("click", () => {
  const text = postContent.value.trim();
  const files = Array.from(postImages.files);

  if (!text && files.length === 0) {
    alert("Vui lòng nhập nội dung hoặc thêm ảnh!");
    return;
  }

  let imageList = [];
  if (files.length > 0) {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        imageList.push(e.target.result);

        if (imageList.length === files.length) {
          savePost(text, imageList);
        }
      };
      reader.readAsDataURL(file);
    });
  } else {
    savePost(text, imageList);
  }
});

function savePost(text, images) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.unshift({
    id: Date.now(),
    content: text,
    images: images,
    time: new Date().toLocaleString(),
    likes: 0,
    comments: [],
  });

  localStorage.setItem("posts", JSON.stringify(posts));

  postContent.value = "";
  postImages.value = "";

  window.location.href = "index.html";
}

// Hiển thị bài khi đang ở post.html
window.onload = function () {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let feed = document.getElementById("feed");

  posts.forEach((post) => {
    let div = document.createElement("div");
    div.className = "post";

    let imgHTML = "";
    if (post.images && post.images.length > 0) {
      imgHTML = `<div class="image-grid">`;
      post.images.forEach((src) => {
        imgHTML += `<img src="${src}" alt="post image">`;
      });
      imgHTML += `</div>`;
    }

    div.innerHTML = `
      <p class="post-time">${post.time}</p>
      <p>${post.content}</p>
      ${imgHTML}

      <div class="post-actions">
        <button class="like-btn">👍 Thích (<span class="like-count">${post.likes}</span>)</button>
        <button class="comment-btn">💬 Bình luận</button>
        <button class="delete-btn">🗑️ Xóa</button>
      </div>

      <div class="comment-section" style="display:none;">
        <input type="text" class="comment-input" placeholder="Viết bình luận...">
        <div class="comments"></div>
      </div>
    `;

    feed.appendChild(div);

    addFunctions(div, post.id);
  });
};

// ⭐ HÀM THÊM CHỨC NĂNG LIKE – COMMENT – DELETE
function addFunctions(postDiv, postId) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  const likeBtn = postDiv.querySelector(".like-btn");
  const likeCount = postDiv.querySelector(".like-count");
  const commentBtn = postDiv.querySelector(".comment-btn");
  const deleteBtn = postDiv.querySelector(".delete-btn");
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

  // THÊM COMMENT
  commentInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && commentInput.value.trim() !== "") {
      const newComment = commentInput.value.trim();

      selectedPost.comments.push(newComment);
      localStorage.setItem("posts", JSON.stringify(posts));

      let cmt = document.createElement("div");
      cmt.classList.add("comment");
      cmt.textContent = newComment;

      commentList.appendChild(cmt);
      commentInput.value = "";
    }
  });

  // XOÁ BÀI
  deleteBtn.addEventListener("click", () => {
    if (confirm("Bạn có chắc muốn xóa bài này?")) {
      let newPosts = posts.filter((p) => p.id !== postId);
      localStorage.setItem("posts", JSON.stringify(newPosts));

      postDiv.remove();
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
