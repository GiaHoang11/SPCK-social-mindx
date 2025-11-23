window.onload = function () {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let feed = document.getElementById("feed");

  posts.forEach((post) => {
    let div = document.createElement("div");
    div.className = "post card mb-3 p-3";
    div.innerHTML = `
        <p class="text-muted">${post.time}</p>
        <p>${post.content}</p>
      `;
    feed.appendChild(div);
  });
};
