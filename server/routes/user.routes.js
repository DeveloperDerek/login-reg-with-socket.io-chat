const userController = require("../controllers/user.controller");
const auth = require("../config/jwt.config");
const router = require("express").Router();

router.post("/users/create", userController.create);
router.post("/users/register", userController.register);

router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/logout2", userController.logout2);

// router.post("/addContact/:id", userController.addContact);
router.post("/reqContact1/:id", userController.reqContact1);
router.post("/reqContact2/:id", userController.reqContact2);
router.post("/updateUser1/:id", userController.updateUser1);
router.post("/updateUser2/:id", userController.updateUser2);

//these route has to be authenticated
router.get("/users/view", auth, userController.getAll);
router.get("/users/loggedin", auth, userController.getLoggedInUser);
router.get("/users/id/:id", auth, userController.getOne);
router.put("/users/update/:id", auth, userController.update);
router.delete("/users/delete/:id", auth, userController.delete);

module.exports = router;