const route=require('express').Router();
const multer=require('multer');
const path=require('path');

let storage = multer.diskStorage({
    destination:'./public/assests/',
    filename: function (req, file, cb) {
      //console.log(file);
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
  })
   
let upload = multer({ storage: storage}).single('productimage');
    
route.post('/', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    }
    else{
       console.log(req.file);
       res.send(req.file.filename);
    }
  })
})

module.exports=route;

/*fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        files:1
    }*/