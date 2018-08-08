const express=require('express');
const server=express();
const path=require('path');
const root=require('./routes/root');
const hbs=require('hbs');
const api=require('./routes/api');
const session = require("express-session");
const passport=require('passport');
const bodyparser=require('body-parser');

server.use(bodyparser.json({limit:'50mb'}));
server.use(bodyparser.urlencoded({extended:false,limit:'50mb'}));
server.use(session({
    secret: 'NewSecret'
}))
server.use(passport.initialize())
server.use(passport.session())

server.use('/',express.static(path.join(__dirname,'public')));
server.use('/api',api);
server.use('',root);
server.set('view engine','hbs');
hbs.registerPartials(__dirname+'\\views\\partials');
//console.log(__dirname+`\\views\\partials`);


const port=process.env.PORT||2400
server.listen(port,()=>{
    console.log(`Server started at localhost:${port}/`)
})