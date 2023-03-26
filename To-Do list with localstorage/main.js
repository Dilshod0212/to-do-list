const menuList = document.querySelector(".menu");
const template = document.querySelector(".workTemplate").content;
const form = document.querySelector(".form");
const textInp = form.querySelector(".text-input ");
const timeInp = form.querySelector(".time-input ");

renderWork();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  workArr = JSON.parse(localStorage.getItem("works"));
  let count = workArr.length;
  const name = textInp.value;
  const time = timeInp.value;
  count++;

  if (name !== "" && time !== "") {
    const newWork = {
      name,
      time,
      id: count,
    };
    workArr.push(newWork);
    localStorage.setItem("works", JSON.stringify(workArr));
    renderWork();

    textInp.value = "";
    timeInp.value = "";
  }
});

function renderWork() {
  let workArr;
  if (localStorage.getItem("works") === null) {
    workArr = [
      { id: 1, name: "Uyg'onaman", time: "07:00" },
      { id: 2, name: "Choy ichaman", time: "07:30" },
      { id: 3, name: "Uhlayman", time: "00:30" },
    ];
  } else {
    workArr = JSON.parse(localStorage.getItem("works"));
  }
  menuList.innerHTML = "";
  const listItemTemplate = template.querySelector(".list");
  workArr.forEach((elem, idx) => {
    const listItem = listItemTemplate.cloneNode(true);
    listItem.setAttribute("item-id", elem.id);
    const listName = listItem.querySelector(".text");
    const listTime = listItem.querySelector(".time");
    listName.textContent = elem.name;
    listTime.textContent = elem.time;
    menuList.appendChild(listItem);
  });
  localStorage.setItem("works", JSON.stringify(workArr));
}

menuList.addEventListener("click", (e) => {
  e.preventDefault();
    workArr = JSON.parse(localStorage.getItem("works"));
  const pressedElement = e.target;
  if (
    pressedElement.nodeName == "BUTTON" &&
    pressedElement.classList.contains("delete")
  ) {
    const itemId = pressedElement.parentElement.getAttribute("item-id");
    workArr.forEach((elem, idx) => {
      if (elem.id == itemId) {
        workArr.splice(idx, 1);
        localStorage.setItem("works", JSON.stringify(workArr));
        renderWork();
      }
    });
  }
});