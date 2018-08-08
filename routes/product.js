const route=require('express').Router();
const products=require('../db').Products;
//const image=require("../public/assests")

route.post('/',(req,res)=>{
    products.create({
        name:req.body.name,
        price:req.body.price,
        imageUrl:req.body.imageUrl,
        menuId:req.body.menuId
    }).then((p)=>{
        res.status(201).send(p);
    }).catch((err)=>{
        console.log(err);
        res.status(501).send({err:"Product not created"});
    });
    /*console.log(req.body.name)
    console.log(req.body.price)
    console.log(req.body.imageUrl)
    console.log(req.body.menuId)
    res.send("SUcess");*/
});

route.get('/:menuId',(req,res)=>{
   //get request for all user
    products.findAll({
        where: {
        menuId: req.params.menuId
    }})
    .then((p)=>{
        res.status(200).send(p);
    })
    .catch((err)=>{
        res.status(500).send({err:'No product found'});
    });
});

route.get('/id/:Id',(req,res)=>{
    //get request for all user
     products.findOne({
         where: {
         id: req.params.Id
     }})
     .then((p)=>{
         res.status(200).send(p);
     })
     .catch((err)=>{
         res.status(500).send({err:'No product found'});
     });
 });
route.get('/',(req,res)=>{
    //get request for all user
     products.findAll()
     .then((p)=>{
         res.status(200).send(p);
     })
     .catch((err)=>{
         res.status(500).send({err:'No product found'});
     });
 });


module.exports=route;