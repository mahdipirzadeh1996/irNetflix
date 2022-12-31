const request = require('request');
const router = require("express").Router();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "irnetflix",
});

router.delete("/:phone", async (req, res) => {
    const phone = req.params.phone;

    const sqlDelete = "DELETE FROM `tbl_sms` WHERE `phone` = ?";
    try {
        await db.query(sqlDelete, [phone], (err, result) => {
            //res.send(result);
            if (err) console.log(err);
        });
        res.status(200).json("successDelete")
    } catch (e) {
        res.status(403).json("You are not allowed");
    }
});

module.exports = router;