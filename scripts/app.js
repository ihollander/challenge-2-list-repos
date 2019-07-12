document.addEventListener("DOMContentLoaded", function() {
  // application state
  let currentUser = "code-corgi";
  let repositories = [];

  // DOM elements
  const repoList = document.querySelector(".repo-list");
  const header = document.querySelector(".container header h2");
  const userForm = document.querySelector("#user-form");

  // event listeners
  userForm.addEventListener("submit", e => {
    e.preventDefault();
    currentUser = e.target.elements["username"].value;
    render();
  });

  // render fns
  const createRepoRow = repository => {
    const row = document.createElement("div");
    row.className = "row repo";
    row.innerHTML = `
      <h3>
        <a href="${repository.html_url}" target="_blank">${repository.name}</a>
      </h3>
      <p><strong>Description:</strong>
        <span>${repository.description || ""}</span>
      </p>
      <p><strong>Owner:</strong>
        <span>${repository.owner.login}</span>
      </p>
      <div class="stats">
        <div class="col-sm-1 stars">
        <svg class="icon" aria-hidden="true" height="16" version="1.1" viewBox="0 0 14 16" width="14">
          <use xlink:href="./svg/sprites.svg#star"></use>
        </svg>
          <span>${repository.stargazers_count}</span>
        </div>
        <div class="col-sm-1 forks">
          <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 10 16" width="10">
            <use xlink:href="./svg/sprites.svg#fork"></use>
          </svg>
          <span>${repository.forks}</span>
        </div>
      </div>
    `;
    return row;
  };

  const renderRepositories = () => {
    header.innerHTML = `Showing repos from <a href="https://github.com/${currentUser}/">${currentUser}</a>`;

    repoList.innerHTML = "";
    repositories.forEach(repo => {
      const row = createRepoRow(repo);
      repoList.appendChild(row);
    });
  };

  const renderLoading = () => {
    header.innerHTML = `Loading...`;
  };

  const renderError = err => {
    header.innerHTML = `Error!`;
    repoList.innerHTML = `<div>${err.statusText}</div>`;
  };

  const render = async () => {
    renderLoading();
    try {
      repositories = await getUserRepos(currentUser);
      renderRepositories();
    } catch (err) {
      console.error(err);
      renderError(err);
    }
  };

  // initial render
  render();
});
