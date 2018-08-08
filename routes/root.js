const route=require('express').Router();;
const passport = require('../passport');
const Users = require('../db').Users;


route.get('/login', (req, res) => {
    res.render('login',{
        scriptUrl:'./js/loginScript.js',
        cssUrl:'/css/common.css',
        loginUser:''
    })
})
route.get('/signup', (req, res) => {
    if (req.user) {
        res.redirect('/')
    }
    else{
        res.render('signup',{
            scriptUrl:'./js/signupScript.js',
            cssUrl:'/css/common.css',
            loginUser:''
        })
    }
    
})

route.get('/manageProduct', (req, res) => {
    if (req.user) {
        if(req.user.role){
            res.render('manageProduct',{
                scriptUrl:'/js/manageProduct.js',
                cssUrl:'/css/common.css',
                loginUser:req.user.firstname+" "+req.user.lastname,
                userExist:true,
                dropdown:[{link:`/myorder/${req.user.id}`,text:"My Orders"},
                          {link:"/manageOrder",text:"Manage Order"},
                          {link:"/manageProduct",text:"Manage Product"},
                          {link:"/logout",text:"Log Out"}]
            })
        }
        else{
            res.redirect('/login')
        }
        //console.log(req.user);
        
    } else {
        res.redirect('/login')
    }
    
})

route.get('/manageOrder', (req, res) => {
    if (req.user) {
        if(req.user.role){
            res.render('manageOrder',{
                scriptUrl:'/js/manageOrder.js',
                cssUrl:'/css/common.css',
                loginUser:req.user.firstname+" "+req.user.lastname,
                userExist:true,
                dropdown:[{link:`/myorder/${req.user.id}`,text:"My Orders"},
                          {link:"/manageOrder",text:"Manage Order"},
                          {link:"/manageProduct",text:"Manage Product"},
                          {link:"/logout",text:"Log Out"}]
            })
        }
        else{
            res.redirect('/login')
        }
        //console.log(req.user);
        
    } else {
        res.redirect('/login')
    }
    
})

route.get('/myorder/:id', (req, res) => {
    if (req.user) {
        if(req.user.role){
            res.render('myorder',{
                scriptUrl:'/js/myorder.js',
                cssUrl:'/css/common.css',
                loginUser:req.user.firstname+" "+req.user.lastname,
                userExist:true,
                dropdown:[{link:`/myorder/${req.user.id}`,text:"My Orders"},
                          {link:"/manageOrder",text:"Manage Order"},
                          {link:"/manageProduct",text:"Manage Product"},
                          {link:"/logout",text:"Log Out"}]})
        }
        else{
            res.render('myorder',{
                scriptUrl:'/js/myorder.js',
                cssUrl:'/css/common.css',
                loginUser:req.user.firstname+" "+req.user.lastname,
                userExist:true,
                dropdown:[{link:`/myorder/${req.user.id}`,text:"My Orders"},
                            {link:"/logout",text:"Log Out"}]})
        }
    } else {
        res.redirect('/login')
    }
    
})

route.get('/shipping', (req, res) => {
    if (req.user) {
        if(req.user.role){
            res.render('shipping',{
                scriptUrl:'/js/shipping.js',
                cssUrl:'/css/common.css',
                loginUser:req.user.firstname+" "+req.user.lastname,
                userExist:true,
                dropdown:[{link:`/myorder/${req.user.id}`,text:"My Orders"},
                          {link:"/manageOrder",text:"Manage Order"},
                          {link:"/manageProduct",text:"Manage Product"},
                          {link:"/logout",text:"Log Out"}]
            })
        }
        else{
            res.render('shipping',{
                scriptUrl:'/js/shipping.js',
                cssUrl:'/css/common.css',
                loginUser:req.user.firstname+" "+req.user.lastname,
                userExist:true,
                dropdown:[{link:`/myorder/${req.user.id}`,text:"My Orders"},
                          {link:"/logout",text:"Log Out"}]
            })
        }
        //console.log(req.user);
        
    } else {
        res.redirect('/login')
    }
    
})

