const router = require("express").Router();
const mongoose = require("mongoose")
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

const mysql = require('mysql');
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "irnetflix",
});

const imgStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const {
            body: { imgName }
        } = req;
        const fileType = path.extname(file.originalname);
        cb(null, imgName + '-' + Date.now() + fileType);
    }
});

//CREATE
// router.post("/", verify, async (req, res) => {
//     if (req.user.isAdmin) {
//         const newMovie = new Movie(req.body);

//         try {
//             const savedMovie = await newMovie.save();
//             res.status(201).json(savedMovie);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     } else {
//         res.status(403).json("You are not allowed");
//     }
// });
router.post("/", async (req, res) => {
    const imgUpload = multer({ storage: imgStorage }).any();

    imgUpload(req, res, async (err) => {
        if (err) {
            return res.status(500).json("Wrong " + err);
        }
        //console.log(req.files[0].path);
        const sqlInsert = "INSERT INTO `tbl_movie`(`title`, `desc`, `img`, `imgTrailer`, `imgSm`, `imgMob`, `imgTrailerMob`, `trailer`, `video`, `sub`, `year`, `limit`, `genre`, `isSeries`, `published`, `imdb`, `directors`, `writters`, `stars`, `boxOffice`, `budget`, `language`, `country`, `duration`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
        const movie = JSON.parse(req.body.movie);
        try {
            await db.query(sqlInsert, [movie.title, movie.desc, String(req.files[0].filename), String(req.files[1].filename), String(req.files[2].filename), String(req.files[3].filename), String(req.files[4].filename), movie.trailer, movie.video, movie.sub, parseInt(movie.year), parseInt(movie.limit), movie.genre, parseInt(movie.isSeries), parseInt(movie.isPublish), movie.imdb, movie.directors, movie.writters, movie.stars, movie.boxOffice, movie.budget, movie.language, movie.country, movie.duration], (err, result) => {
                //res.send(result);
                if (err) {
                    fs.unlink(req.files[0].path, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }

                        //file removed
                    });
                    fs.unlink(req.files[1].path, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }

                        //file removed
                    });
                    fs.unlink(req.files[2].path, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }

                        //file removed
                    });
                    fs.unlink(req.files[3].path, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }

                        //file removed
                    });
                    return res.status(500).json("Same data");
                }
                const x = res.statusCode;
                if (String(x) === "200") {
                    return res.status(201).send("Success");
                }
            });
        } catch (e) {
            res.status(403).json(e);
        }
    });
});
// router.post("/", async (req, res) => {
//     const phone = req.body.phone;
//     const code = String(between(100000, 999999));

//     const sqlInsert = "INSERT INTO `tbl_sms`(`phone`, `code`) VALUES (?, ?)";
//     cryptedCode = CryptoJs.AES.encrypt(code, process.env.SECRET_KEY).toString();

//     try {
//         await db.query(sqlInsert, [phone, cryptedCode], (err, result) => {
//             //res.send(result);
//             if (err) console.log(err)
//         });
//         //res.status(201).json(res.statusCode);
//         const x = res.statusCode;
//         if (String(x) === "200") {
//             res.status(201).json("successInsert");
//             sendSms(phone, code)
//         }
//     } catch (e) {
//         res.status(403).json("You are not allowed");
//     }
// });

//UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            mongoose.set('useFindAndModify', false);
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id, {
                $set: req.body
            },
                { new: true }
            );
            res.status(200).json(updatedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed");
    }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            mongoose.set('useFindAndModify', false);
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("The movie has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed");
    }
});

