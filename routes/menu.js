const route=require('express').Router();
const menu=require('../db').Menu;
route.get('/',(req,res)=>{
   //get request for all user
   menu.findAll()
   .then((menuItems)=>{
      res.status(200).send(menuItems);
   })
   .catch((err)=>{
      res.status(500).send({err:'Cannot get Menu Items'});
     }    
   );
});

route.post('/',(req,res)=>{
    //post request for adding user
    menu.create({
        name:req.body.name,
    }).then((menuItems)=>{
        res.status(201).send(menuItems);
    }).catch((err)=>{
        res.status(501).send({err:"Could not set a menu"});
    })
});

module.exports=route;