route.get('/addProduct', (req, res) => {
    if (req.user) {
        if(req.user.role){
            res.render('add-product',{
                scriptUrl:'/js/add-product.js',
                cssUrl:'/css/common.css',
                loginUser:req.user.firstname+" "+req.user.lastname,
                userExist:true,
                dropdown:[{link:`/myorder/${req.user.id}`,text:"My Orders"},
                          {link:"/manageOrder",text:"Manage Order"},
                          {link:"/manageProduct",text:"Manage Product"},
                          {link:"/logout",text:"Log Out"}]
            })
        }
        else{
            res.redirect('/login')
        }
        console.log(req.user);
        
    } else {
        res.redirect('/login')
    }
    
})

route.get('/cart', (req, res) => {
    let user='Login & SignUp';
    let login='/login';
    if(req.user){
      console.log(req.user);
      user=req.user.firstname+" "+req.user.lastname;
      login='#'
      if(req.user.role){
        res.render('shopping-cart',{
            scriptUrl:'./js/cartScript.js',
            cssUrl:'/css/common.css',
            loginUser:user,
            loginhref:login,
            userExist:true,
            dropdown:[{link:`/myorder/${req.user.id}`,text:"My Orders"},
                      {link:"/manageOrder",text:"Manage Order"},
                      {link:"/manageProduct",text:"Manage Product"},
                      {link:"/logout",text:"Log Out"}]
        });
      }
      else{
        res.render('shopping-cart',{
            scriptUrl:'./js/cartScript.js',
            cssUrl:'/css/common.css',
            loginUser:user,
            loginhref:login,
            userExist:true,
            dropdown:[{link:`/myorder/${req.user.id}`,text:"My Orders"},
                      {link:"/",text:"Log Out"}],
            userdata:req.user.role
        });
      }
      
    }
    else{
        res.render('shopping-cart',{
            scriptUrl:'./js/cartScript.js',
            cssUrl:'/css/common.css',
            loginUser:user,
            loginhref:login,
        });
    } 
})
route.get('/',(req,res)=>{
    let user='Login & SignUp';
    let login='/login';
    if(req.user){
      console.log(req.user);
      user=req.user.firstname+" "+req.user.lastname;
      login='#'
      if(req.user.role){
        res.render('index',{
            scriptUrl:'./js/mainPageScript.js',
            cssUrl:'/css/common.css',
            loginUser:user,
            loginhref:login,
            userExist:true,
            dropdown:[{link:`/myorder/${req.user.id}`,text:"My Orders"},
                      {link:"/manageOrder",text:"Manage Order"},
                      {link:"/manageProduct",text:"Manage Product"},
                      {link:"/logout",text:"Log Out"}]
        });
      }
      else{
        res.render('index',{
            scriptUrl:'./js/mainPageScript.js',
            cssUrl:'/css/common.css',
            loginUser:user,
            loginhref:login,
            userExist:true,
            dropdown:[{link:`/myorder/${req.user.id}`,text:"My Orders"},
                      {link:"/",text:"Log Out"}],
            userdata:req.user.role
        });
      }
      
    }
    else{
        res.render('index',{
            scriptUrl:'./js/mainPageScript.js',
            cssUrl:'/css/common.css',
            loginUser:user,
            loginhref:login,
        });
    } 
})
route.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        console.log(user);
      if (err) { return next(err); }
      if (!user) { return res.send(user) }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(user)
      });
    })(req, res, next);
  });

route.post('/signup', (req, res) => {
    Users.create ({
        username: req.body.username,
        password: req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    }).then((createdUser) => {
        console.log(createdUser);
        res.send('/login')
    }).catch((err)=>{
        console.log(err);
        res.send('err');
    })
})

route.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


module.exports=route;