const app=require('express')();
const http=require('http').createServer(app);
const io=require('socket.io')(http,{ wsEngine: 'ws' })
const cors=require('cors');
let room;
const port=process.env.PORT||5000;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

io.on('connection',socket=>{

console.log("connected "+socket.id)
socket.on("canvas-data",data=>{

socket.broadcast.emit("canvas-data",data.img);


})
socket.on('sendText',data=>{
console.log("server sent" +data.data)
    socket.to(data.room).broadcast.emit("sendText",data.data);
})
socket.on('create',data=>{
    console.log(data+" joined")
room=data;
socket.join(data);


})


})
http.listen(port,()=>{

console.log(`server is listening on port ${port}`)

});