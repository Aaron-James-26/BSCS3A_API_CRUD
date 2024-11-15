//instantiation
//import express API framework
const express = require("express");
//const { isDate } = require("moment");
const app = express();
const moment = require('moment')
//importing mysql
const mysql = require("mysql")

//port number
const PORT = process.env.PORT || 5000;


const logger = (req, res, next) => {
    
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`)
    next()
} 

app.use(logger)
//connection to mysql
const connection = mysql.createConnection({
    host: "baetaqcqgftgiaor4glx-mysql.services.clever-cloud.com",
    user: "umyflwgkubdunpy9",
    password: "y9og5hleUeIjYq7VbuY0",
    database: "baetaqcqgftgiaor4glx",
});


//initialization of connection
connection.connect();


//API
///GET request and response are the parameters
app.get("/get", (req, res) => {
    //create a query
    connection.query("SELECT * FROM userdata", (err, rows, fields) =>{
        //checking errors
        if(err) throw err;
        //reponse
        //key value pair
        res.json(rows);
    })
})


//API
//passing the id parameter
//request - >>> front-end ID
app.get("/api/miyembro/:id", (req, res) => {
    const id = req.params.id;//60
    connection.query(`SELECT * FROM userdata WHERE id ='${id}'`, (err, rows, fields) => {
        if(err) throw err;

        if(rows.length > 0){
            res.json(rows);
        }else{
            res.status(400).json({msg: `${id} id not found!`})
        }
    })
    // res.send(id);
})



//POST
app.use(express.urlencoded({extended: false}))
app.post("/post", (req, res) => {
    const Item_Name =   req.body.Item_Name;
    const Item_Price = req.body.Item_Price;
    const Quantity = req.body.Quantity;
    const Supplier = req.body.Supplier;

    const id = req.body.id;

    connection.query(`INSERT INTO product_info (Item_Name, Item_Price, Quantity, Supplier) VALUE ('${Item_Name}', '${Item_Price}', '${Quantity}', '${Supplier}' WHERE id = '${id}')`, 
    (err, rows, fields) => {
        if(err) throw err;
        res.json({msg: `Succesfully inserted`});

    })

} )



//DELETE API
app.use(express.urlencoded({extended: false}));
app.delete("/api/miyembro/", (req, res) => {
    const id = req.body.id;

    connection.query(`DELETE FROM product_info WHERE id= '${id}'`, (err, rows, fields) => {
        if(err) throw err
        res.json({msg: `Successfully deleted!`})
    })

})





app.listen(5000,  () => {
    console.log(`Server is running in port ${PORT}`);
})















