const spinner = document.getElementById("spinner");

function showSpinner() {
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 5000);
}
function hideSpinner() {
  spinner.className = spinner.className.replace("show", "");
}
const searchTeamName = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";

  // display message
  if (searchText == "") {
    const p = document.getElementById("display-message");
    p.style.display = "block";
  } else {
    const p = document.getElementById("display-message");
    p.style.display = "none";
    showSpinner();
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => displayTeam(data.teams));
  }
};

const displayTeam = (teams) => {
  hideSpinner();
  const displayTeam = document.getElementById("display-team");
  displayTeam.textContent = "";
  teams.forEach((team) => {
    const div = document.createElement("div");

    div.classList.add("col");
    div.classList.add("shadow-2xl");

    div.innerHTML = `
        <img src="${team.strTeamBadge}" alt="" />
        <h2 class="text-2xl text-white text-center">${team.strTeam}</h2>
      
        <button onclick="loadDetails(${team.idTeam})"  class="p-2 bg-white ml-40 rounded mt-2 text-black-400 font-bold">Details</button>
      `;
    displayTeam.appendChild(div);
  });
};

const loadDetails = (idTeam) => {
  const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${idTeam}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.teams[0]));
};

const displayDetails = (team) => {
  console.log(team);
  const loadDetails = document.getElementById("load-details");
  loadDetails.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <div id='details-display'
    
    class="w-1/4 border-2 border-white p-4 rounded"
  >
    <img src="${team.strTeamBadge}" alt="" />
    <h2 class="text-2xl text-white mb-8">${team.strTeam}</h2>
<p class="text-white">${team.strDescriptionEN.slice(0, 200)}</p>
    <div class="flex justify-center mt-4 gap-2">
    <a class="p-2 bg-green-500 rounded text-white font-bold" href="http://${
      team.strTwitter
    }"
        >Twitter</a
      >
      <a class="p-2 bg-green-500 rounded text-white font-bold" href= "http://${
        team.strWebsite
      }"
        >Website</a
    >
    </div>
  </div>
    `;
  loadDetails.appendChild(div);
};
// loading js
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
});