//GET mongoos
router.post("/find", async (req, res) => {
    try {
        const movieId = req.body.id;
        const sqlSelect = "SELECT * FROM `tbl_movie` where `id`=" + movieId;

        db.query(sqlSelect, (err, result) => {
            res.status(200).json(result);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get mySql array
router.post("/films", async (req, res) => {
    const ids = req.body.data;
    var arr = ids.map(function (el) { return el; });
    const sqlSelect = "SELECT * FROM `tbl_movie` where `id` IN (" + db.escape(arr) + ")";
    db.query(sqlSelect, (err, result) => {
        res.status(200).json(result);
    });
    //const sqlSelect = "SELECT * FROM `tbl_movie` WHERE `id`=11";
    // try {
    //     await db.query(sqlSelect, (err, result) => {
    //         if (err) {
    //             res.status(403).json(err);
    //         } else {
    //             if (result === undefined) {
    //                 res.status(200).json("Wrong");
    //             } else {
    //                 if (String(result) !== "")
    //                     res.status(200).json(result);
    //                 else
    //                     res.status(200).json("not found");
    //             }
    //         }
    //     });
    // } catch (err) {
    //     res.status(500).json(err);
    // }
});
//Get mySql
router.post("/film", async (req, res) => {
    const title = req.body.title;
    const sqlSelect = 'SELECT * FROM `tbl_movie` where `title` = ' + mysql.escape(title);
    db.query(sqlSelect, (err, result) => {
        res.status(200).json(result);
    });
});

//GET RANDOM
// router.get("/random", verify, async (req, res) => {
//     const type = req.query.type;
//     let movie;
//     try {
//         if (type === "series") {
//             movie = await Movie.aggregate([
//                 { $match: { isSeries: true } },
//                 { $sample: { size: 1 } }
//             ])
//         } else {
//             movie = await Movie.aggregate([
//                 { $match: { isSeries: false } },
//                 { $sample: { size: 1 } }
//             ])
//         }
//         res.status(200).json(movie);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
//GET RANDOM Mysql
router.get("/random", async (req, res) => {
    const sqlSelect = "SELECT * FROM `tbl_movie` ORDER BY RAND() LIMIT 1";
    //const sqlSelect = "SELECT * FROM `tbl_movie` WHERE `id`=11";
    try {
        await db.query(sqlSelect, (err, result) => {
            if (err) {
                res.status(403).json(err);
            } else {
                if (result === undefined) {
                    res.status(200).json("Wrong");
                } else {
                    if (String(result) !== "")
                        res.status(200).json(result);
                    else
                        res.status(200).json("not found");
                }
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL jwt
// router.get("/", verify, async (req, res) => {
//     if (req.user.isAdmin) {
//         try {
//             mongoose.set('useFindAndModify', false);
//             const movies = await Movie.find(req.params.id);
//             res.status(200).json(movies.reverse());
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     } else {
//         res.status(403).json("You are not allowed");
//     }
// });
//Get all myql
router.get("/", async (req, res) => {
    const sqlSelect = "SELECT * FROM `tbl_movie`";
    try {
        await db.query(sqlSelect, (err, result) => {
            if (err) {
                res.status(403).json(err);
            } else {
                if (result === undefined) {
                    res.status(200).json("Wrong");
                } else {
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

//Get all lists
router.post("/lists", async (req, res) => {
    if (req.body.data === "پوستر") {
        const sqlSelect = "SELECT * FROM `tbl_lists` WHERE `type`='پوستر'";
        try {
            await db.query(sqlSelect, (err, result) => {
                if (err) {
                    res.status(403).json(err);
                } else {
                    if (result === undefined) {
                        res.status(200).json("Wrong");
                    } else {
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
    } else {
        const sqlSelect = "SELECT * FROM `tbl_lists`";
        try {
            await db.query(sqlSelect, (err, result) => {
                if (err) {
                    res.status(403).json(err);
                } else {
                    if (result === undefined) {
                        res.status(200).json("Wrong");
                    } else {
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
    }
});

//update multiple
router.post("/upp", async (req, res) => {
    // const selctIdSql = "SELECT * FROM `tbl_movie`"
    // db.query(selctIdSql, (err, result) => {
    //     let imdbL = [7.6, 6.1, 5.6, 7.1, 7.3, 4.8, 5.8, 6.5, 5.5, 6.9, 6.1, 7.3, 7.5, 4.5, 5.5, 6, 7.1, 6.9, 6.7, 6.9, 7.3, 6.9, 6.1, 5.6, 6.6]

    //     for (let i = 0; i <= result.length - 1; i++) {
    //         const update = "UPDATE `tbl_movie` SET `imdb`=" + imdbL[i] + " WHERE `id`=" + result[i].id;
    //         db.query(update, (err, result) => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //         });
    //     }
    // });

    const selImgSql = "SELECT * FROM `tbl_movie`";

    db.query(selImgSql, (err, result) => {
        let newImg = []
        for (let i = 0; i <= result.length - 1; i++) {
            // const update = "UPDATE `tbl_movie` SET `imdb`=" + imdbL[i] + " WHERE `id`=" + result[i].id;
            // db.query(update, (err, result) => {
            //     if (err) {
            //         console.log(err)
            //     }
            // });
            newImg.push(result[i].img.replace('http://localhost:8800/', ''));
            const update = "UPDATE `tbl_movie` SET `imgTrailerMob`='" + result[i].imgTrailerMob.replace('http://localhost:8800/', '') + "' WHERE `id`=" + result[i].id;
            db.query(update, (err, result) => {
                if (err) {
                    console.log(err)
                }
            });
        }
        console.log(newImg)
        res.status(200).json(result);
    });
});

//search
router.post("/search", async (req, res) => {
    let searchText = req.body.searchText;
    let isSeries = req.body.isSeries;
    let titleType = req.body.titleType;
    let genre = req.body.genre;
    let minYear = req.body.minYear;
    let maxYear = req.body.maxYear;
    let minImdb = req.body.minImdb;
    let maxImdb = req.body.maxImdb;
    

    let searchSql;
    switch (titleType) {
        case "1":
            searchSql = "SELECT * FROM `tbl_movie` where `title` like '%" + String(searchText) + "%' AND isSeries=" + isSeries;
            break;
        case "2":
            searchSql = "SELECT * FROM `tbl_movie` where `stars` like '%" + String(searchText) + "%' AND isSeries=" + isSeries;
            break;
        case "3":
            let genreArr = genre.map(function (el) { return el; });
            searchSql = "SELECT * FROM `tbl_movie` where `directors` like '%" + String(searchText) + "%' AND isSeries=" + isSeries;
            break;
        case "4":
            //searchSql = "SELECT genre FROM `tbl_movie` where `genre` " + db.escape(genreArr) + ") AND isSeries=" + isSeries;
            searchSql = "SELECT * FROM `tbl_movie` where (";
            for (let i = 0; i < genre.length - 1; i++) {
                searchSql += "`genre` LIKE '%" + genre[i] + "%' OR ";
            }
            searchSql += "`genre` LIKE '%" + genre[genre.length - 1] + "%') AND isSeries=" + isSeries + " AND `imdb` >= " + minImdb + " AND `imdb` <= " + maxImdb + " AND `year` >= " + minYear + " AND `year` <= " + maxYear;
            break;
    }
    db.query(searchSql, (err, result) => {
        res.status(200).json(result);
    });
});

module.exports = router;