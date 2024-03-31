const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const cors = require('cors')
const app = express()

app.use(bodyparser.json()) // เรียกใช้ middleware body-parser เพื่อแปลงข้อมูล JSON ที่รับเข้ามา
app.use(cors()) // เรียกใช้ middleware cors เพื่ออนุญาตการแชร์ข้อมูลระหว่างโดเมนต่าง

const port = 8000 // กำหนดพอร์ตที่เซิร์ฟเวอร์จะทำงาน

let conn = null

// ฟังก์ชันเพื่อเชื่อมต่อกับ MySQL
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 8820
  })
}

// ฟังก์ชันสำหรับตรวจสอบความถูกต้องของข้อมูลนักเรียน
// ตรวจสอบข้อมูลแต่ละส่วนว่ามีค่าว่างหรือไม่ และเพิ่มข้อผิดพลาดใน errors array ตามเงื่อนไข
// ส่งคืน errors array  
const validateData = (studentData) => {
  let errors = []
  if (!studentData.student_name) {
    errors.push("กรุณากรอกชื่อ")
  }
  if (!studentData.student_age) {
    errors.push("กรุณากรอกอายุ")
  }
  if (!studentData.student_address) {
    errors.push("กรุณากรอกที่อยู่")
  }
  if (!studentData.education_level) {
    errors.push("กรุณากรอกระดับการศึกษา")
  }
  if (!studentData.study_subject) {
    errors.push("กรุณากรอกวิชา")
  }
  if (!studentData.study_grade) {
    errors.push("กรุณากรอกเกรด")
  }
  if (!studentData.extra_learning_activities	) {
    errors.push("กรุณากรอกกิจกรรมเสริมการเรียน")
  }
  if (!studentData.teacher_name) {
    errors.push("กรุณากรอกชื่อครูผู้สอน")
  }
  if (!studentData.teaching_subject) {
    errors.push("กรุณากรอกวิชาที่สอน")
  }
  if (!studentData.class_time) {
    errors.push("กรุณากรอกเวลาเรียน")
  }
  return errors
}


// path = GET /students สำหรับ get students ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/students', async (req, res) => {
  const results = await conn.query('SELECT * FROM Educational')
  // ดึงข้อมูลนักเรียนทั้งหมดจากฐานข้อมูลและส่งกลับเป็น JSON response
  res.json(results[0])
})

// path = POST /students สำหรับการสร้าง students ใหม่บันทึกเข้าไป
app.post('/students', async (req, res) => {
  try {
      let student = req.body
      const errors = validateData(student)
      if (errors.length > 0) {
        throw { 
          message: 'กรอกข้อมูลไม่ครบ',
          errors: errors }
      }
      const results = await conn.query('INSERT INTO Educational SET ?', student)
      res.json({
        message: 'insert ok',
        data: results[0]
      })
  } catch (error) {
      const errorMessage = error.message || 'something wrong'
      const errors = error.errors || []
      console.error('error message', error.message)
      res.status(500).json({
        message: errorMessage,
        errors: errors
      })
  }
})

// GET /students/:id สำหรับการดึง students รายคนออกมา
app.get('/students/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM Educational WHERE id = ?', id)

    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }

    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

// path = PUT /students/:id สำหรับการแก้ไข students รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/students/:id', async (req, res) => {
  try {
    let id = req.params.id
    let updateStudent = req.body
    const results = await conn.query(
      'UPDATE Educational SET ? WHERE id = ?',
      [updateStudent, id]
    )
    res.json({
      message: 'update ok',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong'
    })
  }
})


// path DELETE /students/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/students/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('DELETE from Educational WHERE id = ?', parseInt(id))
    res.json({
      message: 'delete ok',
      data: results[0]
    })
  } catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something wrong'
    })
  }
})

app.listen(port, async (req, res) => {
  await initMySQL()
  console.log('http server run at ' + port)
})