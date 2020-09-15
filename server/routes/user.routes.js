const userController = require("../controllers/user.controller");

// Format:
// app.MONGOOSE_FUNCTION("ROUTE", CONTROLLER_FUNCTION)
module.exports = (app) => {
    app.post("/api/users/create", userController.create);
    app.get("/api/users/view", userController.getAll);
    app.get("/api/users/:id", userController.getOne);
    app.put("/api/users/update/:id", userController.update);
    app.delete("/api/users/delete/:id", userController.delete);
};
