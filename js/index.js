// Creates random number
function getRandomInt() {
  min = Math.ceil(100);
  max = Math.floor(1000);
  return Math.floor(Math.random() * (max - min) + min);
}

// IS visible
const isVisible = function (element) {
  if (!(element.offsetParent === null)) return true;
  return false;
};

// Slider
const slider = function () {
  const sliderImg = [
    {
      id: 33,
      imgUrl: "img/banners/air_pods_max_banner.jpg",
    },
    {
      id: 32,
      imgUrl: "img/banners/airpods_pro_banner.png",
    },
    {
      id: 29,
      imgUrl: "img/banners/apple_tv_banner.png",
    },
    {
      id: 34,
      imgUrl: "img/banners/ipad_air_banner.jpg",
    },
    {
      id: 18,
      imgUrl: "img/banners/iphone_12_banner.jpg",
    },
    {
      id: 6,
      imgUrl: "img/banners/mac_book_banner.jpg",
    },
    {
      id: 13,
      imgUrl: "img/banners/watch_banner.jpg",
    },
  ];

  sliderImg.forEach((img) => {
    const sliderWrapper = document.createElement("div");
    sliderWrapper.className = "slider-wrapper";
    sliderWrapper.innerHTML = `<img src="${img.imgUrl}" alt="baner_#${img.id}" style="max-width: 1000px;">
        <button class="addFromBannerBtn add-to-cart" data-id="${img.id}">Add to cart</button>`;
    document.querySelector(".slider").appendChild(sliderWrapper);
  });
};
slider();

// Renders card
const renderCard = function (element) {
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "card-wrapper";
  cardWrapper.innerHTML = `<div class="card" data-id=${element.id}>
        <div class="flex-wrapper">
            <div class="like like-empty"></div>
            <div class="picture">
                <img src="img/${element.imgUrl}" alt="device picture">
            </div>
        </div>
        <div class="flex-wrapper">
            <div class="name">${element.name}</div>
            <div class="remainder">
                ${(function () {
                  if (element.orderInfo.inStock >= 1)
                    return '<div class="remainder-icon-available"></div>';
                  else return '<div class="remainder-icon-unavailable"></div>';
                })()}
                <span class="remainder-text"><span class="remainder-number">${
                  element.orderInfo.inStock
                }</span> left in stock</span>
            </div>
            <div class="price">Price: <span>${element.price}</span> $</div>
            <div class="button-wrapper">
                ${(function () {
                  if (element.orderInfo.inStock >= 1)
                    return `<button class="add-from-card-btn add-to-cart" data-id=${element.id}>Add to cart</button>`;
                  else
                    return '<button class="add-from-card-btn-disabled">Add to cart</button>';
                })()}
            </div>
        </div>
    </div>
    <div class="card-footer">
        <div class="review-wrapper">
            <div class="like-red">
                <img src="img/icons/like_filled.svg" alt="like_filled">
            </div>
            <div class="positive-reviews"><span>${
              element.orderInfo.reviews
            }%</span>Positive reviews<br>Above avarage</div>
        </div>
        <div class="orders"><span>${getRandomInt()}</span><br>orders</div>
    </div>`;
  return cardWrapper;
};

// Fills store
const fillStore = function (elements) {
  const itemList = document.querySelector(".item-list");
  itemList.innerHTML = "";
  elements.forEach((element) => {
    document.querySelector(".item-list").appendChild(renderCard(element));
  });

  if (isVisible(document.querySelector(".accordion-filter"))) {
    itemList.style.width = "64%";
    document.querySelectorAll(".card-wrapper").forEach((card) => {
      card.style.width = "45%";
    });
  }
};
fillStore(items);

