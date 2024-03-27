const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    console.log('loaded');
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        console.log(response.data);

        const studentDOM = document.getElementById('user');

        if (studentDOM) {
            let htmlData = '<table>';
            htmlData += '<tr><th>ID</th><th>Student Name</th><th>Age</th><th>Address</th><th>Education Level</th><th>Study Subject</th><th>Study Grade</th><th>Extra Learning Activities</th><th>Teacher Name</th><th>Edit</th><th>Delete</th></tr>';

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

            htmlData += '</table>';
            studentDOM.innerHTML = htmlData;

            const deleteDOMs = document.getElementsByClassName('delete-button');
            for (let i = 0; i < deleteDOMs.length; i++) {
                deleteDOMs[i].addEventListener('click', async (event) => {
                    const id = event.target.dataset.id;
                    try {
                        await axios.delete(`${BASE_URL}/users/${id}`);
                        loadData();
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        } else {
            console.log('studentDOM is null or not found');
        }
    } catch (error) {
        console.log(error);
    }
}