const app=require('express')();
const http=require('http').createServer(app);
const io=require('socket.io')(http)
const cors=require('cors')

var room=[];
const port=process.env.PORT||5000;



io.on('connection',socket=>{

console.log("connected "+socket.id)
socket.on("canvas-data",data=>{

socket.to(data.room).broadcast.emit("canvas-data",data.img);


})
socket.on('sendText',data=>{
console.log("server sent" +data.data)
    socket.to(data.room).broadcast.emit("sendText",data.data);
})
socket.on('create',data=>{
    console.log(data+" joined")
room.push(data);
socket.join(data);


})

socket.on('join',data=>{
if(room.includes(data)){
socket.join(data);
console.log(data+"joined now")
socket.emit('success','')
}
else{
    socket.emit('err','No room exists');
}

})

socket.on('disconnect',()=>{
console.log("disconnected");

})
}
)
app.use(cors());
app.get('/',(req,res)=>{

res.send("server is running")
    
})
http.listen(port,()=>{

console.log(`server is listening on port ${port}`)

});