// Render modale
const renderModal = function (item, orders) {
  const modalWindow = document.createElement("div");
  modalWindow.className = "modal-window";
  modalWindow.innerHTML = `
    <div class="modal-picture">
        <img src="img/${item.imgUrl}" alt="item picture">
    </div>
    <div class="modal-details">
        <p class="name">${item.name}</p>
        <div class="modal-review-wrapper">
            <div class="review-sectio">
                <div class="like-red">
                    <img src="img/icons/like_filled.svg" alt="like_filled">
                </div>
                <div class="positive-reviews"><span>${
                  item.orderInfo.reviews
                }%</span>Positive reviews<br>Above avarage</div>
            </div>
            <div class="orders"><span>${orders}</span><br>orders</div>
        </div>
        <p>Color: <span>${item.color}</span></p>
        <p>Operating System: <span>${item.os}</span></p>
        <p>Chip: <span>${item.chip.name}</span></p>
        <p>Height: <span>${item.size.height} cm</span></p>
        <p>Width: <span>${item.size.width} cm</span></p>
        <p>Depth: <span>${item.size.depth} cm</span></p>
        <p>Weight: <span>${item.size.weight} g</span></p>
        <div class="price"></div>
    </div>
    <div class="modale-price">
        <div class="amount">$ ${item.price}</div>
        <div class="remainder">Stock: ${item.orderInfo.inStock} pcs</div>
        ${(function () {
          if (item.orderInfo.inStock >= 1)
            return `<button class="add-to-cart" data-id="${item.id}">Add to cart</button>`;
          else return '<button class="disabled">Add to cart</button>';
        })()}
    </div>
    `;
  return modalWindow;
};
const getMaxAndMinPrice = function () {
  const tmpPriceArr = [];
  items.forEach((element) => {
    tmpPriceArr.push(element.price);
  });

  const maxPrice = Math.max(...tmpPriceArr);
  const minPrice = Math.min(...tmpPriceArr);

  return [minPrice, maxPrice];
};

// Render single item
const addProductToCart = function (item) {
  const productWrapper = document.createElement("div");
  productWrapper.className = "product-wrapper";
  productWrapper.innerHTML = `<div class="product-img">
        <img src="img/${item.product.imgUrl}" alt="item picture">
    </div>
    <div class="product-name-price">
        <div class="product-name">
            <p>${item.product.name}</p>
        </div>
        <div class="product-price">
            <p>$${item.product.price}</p>
        </div>
    </div>
    <div class="action-block">
        <div class="left" data-id="${item.product.id}">
            ${(function () {
              if (item.amount === 1)
                return '<div class="disabled-arrow"><img src="img/icons/disabled_arrow_left.svg" alt="arrow left"></img></div>';
              else
                return '<img src="img/icons/arrow_left.svg" alt="arrow left"></img>';
            })()}
        </div>
        <div class="amount">${item.amount}</div>
        <div class="right" data-id="${item.product.id}">
            ${(function () {
              if (item.amount >= 4)
                return '<div class="disabled-arrow"><img src="img/icons/disabled_arrow_right.svg" alt="arrow right"></img></div>';
              else
                return '<img src="img/icons/arrow_right.svg" alt="arrow right"></img>';
            })()}
        </div>
        <div class="remove" data-id="${item.product.id}">
            <img src="img/icons/remove.svg" alt="remove">
        </div>
    </div>`;
  renderTotals();
  return productWrapper;
};

const renderTotals = function () {
  const totals = totalsInCart();
  const renderTotalAmmount = document.querySelector(".total-amount p span");
  renderTotalAmmount.innerHTML = `${totals[0]} ptc`;

  const renderTotalPrice = document.querySelector(".total-price p span");
  renderTotalPrice.innerHTML = `${totals[1]}$`;
};

let cartArr = [];

const getMacOutletLocalStorage = function () {
  return JSON.parse(localStorage.getItem("cart"));
};

const setMacOutletLocalStorage = function () {
  localStorage.setItem("cart", JSON.stringify(cartArr));
};

const fillCart = function (arr) {
  const cartNumber = document.querySelector(".cart .number");
  const productsWrapper = (document.querySelector(
    ".products-wrapper"
  ).innerHTML = "");
  document.querySelector(".products-wrapper").append(productsWrapper);
  arr.forEach((elem) => {
    document
      .querySelector(".products-wrapper")
      .appendChild(addProductToCart(elem));
  });
  cartNumber.innerHTML = totalsInCart()[0];
  cartNumber.style.display = "Block";
  setMacOutletLocalStorage();
  if (arr.length === 0) {
    setMacOutletLocalStorage();
    renderTotals();
    cartNumber.style.display = "None";
  }
};

