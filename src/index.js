document.addEventListener("DOMContentLoaded", main);

const BASE_URL = "http://localhost:3000/posts";

function main() {
  displayPosts();
  addNewPostListener();
}

function displayPosts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = "";
      posts.forEach(post => {
        const div = document.createElement("div");
        div.textContent = post.title;
        div.style.cursor = "pointer";
        div.addEventListener("click", () => handlePostClick(post.id));
        postList.appendChild(div);
      });

      // Display first post by default (advanced)
      if (posts.length) {
        handlePostClick(posts[0].id);
      }
    });
}

function handlePostClick(id) {
  fetch(`${BASE_URL}/${id}`)
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p><em>By ${post.author} • ${post.date || "Unknown date"}</em></p>
        <img src="${post.image}" alt="post image" style="width:100%; max-height:200px; object-fit:cover;" />
        <p>${post.content}</p>
        <button id="edit-btn">Edit</button>
        <button id="delete-btn">Delete</button>
      `;

      document.getElementById("edit-btn").addEventListener("click", () => showEditForm(post));
      document.getElementById("delete-btn").addEventListener("click", () => deletePost(post.id));
    });
}

function addNewPostListener() {
  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", e => {
    e.preventDefault();

    const newPost = {
      title: form.title.value,
      author: form.author.value,
      image: form.image.value,
      content: form.content.value,
      date: new Date().toISOString().split("T")[0]
    };

    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(() => {
      form.reset();
      displayPosts();
    });
  });
}

function showEditForm(post) {
  const editForm = document.getElementById("edit-post-form");
  editForm.classList.remove("hidden");
  editForm.title.value = post.title;
  editForm.content.value = post.content;

  editForm.onsubmit = (e) => {
    e.preventDefault();
    const updated = {
      title: editForm.title.value,
      content: editForm.content.value
    };

    fetch(`${BASE_URL}/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    })
    .then(res => res.json())
    .then(() => {
      editForm.classList.add("hidden");
      displayPosts();
      handlePostClick(post.id);
    });
  };

  document.getElementById("cancel-edit").onclick = () => {
    editForm.classList.add("hidden");
  };
}

function deletePost(id) {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) return;
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
    .then(() => {
      displayPosts();
      document.getElementById("post-detail").innerHTML = "<p>Select a post to view details.</p>";
    });
}

        
    

