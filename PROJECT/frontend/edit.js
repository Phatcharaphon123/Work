const BASE_URL = 'http://localhost:8000'; // URL ของเซิร์ฟเวอร์ที่ใช้ในการโหลดข้อมูล

window.onload = async () => {
    await loadData(); // เมื่อหน้าเว็บโหลดเสร็จ ให้โหลดข้อมูล
}

const loadData = async () => {
    console.log('loaded');
    try {
        const response = await axios.get(`${BASE_URL}/students`); // โหลดข้อมูลนักเรียนจากเซิร์ฟเวอร์
        console.log(response.data); // แสดงข้อมูลที่ได้รับ

        const studentDOM = document.getElementById('student'); // หา DOM element ที่ใช้แสดงข้อมูลนักเรียน

        if (studentDOM) {
            let htmlData = '<table>'; // เริ่มตาราง HTML
            htmlData += '<tr><th>ID</th><th>Student Name</th><th>Age</th><th>Address</th><th>Education Level</th><th>Study Subject</th><th>Study Grade</th><th>Extra Learning Activities</th><th>Teacher Name</th><th>Edit</th><th>Delete</th></tr>'; // ส่วนหัวของตาราง

            let rowId = 1; // ตัวแปรนับแถว

            for (let i = 0; i < response.data.length; i++) {
                let student = response.data[i];
                htmlData += `<tr>
                    <td>${rowId}</td> <!-- เปลี่ยน student.id เป็น rowId -->
                    <td>${student.student_name}</td>
                    <td>${student.student_age}</td>
                    <td>${student.student_address}</td>
                    <td>${student.education_level}</td>
                    <td>${student.study_subject}</td>
                    <td>${student.study_grade}</td>
                    <td>${student.extra_learning_activities}</td>
                    <td>${student.teacher_name}</td>
                    <td><a href='information.html?id=${student.id}' class='edit-button'>Edit</a></td>
                    <td><button class='delete-button' data-id='${student.id}'>Delete</button></td>
                    </tr>`;
                rowId++; // เพิ่มค่านับแถว
            }

            htmlData += '</table>'; // ปิดตาราง HTML
            studentDOM.innerHTML = htmlData; // แทรก HTML ลงใน DOM element

            const deleteDOMs = document.getElementsByClassName('delete-button'); // หา DOM elements ที่ใช้สำหรับลบข้อมูล
            for (let i = 0; i < deleteDOMs.length; i++) {
                deleteDOMs[i].addEventListener('click', async (event) => { // เมื่อคลิกที่ปุ่มลบ
                    const id = event.target.dataset.id; // ดึงข้อมูล ID ของนักเรียนที่ต้องการลบ
                    try {
                        await axios.delete(`${BASE_URL}/students/${id}`); // ส่งคำขอลบข้อมูลไปยังเซิร์ฟเวอร์
                        loadData(); // โหลดข้อมูลใหม่
                    } catch (error) {
                        console.log(error); // แสดงข้อผิดพลาดที่เกิดขึ้น
                    }
                });
            }
        } else {
            console.log('studentDOM is null or not found'); // ถ้าไม่พบ DOM element ที่ใช้แสดงข้อมูล
        }
    } catch (error) {
        console.log(error); // แสดงข้อผิดพลาด
    }
}