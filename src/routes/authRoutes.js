import { changePassword, createAdmin, deleteUserByEmail, getAllUsers, loginAdmin, loginUser, registerUser } from "../controllers/authController.js";

const authRoutes = (app) => {
    app.route('/auth/login')
        .post(loginUser)
        
    app.route('/auth/register')
        .post(registerUser)
    app.route('/changePassword')
        .post(changePassword)

    app.route('/users')
        .get(getAllUsers)

    app.route('/users/:email')
        .delete(deleteUserByEmail)

    app.route('/auth/loginAdmin')
        .post(loginAdmin)
    app.route('/auth/createAdmin')
        .post(createAdmin)


}

export default authRoutes