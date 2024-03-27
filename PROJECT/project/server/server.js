const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const cors = require('cors')
const app = express()

app.use(bodyparser.json())
app.use(cors())

const port = 8000

let conn = null

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 8840
  })
}

const validateData = (productData) => {
    let errors = []
    if (!productData.product_name) {
      errors.push('กรุณากรอกชื่อสินค้า')
    }
    if (!productData.price) {
      errors.push('กรุณากรอกราคา')
    }
    if (!productData.quantity) {
      errors.push('กรุณากรอกจำนวนคงเหลือ')
    }
    if (!productData.date) {
      errors.push('กรุณากรอกวัน')
    }
    if (!productData.time) {
      errors.push('กรุณากรอกเวลา')
    }
    if (!productData.product_id) {
      errors.push('กรุณากรอกรหัสสินค้า')
    }
    if (!productData.quantity_sold) {
      errors.push('กรุณากรอกจำนวนการขาย')
    }
    if (!productData.customer_name) {
      errors.push('กรุณากรอกชื่อลูกค้า')
    }
    if (!productData.address) {
      errors.push('กรุณากรอกอีเมล์')
    }
    if (!productData.phone) {
      errors.push('กรุณากรอกเบอร์โทรศัพท์')
    }
    return errors
  }



// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/products', async (req, res) => {
  const results = await conn.query('SELECT * FROM products')
  res.json(results[0])
})

// path = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/products', async (req, res) => {
  try {
      let product = req.body

      const errors = validateData(product)
      if (errors.length > 0) {
        throw { 
          message: 'กรอกข้อมูลไม่ครบ',
          errors: errors }
      }
      const results = await conn.query('INSERT INTO products SET ?', product)
      res.json({
        message: 'insert product successfully',
        data: results[0]
      })
  } catch (error) {
      const errorMessage = error.message || 'something went wrong'
      const errors = error.errors || []
      console.error('error message', error.message)
      res.status(500).json({
        message: errorMessage,
        errors: errors
      })
  }
})

// GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/products/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM products WHERE id = ?', id)

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

// path = PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/products/:id', async (req, res) => {
  try {
    let id = req.params.id
    let updateProducts = req.body
    const results = await conn.query(
      'UPDATE products SET ? WHERE id = ?',
      [updateProducts, id]
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


// path DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/products/:id', async (req, res) => {
  try {
    let id = req.params.id
    const results = await conn.query('DELETE from products WHERE id = ?', parseInt(id))
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