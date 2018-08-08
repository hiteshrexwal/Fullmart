const Sequelize = require('sequelize');
const db = new Sequelize('mytestdb', 'myuser', 'mypass', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const Menu=db.define('menus',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true,
            isAlphanumeric: true
        }
    }
    },
    {
        timestamps:false
    }
)

const Products=db.define('products',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    price:{
        type:Sequelize.NUMERIC,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true,
            isNumeric: true
        }
    },
    imageUrl:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    }
},{
    timestamps:false
})

const Users=db.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true,
            isEmail:true
        }
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    firstname:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    lastname:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    role:{
        type:Sequelize.STRING,
        allowNull:true,
        defaultValue:null
    }
},{
    timestamps:false
})

Products.belongsTo(Menu,{foreignKey:{allowNull:false}})

const Orders=db.define('orders',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    address:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    city:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    },
    orderDetails:{
        type:Sequelize.STRING,
        allowNull:false,
        required:true,
        validate:{
            notEmpty: true
        }
    }
},{
    timestamps:false
})
Orders.belongsTo(Users,{foreignKey:{allowNull:false}})

db.sync().then(()=>console.log("Database Synced")).catch((err)=>console.log("Error in db sync"+err));
exports=module.exports={
    Products,Menu,Users,Orders
};