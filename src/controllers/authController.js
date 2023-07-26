import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sql from 'mssql';
import config from '../model/config.js';

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};


export const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    console.log('Request Payload:', { userName, email, password });
    const hashedPassword = await bcrypt.hash(password, 12);
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection
            .request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM customer.users WHERE email = @email');
        const existingUser = result.recordset[0];
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        await connection
            .request()
            .input('userName', sql.VarChar, userName) // Use 'username' as the parameter name
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .query(
                `INSERT INTO customer.users (userName, email, password)
        VALUES (@userName, @email, @password)`
            );

        res.status(201).json({ message: 'User created successfully', status: 'success' });
    } catch (error) {
        res.status(500).json({ error });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// CREATE ADMIN
export const createAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Request Payload:', { username, email, password });
    const hashedPassword = await bcrypt.hash(password, 12);
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection
            .request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM admin.Admins WHERE email = @email');
        const existingUser = result.recordset[0];
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        await connection
            .request()
            .input('username', sql.VarChar, username) // Use 'username' as the parameter name
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .query(
                `INSERT INTO admin.Admins (username, email, password)
        VALUES (@username, @email, @password)`
            );

        res.status(201).json({ message: 'User created successfully', status: 'success' });
    } catch (error) {
        res.status(500).json({ error });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// lOGIN ADMIN
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection
            .request()
            .query(`SELECT * FROM admin.Admins WHERE email = '${email}'`);
        const user = result.recordset[0];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid credentials" });
            } else {
                const token = `JWT ${jwt.sign(
                    { username: user.username, email: user.email },
                    config.jwt_secret
                )}`;
                res.status(200).json({
                    email: user.email,
                    username: user.username,
                    id: user.id,
                    token: token,
                });
            } 
        }
        console.log(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection
            .request()
            .query(`SELECT * FROM customer.users WHERE email = '${email}'`);
        const user = result.recordset[0];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid credentials" });
            } else {
                const token = `JWT ${jwt.sign(
                    { username: user.userName, email: user.email },
                    config.jwt_secret
                )}`;
                res.status(200).json({
                    email: user.email,
                    username: user.userName,
                    id: user.userId,
                    token: token,
                });
            }
        }
        console.log(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// Change Password
export const changePassword = async (req, res) => {
    const { email, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    let connection;
    try {
        connection = await sql.connect(config.sql);
        await connection
            .request()
            .input('email', sql.NVarChar, email)
            .query(`UPDATE customer.users SET password = @hashedPassword WHERE email = @email`);
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
};

// get all users
export const getAllUsers = async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(config.sql);
        const result = await connection.request().query('SELECT * FROM customer.users');
        res.status(200).json(result.recordset);
    }

    catch (error) {

        res.status(500).json({ error: error.message });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }

};

// delete user by id
export const deleteUserByEmail = async (req, res) => {
    const { email  } = req.params;
    let connection;
    try {
        connection = await sql.connect(config.sql);
        await connection
            .request()
            .input('email ', sql.Int, email)
            .query('DELETE FROM customer.users WHERE email = @email');
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    } finally {
        if (connection) {
            connection.close();
        }
    }
}