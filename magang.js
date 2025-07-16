// ====================
// Data Dummy Post
// ====================
const posts = [];
for (let i = 1; i <= 100; i++) {
  posts.push({
    title: `Judul Postingan ke-${i}`,
    date: `2022-09-${(i % 30 + 1).toString().padStart(2, '0')}`,
    img: 'suitmedia.png'
  });
}

// ====================
// Pagination State
// ====================
const apiURL = 'https://suitmedia-backend.suitdev.com/api/ideas';
let currentPage = 1;
let postsPerPage = 9;

// ====================
// Tampilkan Post
// ====================
function renderPosts() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const currentPosts = posts.slice(start, end);

  const container = document.querySelector(".posts-grid");
  container.innerHTML = ""; // kosongkan dulu

  currentPosts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";
    card.innerHTML = `
      <img src="${post.img}" alt="${post.title}">
      <div class="post-content">
        <small>${post.date}</small>
        <div class="post-title">${post.title}</div>
      </div>`;
    container.appendChild(card);
  });

  renderPagination();
}

// ====================
// Tampilkan Navigasi Halaman
// ====================
function renderPagination() {
  let pagination = document.querySelector(".pagination");
  if (!pagination) {
    pagination = document.createElement("div");
    pagination.className = "pagination";
    document.body.appendChild(pagination);
  }

  pagination.innerHTML = "";
  const totalPages = Math.ceil(posts.length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = i;
      renderPosts();
    };
    pagination.appendChild(btn);
  }
}

// ====================
// Event Scroll untuk Header
// ====================
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.style.top = "-100px";
  } else {
    header.style.top = "0";
  }
  lastScroll = currentScroll;
});

// ====================
// Menu Aktif dari Hash
// ====================
function updateActiveMenu() {
  document.querySelectorAll("nav a").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === window.location.hash);
  });
}

window.addEventListener("load", () => {
  renderPosts();
  updateActiveMenu();
});
window.addEventListener("hashchange", updateActiveMenu);
