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

       // ✅ Update post count
       const postCount = document.getElementById("post-count");

      postCount.textContent = `(${posts.length} post${posts.length !== 1 ? "s" : ""})`;
      if (posts.length) {
  handlePostClick(posts[0].id); // ✅ Load first post
}

    
    })
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
        <button id="edit-btn" title="Edit" class="icon-btn">
  <img src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png" alt="Edit" class="icon-img" />
</button>
<button id="delete-btn" class="icon-btn" title="Delete">
  <img src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="Delete" class="icon-img" />
</button>


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
toggleAddForm();
function toggleAddForm() {
  const toggleBtn = document.getElementById("toggle-form-btn");
  const form = document.getElementById("new-post-form");

  toggleBtn.addEventListener("click", () => {
    form.classList.toggle("hidden");
    toggleBtn.textContent = form.classList.contains("hidden") ? "+ Add New Post" : "Add New Post";
  });
}
function showEditForm(post) {
  const detail = document.getElementById("post-detail");

  detail.innerHTML = `
    <h2>Editing: ${post.title}</h2>
    <form id="edit-post-form">
      <label for="edit-title">Title:</label>
      <input type="text" name="title" id="edit-title" value="${post.title}" required />

      <label for="edit-content">Content:</label>
      <textarea name="content" id="edit-content" rows="5" required>${post.content}</textarea>

      <div style="margin-top: 10px;">
        <button type="submit" style="background-color:#3b82f6; color:white; padding:10px; border:none; border-radius:6px;">Save Changes</button>
        <button type="button" id="cancel-edit" style="margin-left: 10px; background-color:gray; color:white; padding:10px; border:none; border-radius:6px;">Cancel</button>
      </div>
    </form>
  `;

  const editForm = document.getElementById("edit-post-form");

  editForm.onsubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      title: document.getElementById("edit-title").value,
      content: document.getElementById("edit-content").value
    };

    fetch(`${BASE_URL}/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost)
    })
    .then(res => res.json())
    .then(() => {
      displayPosts();
      handlePostClick(post.id); // reload post view after edit
    });
  };

  document.getElementById("cancel-edit").addEventListener("click", () => {
    handlePostClick(post.id); // cancel → go back to post view
  });
}

        
    

