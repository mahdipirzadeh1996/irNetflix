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
    const code = req.body.code;

    console.log("object")

    const sqlSelect = "SELECT `code` FROM `tbl_sms` WHERE `phone`=" + String(phone);
    try {
        await db.query(sqlSelect, (err, result) => {
            // Decrypt
            if (result === undefined) {
                res.status(403).json("Wrong number");
            } else {
                const bytes = CryptoJs.AES.decrypt(result[0]["code"], process.env.SECRET_KEY);
                const originalCode = bytes.toString(CryptoJs.enc.Utf8);

                if (originalCode !== code) {
                    res.status(200).json("Failed");
                } else if (originalCode === code) {
                    res.status(200).json("Success")
                }
            }
        });
        //res.status(201).json("Success")
    } catch (e) {
        res.status(403).json(e);
    }
});

module.exports = router;