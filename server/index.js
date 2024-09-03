const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const jsonPaser = bodyParser.json()
const app = express();
const mysql = require('mysql2')
require('dotenv').config();

const secret = 'mysecret'
port = 3001;

const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_password= process.env.DB_PASSWORD
const db_databse = process.env.DB_DATABASE

const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "MyBlogs"
});

db.connect(function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Connected to database!")
    }
})


app.use(bodyParser.json())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["POST","GET",],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
}))


app.get('/',(req,res)=>{
    res.send({message : 'Hello From Sever'})
})

app.get('/GetUser',async(req , res)=>{
    try{
        const AuthToken = req.cookies.token
        
        const user =jwt.verify(AuthToken,secret)
        // const results = await db.query("SELECT * FROM users");

        res.json({
            users: user.username
        })
    }catch(err){
        console.log(err)
    }
})

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

app.post('/Register', async (req, res) => {
    const { id, username, email, password, role } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).send({ Message: 'Invalid email format' });   
    }
    
    // ตรวจสอบว่า username หรือ email มีอยู่แล้วหรือไม่
    db.query("SELECT * FROM `users` WHERE `username` = ? OR `email` = ?", [username, email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ Message: 'Database error' });
        }

        if (results.length > 0) {
            // ถ้าพบ username หรือ email ในฐานข้อมูลแล้ว
            return res.status(400).send({ Message: 'Username or Email already exists' });
        }

        // ถ้าไม่มี username และ email ในฐานข้อมูล
        try {
            let hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO `users`(`id`,`username`,`email`,`password`,`role`) VALUES (?,?,?,?,?)",
                [id, username, email, hashedPassword, role],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send({ Message: 'Failed to create user' });
                    } else {
                        res.send({ Message: 'User Created!' });
                    }
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).send({ Message: 'Error while hashing password' });
        }
    });
});

app.post('/login' ,jsonPaser , async(req,res)=>{
    try{
        const username = req.body.username
        const password = req.body.password
        const sql = "SELECT * FROM users WHERE username = ?"
        db.query(sql,[username],async(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({message:"Database Error!"})
            }
            
            if(result.length === 0 ){
                return res.status(401).json({message:"User not found in database!!"})
            }
            
            const users = result[0]
            const isMatch =  await bcrypt.compare(password , users.password)

            if(!isMatch){
                return res.status(401).send({message:"Invalid Password"})
            }

            const token = jwt.sign({username: users.username, role: users.role},secret,{expiresIn:"1h"})
            
            res.cookie('token',token,{
                maxAge:3600 * 1000,
                sameSite:'none',
                secure:true,
                httpOnly:false,
            })

            res.status(200).json({message:"Login Successfull",  token: token})
        })
        
    }catch(err){
        console.log("Error",err)
        res.status(401).json({
            message : "Login Failed",
            err
        })
    }
})
app.get('/getpost',(req,res)=>{
    db.query("SELECT * FROM blogs",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
app.post('/newpost',(req,res)=>{
    const { id, User, contents, likes, dislikes } = req.body;
    db.query("INSERT INTO `blogs` (`id`,`User`,`contents`,`likes`,`dislikes`) VALUES (?,?,?,?,?)",
    [id,User,contents,likes,dislikes],
    (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ Message: 'Failed to create Post' });
        } else {
            res.send({ Message: 'Created Post!' });
        }
    })
    
})
app.listen(port, () => {
    console.log(`Server running at PORT:${port}`);
});