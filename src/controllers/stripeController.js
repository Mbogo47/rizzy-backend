import Stripe from 'stripe';
import config from '../model/config.js';
const stripe = Stripe(config.stripe_key)
const client = config.client_url

export const stripeCheckout = async (req, res) => {
    const cartItems = req.body.cartItems.map((cartItem) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: cartItem.productName,
                    images: [cartItem.productImage], 
                    description: cartItem.productDescription,
                    metadata: {
                        id: cartItem.productId
                    }
                },
                unit_amount: cartItem.productPrice * 100
            },
            quantity: cartItem.cartQuantity
        };
    });


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["US", "CA", "KE"],
        },
        phone_number_collection: {
            enabled: true,
        },
        line_items: cartItems, 
        mode: 'payment',
        success_url: `${client}/checkout`,
        cancel_url: `${client}/cart`,
    });


    res.send({ url: session.url });
};