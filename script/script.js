import galleryItems from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");

function createListItem(data) {
  gallery.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${data.original}"
    >
      <img
        class="gallery__image"
        src="${data.preview}"
        data-source="${data.original}"
        alt="${data.description}"
      />
    </a>
  </li>`
  );
}

galleryItems.forEach(createListItem);

gallery.addEventListener("click", event => {
  event.preventDefault();
  openModalWindow(event.target);
});

function openModalWindow(target) {
  document.querySelector("div.lightbox").classList.add("is-open");
  document
    .querySelector("img.lightbox__image")
    .setAttribute("src", target.dataset.source);
}

document
  .querySelector('button[data-action="close-lightbox"]')
  .addEventListener("click", closeOpenModalWindow);

document
  .querySelector(".lightbox__overlay")
  .addEventListener("click", closeOpenModalWindow);

document.onkeydown = evt => {
  if (evt.keyCode == 27) {
    closeOpenModalWindow();
  } else if (evt.keyCode == 37) {
    changeImage("left");
  } else if (evt.keyCode == 39) {
    changeImage("right");
  }
};

function closeOpenModalWindow() {
  document.querySelector("img.lightbox__image").setAttribute("src", "");
  document.querySelector("div.lightbox").classList.remove("is-open");
}
