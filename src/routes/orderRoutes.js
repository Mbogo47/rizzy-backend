import {createOrder, getOrderById, getOrders, getOrdersByUser, updateOrder, deleteOrder} from '../controllers/ordersControllers.js'

const ordersRoutes = (app) => {
    app.route('/orders')
        .get(getOrders)
        .post(createOrder)
    app.route('/orders/:orderId')
        .get(getOrderById)
        .delete(deleteOrder)
        .put(updateOrder)
    app.route('/orders/users/:userId')
        .get(getOrdersByUser)
}

export default ordersRoutes