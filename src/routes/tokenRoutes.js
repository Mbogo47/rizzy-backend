import { createToken, postStk } from "../controllers/tokenController.js";

const tokenRoutes = (app) => {
    app.route("/token")
        .post(createToken)
        .post(postStk);
}

export default tokenRoutes;