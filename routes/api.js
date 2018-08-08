const route=require('express').Router();
const userRoute=require('./user');
const productRoute=require('./product');
const menu=require('./menu');
const orders=require('./orders');
const upload=require('./upload');


route.use('/user',userRoute);
route.use('/product',productRoute);
route.use('/menu',menu);
route.use('/order',orders);
route.use('/upload',upload);
exports = module.exports = route;