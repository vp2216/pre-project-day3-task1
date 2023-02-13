let currentPage = 1;

const loading = document.createElement("img");
loading.setAttribute("src", "./spin.gif");
loading.style.width = "10.5rem";

const display = document.getElementById("display");
const next = document.getElementById("load_next");
const prev = document.getElementById("load_prev");
const page = document.getElementById("page");

function dataFetch(page) {
  if (currentPage === 1) {
    prev.disabled = true;
    prev.style.opacity = 0.5;
  } else {
    prev.disabled = false;
    prev.style.opacity = 1;
  }
  display.innerHTML = "";
  display.appendChild(loading);
  fetch(
    `https://api.github.com/repositories/1296269/issues?page=${page}&per_page=5`
  )
    .then((res) => res.json())
    .then((res) => {
      display.innerHTML = "";
        res.map((data) => {
            const list = document.createElement("li");
            list.innerHTML = data.title;
            display.appendChild(list);
        });
        
    });
}

next.addEventListener("click", () => {
  currentPage += 1;
  page.innerHTML = currentPage;
  dataFetch(currentPage);
});

prev.addEventListener("click", () => {
  currentPage -= 1;
  page.innerHTML = currentPage;
  dataFetch(currentPage);
});
