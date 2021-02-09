const app=require('express')();
const http=require('http').createServer(app);
const io=require('socket.io')(http)
const cors=require('cors');
const port=process.env.PORT||5000;



io.on('connection',socket=>{

console.log("connected "+socket.id)
socket.on("canvas-data",data=>{

socket.broadcast.emit("canvas-data",data);
})

})
http.listen(port,()=>{

console.log(`server is listening on port ${port}`)

});