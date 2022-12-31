const router = require("express").Router();
const mongoose = require("mongoose")
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const verify = require("../verifyToken");
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "irnetflix",
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        }

        try {
            mongoose.set('useFindAndModify', false);
            const updatedUser = await User.findByIdAndUpdate(req.user.id, {
                $set: req.body,
            }, { new: true }
            )
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can update only your account");
    }
});

//DELETE
router.delete("/:phone", verify, async (req, res) => {
    const phone = req.params.phone;
    const sqlDelete = "DELETE FROM `tbl_sms` WHERE `phone` = ?";

    if (req.user.phone === req.params.phone || req.user.isAdmin) {
        try {
            db.query(sqlDelete, [phone], (err, result) => {
                //res.send(result);
                if (err) console.log(err);
            });
            res.status(200).json("successDelete");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can delete only your account");
    }
});

//GET
router.get("/find/:id", async (req, res) => {
    try {
        mongoose.set('useFindAndModify', false);
        const user = await User.findById(req.params.id);

        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    const sqlSelect = "SELECT * FROM `tbl_user`";

    if (req.user.isAdmin) {
        try {
            db.query(sqlSelect, (err, result) => {
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

            // mongoose.set('useFindAndModify', false);
            // const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
            // res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed to see all users!");
    }
})

//GET USER STATS
router.get("/stats", async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            }, {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;