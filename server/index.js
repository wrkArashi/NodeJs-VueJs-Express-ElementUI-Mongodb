//引入express
const express = require("express")
//app是express的实例
const app = express()

app.use(require('cors')())
app.use(express.json())

require("./plugins/db")(app)
require("./routes/admin")(app)

//启动
app.listen(3000,()=>{
    //启动后做什么
    console.log('http://localhost:3000')
})