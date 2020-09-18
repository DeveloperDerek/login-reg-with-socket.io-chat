const userController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

// app.MONGOOSE_FUNCTION("ROUTE", CONTROLLER_FUNCTION)
module.exports = (app) => {
    app.post("/api/users/create", userController.create);
    app.post("/api/users/register", userController.register);
    app.get("/api/users/:id", userController.getOne);
    app.put("/api/users/update/:id", userController.update);
    app.delete("/api/users/delete/:id", userController.delete);

    app.post("/api/login", userController.login);
    app.post("/api/logout", userController.logout);

    //this route has to be authenticated
    app.get("/api/users/view", authenticate, userController.getAll);
    app.get("/api/users/loggedin", authenticate, userController.getLoggedInUser);
};
