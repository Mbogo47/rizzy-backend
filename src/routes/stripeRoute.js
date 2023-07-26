import { stripeCheckout } from "../controllers/stripeController.js"

const stripe = (app) => {
    app.route('/stripe').post(stripeCheckout)
}

export default stripe