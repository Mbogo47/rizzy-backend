import { getProducts, getProductsByCategory, createProduct, updateProduct, deleteProduct } from '../controllers/productsController.js'

const productsRoutes = (app) => {
        app.route('/products')
                .get(getProducts)
                .post(createProduct)
        app.route('/products/:category')
                .get(getProductsByCategory)
        app.route('/products/:productId')
                .put(updateProduct)
                .delete(deleteProduct)
}

export default productsRoutes