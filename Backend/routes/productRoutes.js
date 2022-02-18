const express=require('express')
const router=express.Router()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const productController =require('../controller/ProductController')
router.get("/getproduct",productController.getProducts)
router.get("/getproductbyid/:id",productController.getProductsbyid)
router.get("/getproductbyiddata/:id",productController.getProductsbyiddata)
router.get("/getproductbycolor/:id",productController.getProductsbyidcolor)
router.post("/addproduct",productController.autenticateToken,productController.addProducts)

router.post("/deleteproducts",productController.autenticateToken,productController.deleteproducts)
router.post("/updateproducts",productController.autenticateToken,productController.updateproduct)
router.get("/authenticatetoken",productController.autenticateTokens)
router.post("/paymentroute",productController.payment)
router.post("/paymentsuccess",productController.paymentSuccess)

module.exports=router;