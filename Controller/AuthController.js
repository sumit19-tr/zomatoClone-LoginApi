const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');//to POST call
const jwt = require('jsonwebtoken');//to generate toke
const bcrypt = require('bcryptjs');//encyrpt the password
const config = require('../config');
const user = require('../Model/userModel');
const userModel = require('../Model/userModel');
// const userModel = require('../Model/userModel');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//get all the users
router.get('/users', (req, res) => {
    user.find({}, (err, data) => {
        if (err) throw err;
        res.send(data);
        // if (err) {
        //     return res.status(500).json({
        //         error: err
        //     })  
        // }
        // else{
        //     res.send(data);  
        // }
    })
})

// register user
router.post('/register', (req, res) => {

    user.find({email:req.body.email},(err,data)=>{
        if(data.length>0){
            res.send("Email already exist");
        }
        else{
            let hashpassword = bcrypt.hashSync(req.body.password, 8)//encrypt the password 
            //create and insert into mongo with Schema's create method from mongoose we're going to send the mongoose
            user.create({
                name: req.body.name,
                email: req.body.email,
                password: hashpassword,
                phone: req.body.phone,
                role: req.body.role ? req.body.role : 'User' // if role are given it will take role else default role is user
            }, (err, result) => {
                // if(err) res.send(`Error While Register`);
                if (err) {
                    res.status(500).json({
                        error: err
                    })
                }
                else {
                    res.send(`Registration successful`)
                    // res.status(200).json({
                    //     new_user:result
                    // })
                }
                // res.send(`Registration successful`)
            })
        }
    })
})

//login user
router.post('/login', (req, res) => {
    user.findOne({ email: req.body.email }, (err, user) => {
        if (err) res.send({ auth: false, token: "Error while Logging" });
        if (!user) res.send({ auth: false, token: 'No User Found' });
        else {
            const passIsValid = bcrypt.compareSync(req.body.password, user.password);//decrypt password
            if (!passIsValid) res.send({ auth: false, token: 'Invalid Password' })
            //in case of both correct
            let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 })//expire in 24 hours
            res.send({ auth: true, token: token })
        }
    })
})

//userinfo
router.get('/userInfo',(req,res)=>{
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:"No Token Provided"});
    //jwt verify
    jwt.verify(token,config.secret,(err,user) => {
        if(err) res.send({auth:false,token:'Invalid Token'})
        userModel.findById(user.id,(err,result) => {
            res.send(result);
            if(err) res.send({error:err});
        })
    })
})

module.exports = router