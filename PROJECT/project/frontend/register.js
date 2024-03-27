const BASE_URL = 'http://localhost:8000'

let mode = 'CREATE'
let selectedId = '' //ตัวแปรแบบ Golbal ใช้ได้ทุกที่

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  console.log('id', id)
  if (id) {
    mode = 'EDIT'
    selectedId = id

    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`)
        const product = response.data
  
        let product_nameDOM = document.querySelector('input[name=product_name]')
        let priceDOM = document.querySelector('input[name=price]')
        let quantityDOM = document.querySelector('input[name=quantity]')
      
        let dateDOM = document.querySelector('input[name=date]')
        let timeDOM = document.querySelector('input[name=time]')
        let product_idDOM = document.querySelector('input[name=product_id]')
        let quantity_soldDOM = document.querySelector('input[name=quantity_sold]')
  
        let customer_nameDOM = document.querySelector('input[name=customer_name]')
        let addressDOM = document.querySelector('input[name=address]')
        let phoneDOM = document.querySelector('input[name=phone]')
  
        product_nameDOM.value = product.product_name
        priceDOM.value = product.price
        quantityDOM.value = product.quantity
  
        dateDOM.value = product.date
        timeDOM.value = product.time
        product_idDOM.value = product.product_id
        quantity_soldDOM.value = product.quantity_sold
  
        customer_nameDOM.value = product.customer_name
        addressDOM.value = product.address
        phoneDOM.value = product.phone
  
      } catch (error) {
        console.log('error', error)
      }
  }
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
        errors.push('กรุณากรอกชื่อ User')
      }
      if (!productData.address) {
        errors.push('กรุณากรอกอีเมล์')
      }
      if (!productData.phone) {
        errors.push('กรุณากรอกเบอร์โทรศัพท์')
      }
      return errors
  }

  const submitData = async () => {
    let product_nameDOM = document.querySelector('input[name=product_name]')
    let priceDOM = document.querySelector('input[name=price]')
    let quantityDOM = document.querySelector('input[name=quantity]')
    let dateDOM = document.querySelector('input[name=date]')
    let timeDOM = document.querySelector('input[name=time]')
    let product_idDOM = document.querySelector('input[name=product_id]')
    let quantity_soldDOM = document.querySelector('input[name=quantity_sold]')
    let customer_nameDOM = document.querySelector('input[name=customer_name]')
    let addressDOM = document.querySelector('input[name=address]')
    let phoneDOM = document.querySelector('input[name=phone]')

    let messageDOM = document.getElementById('message')
    try {
      console.log('test')
      let productData = {
        product_name: product_nameDOM.value,
        price: priceDOM.value,
        quantity: quantityDOM.value,
        date: dateDOM.value,
        time: timeDOM.value,
        product_id: product_idDOM.value,
        quantity_sold: quantity_soldDOM.value,
        customer_name: customer_nameDOM.value,
        address: addressDOM.value,
        phone: phoneDOM.value
      }
      console.log('submit data', productData)

      const errors = validateData(productData)

      if (errors.length > 0) {
        throw {
          message: 'กรอกข้อมูลไม่ครบถ้วน',
          errors: errors
        }
      }

      let message = 'บันทึกข้อมูลสำเร็จ!'

      if(mode == 'CREATE'){
        const response = await axios.post(`${BASE_URL}/products`, productData)
        console.log('response', response.data)
      } else {
        const response = await axios.put(`${BASE_URL}/products/${selectedId}`, productData)
        message = 'แก้ไขข้อมูลสำเร็จ!'
        console.log('response', response.data)
      }
      messageDOM.innerText = message
      messageDOM.className = 'message success'

    } catch (error) {
      console.log('error message', error.message)
      console.log('error', error.erros)
      if (error.response) {
        console.log(error.response)
        error.message = error.response.data.message
        error.errors = error.response.data.errors
      }

      let htmlData = '<div>'
      htmlData += `<div>${error.message}</div>`
      htmlData += '<ul>'
      for (let i = 0; i < error.errors.length;i++) {
        htmlData += `<li>${error.errors[i]}</li>`
      }
      htmlData += '</ul>'
      htmlData += '<div>'


      messageDOM.innerHTML = htmlData
      messageDOM.className = 'message danger'
    }
  }