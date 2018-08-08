const route=require('express').Router();
const order=require('../db').Orders;

route.post('/',(req,res)=>{
    if(req.user){
        order.create({
            name:req.body.name,
            address:req.body.address,
            city:req.body.city,
            orderDetails:req.body.orderDetails,
            userId:req.user.id
        }).then((p)=>{
            res.status(201).send(p);
        }).catch((err)=>{
            console.log(err);
            res.status(501).send({err:"Order not created"});
        });
    }
    else{
        res.send("No User so no shipping")
    }
    
});

route.get('/:userId',(req,res)=>{
   order.findAll({
        where: {
        userId: req.params.userId
    }})
    .then((p)=>{
        res.status(200).send(p);
    })
    .catch((err)=>{
        res.status(500).send({err:'No Order found'});
    });
});

route.get('/',(req,res)=>{
    order.findAll()
     .then((p)=>{
         res.status(200).send(p);
     })
     .catch((err)=>{
         res.status(500).send({err:'No product found'});
     });
 });


module.exports=route;