const request = require('request');
const router = require("express").Router();
const mysql = require('mysql');
const CryptoJs = require("crypto-js");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "irnetflix",
});

router.post("/", async (req, res) => {
    const phone = req.body.phone;

    const sqlSelect = "SELECT * FROM `tbl_user` WHERE `phone`=" + String(phone);
    try {
        await db.query(sqlSelect, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result === undefined) {
                    res.status(200).json("Wrong number");
                } else {
                    //res.status(200).json(result[0]['phone']);
                    if (String(result) !== "")
                        res.status(200).json(result);
                    else
                        res.status(200).json("not found");
                }
            }
        });
    } catch (e) {
        res.status(403).json(e);
    }
});

module.exports = router;