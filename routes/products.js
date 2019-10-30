const express = require("express")
var multer = require('multer')
var MulterAzureStorage = require('multer-azure-storage')
const Product = require("../models/product")

var upload = multer({
  storage: new MulterAzureStorage({
    azureStorageConnectionString: 'DefaultEndpointsProtocol=https;AccountName=strivelive;AccountKey=SNleHAiEyQOy8L4T48OL9elk3kp9OAdGaH3Y9SACV0X3e48PI6t1joiu2nYirt12WGyt9Ge29oyof/HdoozZ9w==;EndpointSuffix=core.windows.net',
    containerName: 'images',
    containerSecurity: 'blob'
  })
})

var router = express.Router();

router.get("/", async (req, res)=>{
    var products = await Product.find({})
    res.send(products)
})

router.post("/", async (req, res)=>{
    var product = new Product(req.body);
    await product.save();
    res.send(product)
})

router.delete("/:productId", async (req, res)=>{
    await Product.findByIdAndDelete(req.params.productId);
    res.send("delete")
})

router.post("/:productId/upload", upload.single("img"), async (req, res) =>{
    if (req.file === undefined){
        res.statusCode = 400;
        res.send("file is required")
    }

    var product = await Product.findById(req.params.productId)
    if (product){
        await Product.findByIdAndUpdate(req.params.productId, { image: req.file.url })
        res.send(res.file.url)
    }
    else{
        res.send("not found")
    }
})


module.exports = router