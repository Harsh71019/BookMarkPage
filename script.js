const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookMarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");
let bookmarks = [];

//Show Modal, Focus on Input

function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

//Modal Event Listener

modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
window.addEventListener("click", (e) =>
  console.log(e.target === modal ? modal.classList.remove("show-modal") : false)
);
//Validate form

function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Please Fill out all fields.");
    return false;
  }
  if (urlValue.match(regex)) {
    alert("match");
  }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address");
  }
  return true;
}

function buildBookmarks() {
  //Remove all bookmark element
  bookmarksContainer.textContent = "";
  bookmarks.map((bookmark) => {
    const { name, url } = bookmark;
    //Item
    const item = document.createElement("div");
    item.classList.add("item");
    //Close Item
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    //Favicon / Link Container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    //Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    //Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

//Fetch BookMarks

function fetchBookmarks() {
  //get if available
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "fsfbf",
        url: "test.com",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    console.log(bookmarks);
  }
  buildBookmarks();
}

//Delete Bookmarks
function deleteBookmark(url) {
  bookmarks.map((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  //Update the Bookmarks in Local Storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

//handle data from form

function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("http://", "https://")) {
    urlValue = `https://${urlValue}`;
  }

  console.log(nameValue, urlValue);
  if (!validate(nameValue, urlValue)) {
    return false;
  }

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  console.log(bookmarks);
  bookMarkForm.reset();
  websiteNameEl.focus();
}

// Event Listener

bookMarkForm.addEventListener("submit", storeBookmark);
fetchBookmarks();
