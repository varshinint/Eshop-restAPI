const express = require('express')

const router = express.Router()

const {Product} = require('../model/product')
const { Category } = require('../model/Category')

const mongoose = require('mongoose')


//http://localhost:8000/api.v1/products
// A callback will have the response that i would send to client when he would call this route
router.get(`/`, async(req,res)=>{

    // we are building the obj by getting the data of the product from the DB 
    // and then snd them to frontend with get menthod
    const productList = await Product.find()
    // if u want your product list to have some specific fields like
    //name, description id only, u can use Product.find().select('name  description -_id' )
    
    if(!productList) {
        res.status(500).json({success: false})

    }
    res.send(productList);
})

router.get('/:id', async(req,res)=>{
     
    const getProduct =  await Product.findById(req.params.id)
    // Any connected id of a table(product table) is the field in another table(category table)
    //u can use populate for speciifying the connected id
    //.populate('Category')

    if(!getProduct){
        res.status(500).json({success: false, message: 'Product not found'})
    }
    res.send(getProduct)
})

router.post(`/`, async (req,res)=>{

// now if admin of the application want to create a new product that will be sent from front end. To handle 
// To handle that , we write rest api of post request. Data for the post request will come from front end
    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body. image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send('Invalid Category')
    
    newProduct= await  newProduct.save()

    if(newProduct)
        return  res.status(201).send(newProduct)
    else
        return res.status(500).send('New product cannot be created')

 // To extract data from req.body we use body parser which is amiddleware that has control over request and response APIs
    
})

router.put('/:id', async(req,res)=>{

    // checking the passed Product ID in the parameter is valid
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid Product ID')
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
    {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body. image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
     },
     {new: true}
    )
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send('Invalid Category')
    
    if(!updatedProduct)
        return res.status(500).send('Product cannot be updated')

    res.send(updatedProduct)
})


router.delete('/:id', (req,res)=>{

    Product.findByIdAndDelete(req.params.id).then((deletedProduct)=>{
        
        if(deletedProduct)
            return res.status(200).json({success : true , message: 'the product is deleted' })
        else
            return res.status(500).json({success : false , message: 'the product is not deleted' })
    
    }).catch((err)=>{console.log("error found" , err)})

})

// Statistic request- if admin wants to know the number of products 
router.get ('/get/count', async(req,res)=>{

        const productCount = await Product.countDocuments()

        if(!productCount) {
            res.status(500).json({success: false})
        }
        console.log(productCount)
        res.status(200).send(productCount);
})  

//Statistic request- if admin wants to know the list of featured products 
router.get('/get/featured', async(req,res) =>{

        const featuredProducts =  await Product.find({isFeatured: true})
        if(!featuredProducts) {
            res.status(500).json({success: false})
        }
    res.send(featuredProducts);
})

module.exports = router
