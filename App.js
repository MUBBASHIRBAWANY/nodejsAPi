const express = require('express')
const app = express()
const userModel = require('./Models/user')
const conection = require('./Config/db.js')
var cors = require('cors');
app.use(cors())

app.get('/', (req,res) =>{
    userModel.find({}).then((users)=>{
        const apiKey = process.env
        console.log(apiKey)
        res.send(users)
    })
})


app.get('/users', (req,res) =>{
    userModel.find({}).then((users)=>{
        const apiKey = process.env
        console.log(apiKey)
        res.send(users)
    })
})

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.post('/adduser', async (req,res)=>{
    const {username,email,password} = req.body
    await userModel.create({
        username : username,
        email : email,
        password: password

    })

    res.send("Data Recived")
})

app.put('/updateuser', async (req,res)=>{
    const {id, username, email, password } = req.body 
    await userModel.findByIdAndUpdate({
        _id : id
    },
    {
        username: username,
        email : email,
        password : password
    }
)

res.send("Data Update")
})


app.delete('/deleteuser', async (req,res)=>{
    const {id} = req.body
    console.log(id)
    await userModel.findByIdAndDelete({
        _id : id
    })

    res.send("delete")
})

app.listen(3000)
