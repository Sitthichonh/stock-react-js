const express = require("express");
const router = express.Router();
const user = require("./models/user");
const bcrypt = require("bcryptjs");
const constants = require("./constant");
const { use } = require("react");
const { where } = require("sequelize");

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    let result = await user.findOne ({ where: {username: username} });
    if(result != null){
        if(bcrypt.compareSync(password, result.password)){
            res.json({
                result: constants.kResultOk,
                massage: JSON.stringify(result)
            });
        }else{
            res.json({ result: constants.kResultNok, massage: "Incorrect password"});
        }
    }else{
        res.json({ result: constants.kResultNok, massage: "Incorrect username"});
    }
});

router.post("/register", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    // async/await
    let result = await user.create(req.body);
    res.json({ result: constants.kResultOk, massage: JSON.stringify(result) });

    // Promise without async/await
    // user.create(req.body).then(result=>{
    //     res.json({result: constants.kResultOk, massage: JSON.stringify(result)})
    // })
  } catch (error) {
    res.json({ result: constants.kResultNok, massage: JSON.stringify(result) });
  }
});

module.exports = router;
