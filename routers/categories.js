const {Category} = require('../model/Category')

const express = require('express');

const router = express. Router();

router.get('/', async (req, res) =>{

        const categoryList = await Category.find();

        if(!categoryList) {
            res.status(500).json({success: false})
        }
        res.status(200).send(categoryList);
})

router.get('/:id', (req,res)=>{
        
        const getCategory = Category.findById(req.params.id)

        if(!getCategory)
            return res.status(500).json({message: "The category is not found"})
        else
            return res.status(200).send(getCategory)
              
})

router.post('/', async(req,res)=>{

        let newCategory = new Category({
                name: req.body.name,
                icon: req.body.icon,
                color:req.body.color

        })
    newCategory =  await newCategory.save()
    if(!newCategory)
        return res.status (404).send('the category cannot be created!')
    res.send(newCategory);
})


router.put('/:id' , async(req,res)=>{

        let updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon,
                color:req.body.color
            },
            {new:true}
        )
        //updatedCategory =  await updatedCategory.save()
        if(!updatedCategory)
            return res.status (404).send('the category cannot be updated!')
        res.send(updatedCategory);
})



router.delete('/:id', (req,res)=>{

    Category.findByIdAndDelete(req.params.id).then((deletedCategory)=>{
        
        if(deletedCategory)
            return res.status(200).json({success : true , message: 'the category is deleted' })
        else
            return res.status(500).json({success : false , message: 'the category is not deleted' })
    
    }).catch((err)=>{console.log("error found" , err)})



})



module.exports =router;