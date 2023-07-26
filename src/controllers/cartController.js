import { Cart } from "../data/cart.js";

// Get all items in the cart
export const getCartItems = (req, res) => {
    res.status(200).json(Cart);
};

// Add an item to the cart
export const addToCart = (req, res) => {
    const { productName, quantity, price } = req.body;
    const newProductId = Cart.reduce((maxId, item) => (item.productId > maxId ? item.productId : maxId), 0) + 1;
    const newItem = { productId: newProductId, productName, quantity, price };
    Cart.push(newItem);
    res.status(201).json({ message: 'Item added to cart successfully.' });
};


// Update the quantity of an item in the cart
export const updateCartItemQuantity = (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    const itemToUpdate = Cart.find((item) => item.productId === parseInt(productId));

    if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        res.status(200).json({ message: 'Item quantity updated successfully.' });
    } else {
        res.status(404).json({ error: 'Item not found in cart.' });
    }
};

// Remove an item from the cart
export const removeFromCart = (req, res) => {
    const { productId } = req.params;
    const index = Cart.findIndex((item) => item.productId === parseInt(productId));

    if (index !== -1) {
        Cart.splice(index, 1);
        res.status(200).json({ message: 'Item removed from cart successfully.' });
    } else {
        res.status(404).json({ error: 'Item not found in cart.' });
    }
};
