const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection= require("./mongodb") //to get exported collection
const templatePath = path.join(__dirname, '../templates')
app.use(express.urlencoded({extended:false}))
// app.use(express.static('public'));

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
// app.use(express.json())

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/', (req, res) => {
    res.render('login')
})


app.post("/register", async (req, res) => {
    const data = {
        name: req.body.name,
        password:req.body.password
    }
    
    await LogInCollection.insertMany([data])
    // after details are collected, redir to the home page:
    res.render("home")
})
// should be the same as "action". We've to use async await to work w/ mongodb

app.post("/login", async (req, res) => {

    try {
        
        const check = await LogInCollection.findOne({ name: req.body.name })
        if (check.password == req.body.password) {
            res.render("home")
        }

        else {
            res.send("wrong password")
        }
    }
    catch {
        res.send("wrong details")
    }
})

app.listen(3000, () => {
    console.log("Server is on");
})


