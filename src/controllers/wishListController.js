import sql from "mssql";
import { config } from "../db/config.js";
import crypto from "crypto";

const pool = new sql.ConnectionPool(config.sql);
await pool.connect();

const checkIfUserExists = async (email) => {
    const user = await pool
        .request()
        .input("email", sql.VarChar, email)
        .query("SELECT * FROM customer.users WHERE email = @email");

    if (user.recordset.length === 0) return false;
    return true;
};

const userOwnsWishAlready = async (productId, email) => {
    const wish = await pool
        .request()
        .input("email", sql.VarChar, email)
        .input("productId", sql.VarChar, productId)
        .query(
            "SELECT * FROM wish WHERE productId = @productId AND email = @email"
        );
    if (wish.recordset.length > 0) return true;
    return false;
};

export const createWish = async (req, res) => {
    const { email, product_id } = req.params;
    if (await checkIfUserExists(email)) {
        if (await userOwnsWishAlready(productId, email))
            return res
                .status(200)
                .json({ message: "You already have these product in your wish" });
        try {
            const WishId = crypto.randomUUID();
            const createWish = await pool
                .request()
                .input("wishId", sql.VarChar, WishId)
                .input("email", sql.VarChar, email)
                .input("productId", sql.VarChar, productId)
                .query(
                    "INSERT  INTO wish (wishId, email, productId) VALUES (@wishId, @email, @productId)"
                );
            console.log(createWish);
            res.status(200).json({ message: "Added to wish successfully" });
        } catch (e) {
            res.status(500).json(e.message);
        }
    } else {
        res.status(401).json({ message: "Forbidden, user does not exist" });
    }
};

export const getwishForUser = async (req, res) => {
    const { email } = req.params;
    if (await checkIfUserExists(email)) {
        const wish = await pool
            .request()
            .input("email", sql.VarChar, email)
            .query("SELECT * FROM wish WHERE email = @email");
        const wishArray = wish.recordset;
        const allwish = [];
        for (let i = 0; i < wishArray.length; i++) {
            const currentWish = await pool
                .request()
                .input("productId", sql.VarChar, wishArray[i].productId)
                .query("SELECT * FROM product WHERE product_id = @productId");
            const currentWishData = currentWish.recordset[0];
            const currentWishId = {
                wish_id: wishArray[i].wish_id,
            };
            const currentWishFull = Object.assign(
                {},
                currentWishData,
                currentWishId
            );
            allwish.push(currentWishFull);
        }
        res.status(200).json(allwish);
    } else {
        res.status(401).json({ message: "User does not exist" });
    }
};

export const deleteWish = async (req, res) => {
    const {WishId } = req.params;
    try {
        const dltWish = await pool
            .request()
            .input("WishId", sql.VarChar, WishId)
            .query("DELETE FROM wish WHERE WishId = @WishId");
        res.status(200).json({ message: "Removed from wish successfully" });
    } catch (e) {
        res.status(500).json(e.message);
    }
};