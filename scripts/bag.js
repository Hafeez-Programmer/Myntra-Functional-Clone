let bagItemObjs;
const CONVENIENCE_FEE = 99;

onload();

function onload() {
  displayBagCount();
  createBagObjects();
  displayBagItems();
  displayBagSummary();
}

function displayBagItems() {
  let bagItemsElement = document.querySelector('.bag-items-container');
  let innerHTML = '';

  bagItemObjs.forEach(item => {
    innerHTML += bagItemHtml(item);
  })

  bagItemsElement.innerHTML = innerHTML; 
}

function createBagObjects() {
  bagItemObjs = bagItems.map(itemID => {
    for(let i = 0; i < items.length; i++) {
      if (itemID == items[i].id) {
        return items[i];
      }
    }
  });
}

function bagItemHtml(item) {
  return `
    <div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="../${item.image}">
      </div>
      <div class="item-right-part">
        <div class="company">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
        </div>
        <div class="return-period">
          <span class="return-period-days">${item.return_period} days</span> return available
        </div>
        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">${item.delivery_date}</span>
        </div>
      </div>

      <div class="remove-from-cart" onclick="
      removeBagItem(${item.id});      
      ">X</div>
    </div>
  `
}

function removeBagItem(itemID) {
  bagItems = bagItems.filter(bagItemID => bagItemID != itemID);
  localStorage.setItem('myntra_bag_items', JSON.stringify(bagItems));
  alert("Item has been removed from your cart Successfully✅");
  onload();
}

function displayBagSummary() {
  let totalMRP = 0;
  let discount = 0;
  let totalAmount;

  bagItemObjs.forEach(item => {
    totalMRP += item.original_price;
    discount += (item.original_price - item.current_price);
  })

  if (bagItemObjs) {
    totalAmount = (totalMRP - discount + CONVENIENCE_FEE);
  } else {
    totalAmount = 0;
  }

  let bagSummaryElement = document.querySelector('.bag-summary');
  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${bagItems.length} Items) </div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">Rs${totalMRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-Rs${discount}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">Rs ${CONVENIENCE_FEE}</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">Rs ${totalAmount}</span>
      </div>
    </div>
    <button class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
    </button>`
}




