const express = require("express");
const router = express.Router()

router.get("/product", (req, res)=>{
    res.json({result: "product"})
})


module.exports = router;