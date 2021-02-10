const app=require('express')();
const http=require('http').createServer(app);
const io=require('socket.io')(http,{
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
})

let room;
const port=process.env.PORT||5000;



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