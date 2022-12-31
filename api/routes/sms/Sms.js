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

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
}

router.post("/", async (req, res) => {
    const phone = req.body.phone;
    const code = String(between(100000, 999999));

    const sqlInsert = "INSERT INTO `tbl_sms`(`phone`, `code`) VALUES (?, ?)";
    cryptedCode = CryptoJs.AES.encrypt(code, process.env.SECRET_KEY).toString();

    try {
        await db.query(sqlInsert, [phone, cryptedCode], (err, result) => {
            //res.send(result);
            if (err) console.log(err)
        });
        //res.status(201).json(res.statusCode);
        const x = res.statusCode;
        if (String(x) === "200") {
            res.status(201).json("successInsert");
            sendSms(phone, code)
        }
    } catch (e) {
        res.status(403).json("You are not allowed");
    }
})

const sendSms = (phone, code) => {
    request.post({
    url: 'http://ippanel.com/api/select',
    body: {
		"op":"pattern",
		"user":"9029292059",
		"pass":"morteza1375",
		"fromNum":"+983000505",
		"toNum":phone,
		"patternCode":"b3u5mbuoky",
		"inputData":[
			{"code":code},
			{"brand":"bmw"}		
		]
	},
    json: true,
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
	    //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
            //console.log(response.body);
        } else {
		    console.log("whatever you want");
                
        }
    });
}

module.exports = router;