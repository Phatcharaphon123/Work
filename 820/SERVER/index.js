const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();

app.use(bodyParser.json());

const port = 8000;
// สำหรับเก็บ users
let users = []
let counter = 1;

app.get('/testdb', (req, res) => {
  mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'root',
     database: 'webdb',
     port: 8820
   }).then((conn) =>{
     conn
     .query('SELECT * FROM users')
     .then((results) => {
       res.json(results[0]);
     })
   })
 })

 // path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users', (req, res) => {
  const filterUsers = users.map(user => {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.firstname + ' ' + user.lastname
    }
  })
  res.json(filterUsers);
})

// path = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', (req, res) => {
  let user = req.body;
  user.id = counter
  counter += 1
  users.push(user);
  res.json({
    message: 'Add new user successfully',
    user: user
  });
})

// path = GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id', (req, res) => {
  let id = req.params.id

// หา index
  let seletedIndex = users.findIndex(user => user.id == id)

  res.json(users[seletedIndex]);
})


//path = PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id', (req, res) => {
  let id = req.params.id;
  let updateUser = req.body;
  // ค้นหาข้อมูล users
  let seletedIndex = users.findIndex(user => user.id == id)

  // update ข้อมูล user (null || 'ทดสอบ')
    users[seletedIndex].firstname = updateUser.firstname || users[seletedIndex].firstname
    users[seletedIndex].lastname = updateUser.lastname || users[seletedIndex].lastname
    users[seletedIndex].age = updateUser.age || users[seletedIndex].age
    users[seletedIndex].gender = updateUser.gender || users[seletedIndex].gender

  res.json({
    message: 'Update user successfully',
    data:{
      user: updateUser,
      indexUpdate: seletedIndex
    }
  })
})

// path = DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id', (req, res) => {
  let id = req.params.id
  //หาก่อนว่า index ของ user ที่ต้องการลบอยู่ที่ index ไหน
  let seletedIndex = users.findIndex(user => user.id == id)
  //ลบ users ออก
  users.splice(seletedIndex, 1)
  res.json({
    message: 'Delete user successfully',
      indexDelete: seletedIndex
  })
})

app.listen(port, (req, res) => {
    console.log('http server running on', + port);
})