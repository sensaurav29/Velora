const expess = require("express");
const router = expess.Router();

router.get("/", (req ,res ) => {
    res.send("hey it's working");
});

module.exports = router;