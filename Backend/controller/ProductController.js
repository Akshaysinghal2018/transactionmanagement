const productModel = require('../db/Products/productSchema');
const orderModel=require('../db/Products/orderSchema');
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const jsonwebtoken = require('jsonwebtoken')
const jsonsecret = "5sa5sa67s66s66sa6saww"
require("dotenv").config();
const Razorpay = require("razorpay");
const shortid = require("shortid");
async function payment(req, res) {
    try {
        const instance = new Razorpay({
            key_secret:"0BWaTwNLO6he4vSqVnDrLagk",
            key_id: "rzp_test_OJD4szMjTepByk",
        });

        const options = {
            amount: req.body.amount, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
}
 async function paymentSuccess (req, res)  {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;
        console.log({
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        })
        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const data={email:req.body.email,order_data:req.body.order_data,address:req.body.address,paymentmethod:req.body.paymentmethod,transactiondetail:{
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        }}
    const ins=orderModel(data)
    console.log(data)
    ins.save((err,result)=>{
        if (err) {
            console.log(err)
            res.json({data:"error"})
        }
        else{
            console.log("checkout done")
            res.json({data:result,msg:"Order Completed Successfully!!"})
        }
    })
    console.log("checkout")

        
    } catch (error) {
        res.status(500).send(error)};}
function extractToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}
const autenticateToken = async (req, res, next) => {
    if (req != undefined) {
        const token = extractToken(req)
        console.log(token)

        if (token == null) {
            res.json({ "err": "token", "msg": "Token not match" })
        }
        else {
            await jsonwebtoken.verify(token, jsonsecret, (err, data) => {
                if (err) {
                    res.json({ "err": "token", "msg": "Token not match" })
                }
                else {
                    next();
                }
            })
        }
    }
    else {
        next()
    }
}
const autenticateTokens = async (req, res, next) => {
    if (req != undefined) {
        const token = extractToken(req)
        console.log(token)

        if (token == null) {
            res.json({ "err": "token", "msg": "Token not match" })
        }
        else {
            await jsonwebtoken.verify(token, jsonsecret, (err, data) => {
                if (err) {
                    res.json({ "err": "token", "msg": "Token expired" })
                }
                else {
                    res.json({ "err": "0", "msg": "Token  match" })
                }
            })
        }
    }
    else {
        res.json({ "err": "0", "msg": "Token  match" })
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))
        //console.log(path.join(__dirname, './uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
        //console.log(file)
    }
});

const multi_upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        console.log(file.mimetype)
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).array('myfile', 1)
const addProducts = async (req, res, next) => {

    multi_upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ error: { message: `Multer uploading error1: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name == 'ExtensionError') {
                res.json({ err: err.name })
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }

        let image = req.files[0].filename;
        const data = { product_name: req.body.pname, product_desc: req.body.pdesc, product_image: image, product_cost: req.body.pcost, product_stock: req.body.pstock }

        let ins = new productModel(data);
        //console.log(data)
        ins.save((err) => {
            console.log(err)
            if (err) { res.json({ "success": false, err: "product already added", message: "user already added." }) }
            else {
                res.json({
                    "err": 0,
                    "success": true,
                    "status_code": 200,
                    "message": `product added successfully`
                });
            }
        })
        //insert data


    })
}
const updateproduct = async (req, res, next) => {
    multi_upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ error: { message: `Multer uploading error1: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name == 'ExtensionError') {
                res.json({ err: err.name })
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }
        var data = {}
        console.log(req.files)
        if (req.files.length == 0) {
            data = { product_name: req.body.pname, product_desc: req.body.pdesc, product_cost: req.body.pcost, product_stock: req.body.pstock }
        }
        else {

            let image = req.files[0].filename;
            console.log(req.body)
            data = { product_name: req.body.pname, product_desc: req.body.pdesc, product_image: image, product_cost: req.body.pcost, product_stock: req.body.pstock }
        }


        //console.log(data)
        productModel.findByIdAndUpdate({ _id: req.body.pid }, data).exec((err) => {
            console.log(err)
            if (err) { res.json({ "success": false, err: "update", message: "update error" }) }
            else {
                res.json({
                    "err": 0,
                    "success": true,
                    "status_code": 200,
                    "message": `product updated successfully`
                });
            }
        })
        //insert data


    })
}
const getProducts = async (req, res, next) => {
    productModel.find({}, {}).exec((err, data) => {
        // console.log(err)
        if (err) { res.json({ err: "not found", message: "product not found" }) }
        else {
            res.json({
                "success": true,
                "status_code": 200,
                "data": data
            });
        }
    })
}
const deleteproducts = async (req, res, next) => {
    productModel.findByIdAndRemove({ _id: req.body.id }).exec((err, data) => {
        console.log(data)
        if (err) { res.json({ err: "not found", message: "product not found" }) }
        if (data == null) { res.json({ err: "not found", message: "product not found" }) }
        else {
            res.json({
                "success": true,
                "status_code": 200,
                "message": "delete Successfully."
            });
        }
    })
}
const getProductsbyid = async (req, res, next) => {
    const id = req.params.id
    console.log("getproductbyid")
    productModel.find({}).exec((err, data) => {
        const data1 = []
        data.map(function (doc) {
            if (doc.category_id != null) {
                if (doc.category_id.category_name == id) {
                    data1.push(doc)
                }
            }
        })
        res.json({ data: data1 })
        //console.log(err)
    })
}
const getProductsbyiddata = async (req, res, next) => {
    const id = req.params.id
    productModel.find({ _id: id }).populate(['category_id', 'color_id']).exec((err, data) => {
        res.json({ data: data })
        //console.log(err)
    })
}
const getProductsbyidcolor = async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    productModel.find({ color_id: mongoose.Types.ObjectId(id) }, { "product_name": 1, "product_cost": 1, "product_rating": 1, "product_subImages": 1, "category_id": 1, "color_id": 1 }).populate(['category_id', 'color_id']).exec((err, data) => {
        const data1 = []
        console.log(data)

        res.json({ data: data })
        //console.log(err)
    })
}

module.exports = { autenticateToken, getProducts, getProductsbyid, getProductsbyiddata, getProductsbyidcolor, addProducts, deleteproducts, updateproduct, autenticateTokens, payment,paymentSuccess }