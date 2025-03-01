const listOfVids = document.getElementById("listOfRequests");
let sortBy = "newFirst";
let searchTerm = "";

const vidComponent = (vidInfo, iSprepend) => {
  const vidContainer = document.createElement("div");
  vidContainer.innerHTML = ` <div class="card mb-3">
  <div class="card-body d-flex justify-content-between flex-row">
  <div class="d-flex flex-column">
  <h3>${vidInfo.topic_title}</h3>
  <p class="text-muted mb-2">${vidInfo.topic_details}</p>
  <p class="mb-0 text-muted">
  ${
    vidInfo.expected_result &&
    `<strong>Expected results:</strong> ${vidInfo.expected_result}`
  }
              </p>
              </div>
              <div class="d-flex flex-column text-center">
              <a id="votes_ups_${vidInfo._id}" class="btn btn-link">🔺</a>
              <h3 id="score_vote_${vidInfo._id}" >${
    vidInfo.votes.ups - vidInfo.votes.downs
  }</h3>
              <a id="votes_downs_${vidInfo._id}" class="btn btn-link">🔻</a>
            </div>
            </div>
            <div class="card-footer d-flex flex-row justify-content-between">
            <div>
            <span class="text-info">${vidInfo.status.toUpperCase()}</span>
            &bullet; added by <strong>${vidInfo.author_name}</strong> on
            <strong>${new Date(
              vidInfo.submit_date
            ).toLocaleDateString()}</strong>
            </div>
            <div
            class="d-flex justify-content-center flex-column 408ml-auto mr-2"
            >
            <div class="badge badge-success">${vidInfo.target_level}</div>
            </div>
            </div>
            </div>`;

  iSprepend === true
    ? listOfVids.prepend(vidContainer)
    : listOfVids.appendChild(vidContainer);

  listenerComponent(vidInfo);
};

const loadAllVidReq = function (sortBy, searchTerm = "") {
  fetch(
    `http://localhost:7777/video-request?sortBy=${sortBy}&searchTerm=${searchTerm}`
  )
    .then((data) => data.json())
    .then((data) => {
      listOfVids.innerHTML = ""; // ???
      data.forEach((vidInfo) => {
        vidComponent(vidInfo);
      });
    });
};

document.addEventListener("DOMContentLoaded", function () {
  const formVidReq = document.getElementById("formVideoRequest");

  // sorting

  const sortByElements = document.querySelectorAll("[id*=sort_by_]");
  const searchBox = document.getElementById("search_box");

  // loading videos content

  loadAllVidReq();

    // sorting

  sortByElements.forEach((element) => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      sortBy = this.querySelector("input").value;
      loadAllVidReq(sortBy, searchTerm);
      this.classList.add("active");
      sortBy === "topVotedFirst"
        ? document.getElementById("sort_by_new").classList.remove("active")
        : document.getElementById("sort_by_top").classList.remove("active");
    });
  });

  // searching

  searchBox.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    loadAllVidReq(sortBy, searchTerm);
  });

  // fetching data already existed in DB

  // loadAllVidReq();

  // adding new video post

  formVidReq.addEventListener("submit", (e) => {
    e.preventDefault(); // preventing default behavior (redirect to another page or reload) of form submission in order to handle submit using JS
    const formData = new FormData(formVidReq);
    fetch("http://localhost:7777/video-request", {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((data) => {
        vidComponent(data, true);
      });
  });
});

const listenerComponent = (data) => {
  const voteUps = document.getElementById(`votes_ups_${data._id}`);
  const score = document.getElementById(`score_vote_${data._id}`);
  const voteDowns = document.getElementById(`votes_downs_${data._id}`);

  voteUps.addEventListener("click", (e) => {
    fetch("http://localhost:7777/video-request/vote", {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ id: data._id, vote_type: "ups" }),
    })
      .then((data) => data.json())
      .then((data) => {
        score.innerText = data.ups - data.downs;
      });
  });
  voteDowns.addEventListener("click", (e) => {
    fetch("http://localhost:7777/video-request/vote", {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ id: data._id, vote_type: "downs" }),
    })
      .then((data) => data.json())
      .then((data) => {
        score.innerText = data.ups - data.downs;
      });
  });
};
