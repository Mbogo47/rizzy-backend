import sql from 'mssql';
import config from '../model/config.js';

export const getProducts = async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection.request().query('SELECT * FROM products.Products ');
        const products = result.recordset;
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
}

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection
            .request()
            .input('category', sql.NVarChar, category)
            .query('SELECT * FROM products.Products WHERE category = @category');
        const products = result.recordset;
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
}


// // create product
export const createProduct = async (req, res) => {
    const { productName, productDescription, productPrice, category, productImage  } = req.body;
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection
            .request()
            .input('productName', sql.NVarChar, productName)
            .input('productDescription', sql.NVarChar, productDescription)
            .input('productPrice', sql.Decimal, productPrice)
            .input('category', sql.NVarChar, category)
            .input('productImage', sql.NVarChar, productImage)
            .query('INSERT INTO products.Products (productName, productDescription, productPrice, category, productImage) VALUES (@productName, @productDescription, @productPrice, @category, @productImage)');

        res.status(200).json({ message: 'Product created successfully.' });
    } catch (error) {
        res.status(500).json({ error }); // You can uncomment this line if you want to send an error response.
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// update product
export const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { productName, productDescription, productPrice, category } = req.body;

    console.log(req.body); 
    let connection;
    try {
        connection = await sql.connect(config.sql);
        await connection
            .request()
            .input('productId', sql.Int, productId)
            .input('productName', sql.NVarChar, productName)
            .input('productDescription', sql.NVarChar, productDescription)
            .input('productPrice', sql.Decimal, productPrice)
            .input('category', sql.NVarChar, category)
            .query('UPDATE products.Products SET productName = @productName, productDescription = @productDescription, productPrice = @productPrice, category = @category WHERE productId = @productId');

        res.status(200).json({ message: 'Product updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the product.' });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};


// delete product
// delete product
export const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    let connection;
    try {
        connection = await sql.connect(config.sql);
        await connection
            .request()
            .input('productId', sql.Int, productId)
            .query('DELETE FROM products.Products WHERE productId = @productId');

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the product.' });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};
