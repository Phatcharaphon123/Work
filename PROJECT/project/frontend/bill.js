const BASE_URL = 'http://localhost:8000'

window.onload = async () => {
    await loadData()
}

const loadData = async () => {
    console.log('loaded');
    const response = await axios.get(`${BASE_URL}/products`)
    console.log(response.data);

    const productDOM = document.getElementById('products')

    if (productDOM) { // ตรวจสอบว่า productDOM ไม่เป็น null ก่อนใช้งาน
        let htmlData = '<table>'
        htmlData += '<tr><th>ID</th><th>Product Name</th><th>Price</th><th>Products ID</th><th>Date</th><th>Time</th><th>User Name</th><th>Tel</th><th>Edit</th><th>Delete</th></tr>'
        for (let i = 0; i < response.data.length; i++) {
            let product = response.data[i]
            htmlData += `<tr>
                <td>${product.id}</td>
                <td>${product.product_name}</td>
                <td>${product.price}</td>
                <td>${product.product_id}</td>
                <td>${product.date}</td>
                <td>${product.time}</td>
                <td>${product.customer_name}</td>
                <td>${product.phone}</td>
                <td><a href='register.html?id=${product.id}' class='edit-button'>Edit</a></td>
                <td><button class='delete-button' data-id='${product.id}'>Delete</button></td>
                </tr>`
        }
        htmlData += '</table>'
        productDOM.innerHTML = htmlData

        const deleteDOMs = document.getElementsByClassName('delete-button')
        for (let i = 0; i < deleteDOMs.length; i++) {
            deleteDOMs[i].addEventListener('click', async (event) => {
                const id = event.target.dataset.id
                try {
                    await axios.delete(`${BASE_URL}/products/${id}`)
                    loadData() //recursive function = เรียกฟังก์ชันตัวเองซ้ำ
                } catch (error) {
                    console.log(error);
                }
            })
        }
    } else {
        console.log('productDOM is null or not found'); // ตรวจสอบว่า productDOM มีค่า null หรือไม่พบ
    }
}
