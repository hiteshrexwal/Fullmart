const route=require('express').Router();
const user=require('../db').Users;

route.get('/:user',(req,res)=>{
    //get request for all user
    //console.log(req.params.user);
    //console.log(req.query.password);
    //res.send("Sucess")
    user.findAll({
        where: {
        name: req.params.user,
        password: req.query.pass
      }})
    .then((user)=>{
       res.status(200).send(user);
    })
    .catch((err)=>{
        
       res.status(500).send({err:'No user found'});
      }    
    );
 });
 
 route.post('/',(req,res)=>{
     //post request for adding user
     user.create({
         username:req.body.username,
         password:req.body.password,
         firstname:req.body.firstname,
         lastname:req.body.lastname
     }).then((user)=>{
         res.status(201).send(user);
     }).catch((err)=>{
        console.log(err)
         res.status(501).send({err:"Cannot create user"});
     })
 });
module.exports=route;

