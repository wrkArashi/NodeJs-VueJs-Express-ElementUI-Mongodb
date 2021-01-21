//引入express
const express = require("express")
//app是express的实例
const app = express()

app.set('secret','efjjirenqkivncjd')

app.use(require('cors')())
app.use(express.json())

//静态文件托管
app.use('/uploads',express.static(__dirname + '/uploads'))

require("./plugins/db")(app)
require("./routes/admin")(app)

//启动
app.listen(3000,()=>{
    //启动后做什么
    console.log('http://localhost:3000')
})