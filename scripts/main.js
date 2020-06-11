const githubApi = "https://api.github.com";
let avatarImage = document.getElementById("avatar");
let myName = document.getElementById("my-name");
let myFollowers = document.getElementById("followers");
let gitLinkAnchor = document.getElementById("github-link");
let userName = "AnjalBam";

let loadingText = document.getElementById("loading-text");
let contentBody = document.getElementById("content-wrapper");
contentBody.style.display = "none";

window.onload = function () {
  loadingText.style.display = "block";
  getDataFromApi();
  getRepoData();
};

function getDataFromApi() {
  fetch(`${githubApi}/users/${userName}`)
    .then((response) => response.json())
    .then((result) => {
      //console.log(result);
      contentBody.style.display = "block";
      loadingText.style.display = "none";
      setData(result);
    });
}

const getRepoData = () => {
  fetch(`${githubApi}/users/${userName}/repos`)
    .then((response) => response.json())
    .then((repoData) => {
      //console.log(repoData);
      setRepoList(repoData);
    });
};

const setRepoList = (repoData) => {
  repoData.forEach((repo) => {
    console.log(repo);

    //creating a <li> tag
    const liNode = document.createElement("li");
    liNode.classList.add("list-item");
    //Heading headingNode a <h1> tag
    const headingNode = document.createElement("h1");
    const name = document.createTextNode(repo.name);
    //adding text to heading
    headingNode.appendChild(name);

    // ownerDisplay
    const ownerNameNode = document.createElement("h3");
    const ownerName = document.createTextNode(repo.owner.login);
    ownerNameNode.appendChild(ownerName);

    // setting up the link for github repo
    const linkNode = document.createElement("a");
    linkNode.href = repo.html_url;
    linkNode.target = "_blank";
    const iconNode = document.createElement("i");
    iconNode.className = "fab fa-github";
    textForRepo = document.createTextNode("Go to GitHub ");
    linkNode.appendChild(textForRepo);
    linkNode.appendChild(iconNode);

    // for the language
    const languageNode = document.createElement("p");
    const language = document.createTextNode(repo.language);
    languageNode.appendChild(language);

    // append every detail to li tag
    liNode.appendChild(headingNode);
    liNode.appendChild(ownerNameNode);
    liNode.appendChild(languageNode);
    liNode.appendChild(linkNode);

    // appendChild to the ul tag
    document.getElementById("repo-list").appendChild(liNode);
  });
};

const setData = (result) => {
  avatarImage.src = result.avatar_url;
  myName.innerHTML = result.name;
  myFollowers.innerHTML = `${result.followers} people follow me on GitHub`;
  gitLinkAnchor.href = `https://github.com/${userName}`;
};
