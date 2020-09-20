const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.cookies.usertoken;
    console.log(token);
    if (!token)
        return res.status(401).json({ msg: "No authentication token, authorization denied" })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({verified: false});
         //Incase of expired jwt or invalid token kill the token and clear the cookie
        // res.clearCookie("token");
        // return res.status(400).send(err.message);
    }
};

module.exports = auth;

// From Neil's GitHub
// module.exports = {
//     auth(req, res, next) {
//         console.log(req.cookies.usertoken);
//         jwt.verify(
//             req.cookies.usertoken,
//             process.env.JWT_SECRET,
//             (err, payload) => {
//                 if (err) {
//                     res.status(401).json({ verified: false });
//                 } else {
//                     next();
//                 }
//             }
//         );
//     },
// };