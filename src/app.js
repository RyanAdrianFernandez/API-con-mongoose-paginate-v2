import express from "express"
import mongodb from "./database.js"
import productRouter from "./routes/products.router.js"

const app = express()

app.listen(8080, ()=>{
    console.log("listening on")
})

app.use(express.json())
app.use("/", productRouter)