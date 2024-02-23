//ทำการ import http เข้ามาเพือทำการรัน server
const http = require('http');

//กำหนด  host และ port เริ่มต้น
const host = 'localhost'
const port = 8000

//กำหนด ค่าเริ่มต้นของ server เมื่อเปิดหน้าเว็บที่ localhost:8000 ขึ้นมา
const requirelistener = function(req, res) {
    res.writeHead(200)
    res.end('My first server!');
}  

//ทำการ run server
const server = http.createServer(requirelistener)
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)})




