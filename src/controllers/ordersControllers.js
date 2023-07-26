import { orders } from "../data/orders.js";

// get all orders
export const getOrders = (req, res) => {
    res.status(200).json(orders);
}

// get orders for a specific user
export const getOrdersByUser = (req, res) => {
    const { userId } = req.params;
    const filteredOrders = orders.filter(order => order.userId === parseInt(userId));
    res.status(200).json(filteredOrders);
}

// get a specific order
export const getOrderById = (req, res) => {
    const { orderId } = req.params;
    const order = orders.find(order => order.orderId === parseInt(orderId));
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
}


// create a new order
export const createOrder = (req, res) => {
    const { userId, totalAmount, items } = req.body;
    const newOrder = {
        orderId: orders.length + 1,
        userId,
        created_at: new Date().toISOString(),
        totalAmount,
        items
    }
    orders.push(newOrder);
    res.status(201).json({ message: "order created successfully" });
}

// update an order
export const updateOrder = (req, res) => {
    const { orderId } = req.params;
    const { userId, totalAmount, items } = req.body;
    const order = orders.find(order => order.orderId === parseInt(orderId));
    if (order) {
        order.userId = userId;
        order.totalAmount = totalAmount;
        order.items = items;
        res.status(200).json({ message: "Order updated successfully" });
    } else {
        res.status(404).json({ message: "Order not found" });
    }
}

// delete an order
export const deleteOrder = (req, res) => {
    const { orderId } = req.params;
    const order = orders.find(order => order.orderId === parseInt(orderId));
    if (order) {
        orders.splice(orders.indexOf(order), 1);
        res.status(200).json({ message: "Order deleted" });
    } else {
        res.status(404).json({ message: "Order not found" });
    }
}