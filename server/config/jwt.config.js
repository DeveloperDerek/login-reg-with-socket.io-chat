const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    try {   
        if (!token)
            return res.status(401).json({ msg: "No authentication token, authorization denied" })
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified)
            return res.status(401).json({ msg: "Token verification failed, authorization denied"})
        req.user = verified.id;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = auth;

// From Neil's GitHub
// module.exports = {
//     authenticate(req, res, next) {
//         console.log("this is jwt info");
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