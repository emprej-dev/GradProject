// backend/models/orderModel.js
class Order {
  constructor(items, totalPrice) {
    this.items = items;
    this.totalPrice = totalPrice;
    this.date = new Date();
  }
}

module.exports = Order;