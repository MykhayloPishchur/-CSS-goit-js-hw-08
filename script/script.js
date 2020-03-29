import galleryItems from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");
const lightBox = document.querySelector("div.lightbox");
const lightBoxImg = document.querySelector("img.lightbox__image");
const closeButton = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const galleryItem = gallery.children;

let index;
let imgSrc;

galleryItems.forEach(data =>
  gallery.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery__item">
    <a
    class="gallery__link"
    href='${data.original}'
  >
      <img
        class="gallery__image"
        src="${data.preview}"
        data-source="${data.original}"
        alt="${data.description}"
      />
    </a>
  </li>`
  )
);

for (let i = 0; i < galleryItem.length; i++) {
  galleryItem[i].addEventListener("click", event => {
    event.preventDefault();
    index = i;
    changeImage();
    openImage();
  });
}

function openImage() {
  lightBox.classList.add("is-open");
}

function changeImage() {
  imgSrc = galleryItem[index].querySelector("img").getAttribute("data-source");
  lightBoxImg.src = imgSrc;
}

function closeModalWindow() {
  lightBoxImg.src = "";
  lightBox.classList.remove("is-open");
}

document
  .querySelector("div.lightbox__content")
  .addEventListener("click", event => {
    if (event.currentTarget !== event.target) {
      return;
    }
    closeModalWindow();
  });

closeButton.addEventListener("click", closeModalWindow);

document.onkeydown = event => {
  if (imgSrc) {
    if (event.code == "ArrowRight") {
      next();
    }
    if (event.code == "ArrowLeft") {
      prev();
    }
    if (event.code == "Escape") {
      closeModalWindow();
    }
  } else {
    return;
  }
};

function next() {
  if (index == galleryItem.length - 1) {
    index = 0;
  } else {
    index++;
  }
  changeImage();
}

function prev() {
  if (index == 0) {
    index = galleryItem.length - 1;
  } else {
    index--;
  }
  changeImage();
}
