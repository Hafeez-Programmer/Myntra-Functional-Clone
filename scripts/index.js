let bagItems;
onload();

function onload() {
  let bagItemsStr = localStorage.getItem('myntra_bag_items');
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItems();
  displayBagCount();
}

function displayItems() {
  let itemsContainerElement = document.querySelector('.items-container');

  if (!itemsContainerElement) {
    return;
  }
  
  let innerHTML = '';

  items.forEach(item => {
    innerHTML += `
      <div class="item-container">
        <img class="item-image" src="${item.image}" alt="item image">
        <div class="rating">
          ${item.rating.stars} ⭐ | ${item.rating.count}
        </div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-bag" onclick="
          addToBag(${item.id});
          displayBagCount();
        ">Add to Bag</button>
      </div>
    `
  })

  itemsContainerElement.innerHTML = innerHTML;
}

function addToBag(itemID) {
  bagItems.push(itemID);
  localStorage.setItem('myntra_bag_items', JSON.stringify(bagItems));
}

function displayBagCount() {
  let bagCountElement = document.querySelector('.bag-item-count');

  if (bagItems.length) {
    bagCountElement.style.visibility = 'visible';
    bagCountElement.innerHTML = bagItems.length;
  } else {
    bagCountElement.style.visibility = 'hidden';
  }
}


