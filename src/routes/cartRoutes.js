import {getCartItems, removeFromCart, updateCartItemQuantity, addToCart} from '../controllers/cartController.js'

const cartRoutes = (app) => {
    app.route('/cart')
        .get(getCartItems)
        .post(addToCart)
    app.route('/cart/:productId')
        .put(updateCartItemQuantity)
        .delete(removeFromCart)
}

export default cartRoutes