// Click event.
const param = {};
window.onclick = (e) => {
  // Closes cart
  console.log(e.target.className);
  const opnCart = document.querySelector(".cart-opened");
  if (
    isVisible(opnCart) &&
    e.target.className != "cart-icon" &&
    e.target.className != "number"
  ) {
    if (e.target.closest(".cart-opened") === opnCart) {
      opnCart.style.display = "Block";
    } else {
      opnCart.style.display = "None";
    }
  }

  const backShadow = document.querySelector(".back-shadow");
  //  like/unlike
  if (e.target.className.includes("like")) {
    const likeElem = e.target;
    if (likeElem.className.includes("like-filled"))
      likeElem.className = "like like-empty";
    else likeElem.className = "like like-empty like-filled";
  }
  // Adds item to card
  else if (e.target.className.includes("add-to-cart")) {
    items.forEach((el) => {
      if (Number(e.target.getAttribute("data-id")) === el.id) {
        let isNew = true;
        cartArr.forEach((addedIem) => {
          if (addedIem.id === el.id) {
            if (addedIem.amount < 4) {
              isNew = false;
              ++addedIem.amount;
            } else {
              isNew = false;
            }
          }
        });
        if (isNew) {
          cartArr.push({
            id: el.id,
            amount: 1,
            product: el,
          });
        }
      }
    });
    fillCart(cartArr);
  }
  // Open modal
  else if (e.target.closest(".card-wrapper")) {
    const CardWrapper = e.target.closest(".card-wrapper");
    backShadow.style.display = "block";
    document.body.style.overflow = "hidden";
    document
      .querySelector(".back-shadow")
      .appendChild(
        renderModal(
          items[CardWrapper.firstChild.getAttribute("data-id") - 1],
          CardWrapper.querySelector(".orders span").innerHTML
        )
      );
  }
  // Close modal
  else if (e.target.className.includes("back-shadow")) {
    backShadow.style.display = "none";
    document.body.style.overflow = "visible";
  }

  if (e.target.parentNode.className === "left") {
    const productID = Number(e.target.parentNode.getAttribute("data-id"));
    cartArr.forEach((elem) => {
      if (elem.product.id === productID && elem.amount > 1) {
        elem.amount--;
      }
    });
    fillCart(cartArr);
  } else if (e.target.parentNode.className === "right") {
    const productID = Number(e.target.parentNode.getAttribute("data-id"));
    cartArr.forEach((elem) => {
      if (elem.product.id === productID) {
        elem.amount++;
      }
    });
    fillCart(cartArr);
  } else if (e.target.parentNode.className === "remove") {
    const productID = Number(e.target.parentNode.getAttribute("data-id"));
    cartArr = cartArr.filter((item) => item.product.id != productID);
    fillCart(cartArr);
  }

  r;
  if (e.target.type === "checkbox") {
    let value = e.target.nextElementSibling.innerHTML;
    let key = e.target
      .closest(".panel")
      .previousElementSibling.querySelector("button.accordion").innerText;
    if (!Object.keys(param).includes(key)) param[key] = [value];
    else if (Object.keys(param).includes(key) && !param[key].includes(value))
      param[key].push(value);
    else if (param[key].includes(value))
      param[key] = param[key].filter((elem) => elem != value);
    runFilter(items, param);
  }
};

window.oninput = (e) => {
  if (e.target.className === "search") {
    param.search = e.target.value.trim().toLowerCase();
    runFilter(items, param);
  }
};

const totalsInCart = function () {
  let totalAmount = 0;
  let totalPrice = 0;

  cartArr.forEach((el) => {
    totalAmount += el.amount;
    totalPrice += el.product.price * el.amount;
  });

  return [totalAmount, totalPrice];
};

