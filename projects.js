// projects.js — Auto-load GitHub repositories into the CV

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("projects-list");
  if (!list) return;

  const username = "TCD978";
  const apiURL = `https://api.github.com/users/${username}/repos?sort=updated`;

  async function loadRepos() {
    try {
      const res = await fetch(apiURL);

      if (!res.ok) {
        list.innerHTML = `<li class="error">Unable to load projects.</li>`;
        return;
      }

      const repos = await res.json();

      // Filter out forks
      const filtered = repos.filter(repo => !repo.fork);

      if (filtered.length === 0) {
        list.innerHTML = `<li>No public projects found.</li>`;
        return;
      }

      // Clear loading text
      list.innerHTML = "";

      // Build list items
      filtered.forEach(repo => {
        const li = document.createElement("li");
        li.className = "project-item";

        const link = document.createElement("a");
        link.href = repo.html_url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = repo.name;

        li.appendChild(link);

        // Optional: add description if available
        if (repo.description) {
          const desc = document.createElement("p");
          desc.className = "project-desc";
          desc.textContent = repo.description;
          li.appendChild(desc);
        }

        list.appendChild(li);
      });

    } catch (err) {
      console.error("GitHub fetch error:", err);
      list.innerHTML = `<li class="error">Network error loading projects.</li>`;
    }
  }

  loadRepos();
});