const router = require("express").Router();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "irnetflix",
});

router.post("/", async (req, res) => {
    const phone = req.body.phone;

    const sqlInsert = "INSERT INTO `tbl_user`(`phone`) VALUES (?)";

    try {
        await db.query(sqlInsert, [phone], (err, result) => {
            if (err) {
                if (err.errno === 1062) {
                    res.status(200).json("Login");
                }
            } else {
                res.status(201).json("Register");
            }
        });
    } catch (e) {
        res.status(403).json(e);
    }
});

module.exports = router;