window.onchange = (e) => {
  if (e.target.type === "number") {
    let fromPrice = getMaxAndMinPrice()[0];
    let toPrice = getMaxAndMinPrice()[1];
    if (e.target.className === "from") {
      if (e.target.value === "") {
        param.fromPrice = null;
      } else if (e.target.value < fromPrice) {
        param.fromPrice = fromPrice;
        e.target.value = fromPrice;
      } else if (
        document.querySelector(".to").value !== "" &&
        e.target.value > Number(document.querySelector(".to").value)
      ) {
        param.fromPrice = Number(document.querySelector(".to").value);
        e.target.value = param.fromPrice;
      } else if (e.target.value > toPrice) {
        param.fromPrice = toPrice;
        e.target.value = toPrice;
      } else {
        param.fromPrice = Number(e.target.value);
      }
      runFilter(items, param);
    }
    if (e.target.className === "to") {
      if (e.target.value === "") {
        param.toPrice = null;
      } else if (e.target.value > toPrice) {
        param.toPrice = toPrice;
        e.target.value = toPrice;
      } else if (
        document.querySelector(".from").value !== "" &&
        e.target.value < Number(document.querySelector(".from").value)
      ) {
        param.toPrice = Number(document.querySelector(".from").value);
        e.target.value = param.toPrice;
      } else if (e.target.value < fromPrice) {
        param.toPrice = fromPrice;
        e.target.value = fromPrice;
      } else {
        param.toPrice = Number(e.target.value);
      }
    }
    runFilter(items, param);
  }
};

const runFilter = function (allGoods, param) {
  let filteredItem = [];
  allGoods.forEach((product) => {
    let isSearch = true;
    let isFromPriceSet = true;
    let isToPriceSet = true;
    let isColorSet = true;
    let isMemorySet = true;
    let isOsSet = true;
    let isDisplaySet = true;

    if (param["search"] && param["search"] !== "") {
      isSearch = false;
      if (product.name.toLowerCase().includes(param["search"])) isSearch = true;
    }
    if (param["fromPrice"] && param["fromPrice"] !== null) {
      isFromPriceSet = false;
      if (product.price >= param["fromPrice"]) isFromPriceSet = true;
    }

    if (param["toPrice"] && param["toPrice"] !== null) {
      isToPriceSet = false;
      if (product.price <= param["toPrice"]) isToPriceSet = true;
    }

    if (param["Color"] && param["Color"].length) {
      isColorSet = false;
      param["Color"].forEach((color) => {
        if (product.color.includes(color)) isColorSet = true;
      });
    }
    if (param["Memory"] && param["Memory"].length) {
      isMemorySet = false;
      param["Memory"].forEach((memory) => {
        if (memory.replace(" Gb", "") === String(product.storage))
          isMemorySet = true;
        if (memory.replace(" TB", "").length === 1) {
          if (memory.replace(" TB", "") * 1024 === product.storage)
            isMemorySet = true;
        }
      });
    }
    if (param["OS"] && param["OS"].length) {
      isOsSet = false;
      if (param["OS"].includes(product.os)) isOsSet = true;
    }
    if (param["Display"] && param["Display"].length) {
      isDisplaySet = false;
      let minDisplay = null;
      let maxDisplay = null;
      param["Display"].forEach((display) => {
        if (display === "+16 inch") {
          minDisplay = 16;
          maxDisplay = 16;
        } else {
          minDisplay = display.split("-")[0];
          maxDisplay = display.split("-")[1].split(" ")[0];
        }
        if (product.display >= minDisplay && product.display < maxDisplay)
          isDisplaySet = true;
      });
    }
    if (
      isSearch &&
      isFromPriceSet &&
      isToPriceSet &&
      isColorSet &&
      isMemorySet &&
      isOsSet &&
      isDisplaySet
    )
      filteredItem.push(product);
  });
  fillStore(filteredItem);
};

//  menu.
const acc = document.getElementsByClassName("section-wrapper");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    this.firstElementChild.classList.toggle("active");

    var arrow = this.lastElementChild;
    this.lastElementChild.classList.toggle("opened");

    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// Opens filter.
const filterIcon = document.querySelector(".filter-icon");
const accordionFilter = document.querySelector(".accordion-filter");
const itemList = document.querySelector(".item-list");
filterIcon.onclick = function () {
  if (isVisible(accordionFilter)) {
    accordionFilter.style.display = "none";
    itemList.style.width = "100%";
    document
      .querySelectorAll(".card-wrapper")
      .forEach((element) => (element.style.width = "30%"));
  } else {
    accordionFilter.style.display = "block";
    itemList.style.width = "64%";
    document
      .querySelectorAll(".card-wrapper")
      .forEach((element) => (element.style.width = "45%"));
  }
};

