//Adding interactivity

const BASE_URL = "http://localhost:3000/posts";
let currentPostId = null;

function displayPosts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(posts => {
      const list = document.getElementById("post-list");
      list.innerHTML = '';
      posts.forEach(post => {
       const li = document.createElement("li");
       li.textContent = post.title;
       li.className = "post-title";
       li.addEventListener("click", () => handlePostClick(post.id));
       list.appendChild(li);
 
      });

      if (posts.length > 0) {
        handlePostClick(posts[0].id); // Advanced: Show first post on load
      }
    });
}

function handlePostClick(id) {
  fetch(`${BASE_URL}/${id}`)
    .then(res => res.json())
    .then(post => {
      currentPostId = post.id;
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Author:</strong> ${post.author}</p>
        <img src="${post.image || 'https://via.placeholder.com/150'}" alt="${post.title}" style="max-width: 100%; height: auto; margin-bottom: 15px;" />
        <p>${post.content}</p>
        <button id="edit-btn">Edit</button>
        <button id="delete-btn">Delete</button>
      `;

      document.getElementById("edit-btn").addEventListener("click", () => {
        const form = document.getElementById("edit-post-form");
        form.classList.remove("hidden");
        document.getElementById("edit-title").value = post.title;
        document.getElementById("edit-content").value = post.content;
      });

      document.getElementById("delete-btn").addEventListener("click", () => {
        deletePost(post.id);
      });
    });
}
function addNewPostListener() {
  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newPost = {
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
      author: document.getElementById("author").value,
      image: document.getElementById("image").value 
    };

    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(post => {
      form.reset();

      // ✅ Add new post to DOM immediately
      const list = document.getElementById("post-list");
      const li = document.createElement("li");
      li.textContent = post.title;
      li.className = "post-title";
      li.addEventListener("click", () => handlePostClick(post.id));
      list.appendChild(li);

      // ✅ Show new post details right away
      handlePostClick(post.id);
    });
  });
}


function addEditFormListener() {
  const editForm = document.getElementById("edit-post-form");
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const updatedPost = {
      title: document.getElementById("edit-title").value,
      content: document.getElementById("edit-content").value,
      image: document.getElementById("edit-image").value
    };

    fetch(`${BASE_URL}/${currentPostId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedPost)
    })
    .then(() => {
      editForm.classList.add("hidden");
      displayPosts();
      handlePostClick(currentPostId);
    });
  });

  document.getElementById("cancel-edit").addEventListener("click", () => {
    editForm.classList.add("hidden");
  });
}

function deletePost(id) {
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
    .then(() => {
      displayPosts();
      document.getElementById("post-detail").innerHTML = "<p>Select a post to view its details.</p>";
    });
}

function main() {
  displayPosts();
  addNewPostListener();
  addEditFormListener();
}

document.addEventListener("DOMContentLoaded", main);