// Gets all available  color.
const getColor = function (elements) {
  let result = [];
  const tmpCollorsArr = elements.map((elem) => elem.color);

  tmpCollorsArr.forEach((colors) => {
    colors.forEach((color) => {
      if (!result.includes(color)) result.push(color);
    });
  });

  return result;
};

const renderColorCheckbox = function (color) {
  const colorCheckboxWrapper = document.createElement("div");
  colorCheckboxWrapper.className = "color-wrapper";
  colorCheckboxWrapper.innerHTML = `
    <input type="checkbox">
    <div class="color-name">${color}</div>`;
  return colorCheckboxWrapper;
};

// Fills filter by rendered color checkboxes.
const fillColorFlter = function (elements) {
  elements.forEach((element) => {
    document
      .querySelector(".color-panel-wrapper")
      .appendChild(renderColorCheckbox(element));
  });
};

fillColorFlter(getColor(items));

const memoryFilterArr = [
  "32 Gb",
  "64 Gb",
  "128 Gb",
  "256 Gb",
  "512 Gb",
  "1 TB",
  "2 TB",
  "4 TB",
];

// Renders memory
const renderMemoryCheckbox = function (memory) {
  const memoryCheckboxWrapper = document.createElement("div");
  memoryCheckboxWrapper.className = "memory-wrapper";
  memoryCheckboxWrapper.innerHTML = `
    <input type="checkbox">
    <div class="memory-name">${memory}</div>`;
  return memoryCheckboxWrapper;
};

// Fills filter by rendered
const fillMemoryFlter = function (elements) {
  elements.forEach((element) => {
    document
      .querySelector(".memory-panel-wrapper")
      .appendChild(renderMemoryCheckbox(element));
  });
};

fillMemoryFlter(memoryFilterArr);

// Gets all available devices
const getOs = function (elements) {
  const tmpOsArr = elements.map((elem) => elem.os);
  const result = [];
  tmpOsArr.forEach((os) => {
    if (!result.includes(os)) result.push(os);
  });

  return result;
};

// Renders OS checkbox
const renderOsCheckbox = function (os) {
  const osCheckboxWrapper = document.createElement("div");
  osCheckboxWrapper.className = "os-wrapper";
  osCheckboxWrapper.innerHTML = `
    <input type="checkbox">
    <div class="os-name">${os}</div>`;
  return osCheckboxWrapper;
};

// Fills filter by .
const fillOsFlter = function (elements) {
  elements.forEach((element) => {
    document.querySelector(".os-panel").appendChild(renderOsCheckbox(element));
  });
};

fillOsFlter(getOs(items));

const displayFilterArr = [
  "2-5 inch",
  "5-7 inch",
  "7-12 inch",
  "12-16 inch",
  "+16 inch",
];

// Renders display checkbox in the filter
const renderDisplayCheckbox = function (display) {
  const displayCheckboxWrapper = document.createElement("div");
  displayCheckboxWrapper.className = "display-wrapper";
  displayCheckboxWrapper.innerHTML = `
    <input type="checkbox">
    <div class="memory-name">${display}</div>`;
  return displayCheckboxWrapper;
};

// Fills filter by rendered display checkboxes.
const fillDisplayFlter = function (elements) {
  elements.forEach((element) => {
    document
      .querySelector(".panel-filter-display")
      .appendChild(renderDisplayCheckbox(element));
  });
};

fillDisplayFlter(displayFilterArr);

// Opens/closes cart by clicking on the cart icoon.
const cartIcon = document.querySelector(".top .cart");
cartIcon.onclick = function () {
  const openedCart = document.querySelector(".cart-opened");
  if (isVisible(openedCart)) {
    openedCart.style.display = "none";
  } else {
    openedCart.style.display = "block";
  }
};

if (getMacOutletLocalStorage()) {
  cartArr = getMacOutletLocalStorage();
  fillCart(cartArr);
}
