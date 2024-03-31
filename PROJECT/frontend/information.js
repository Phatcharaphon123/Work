const BASE_URL = 'http://localhost:8000'; // URL ของเซิร์ฟเวอร์ API

let mode = "CREATE"; // โหมดการทำงานเริ่มต้นเป็นสร้าง (CREATE)
let selectedId = ""; // ID ของข้อมูลที่ถูกเลือกเพื่อแก้ไข

// เมื่อหน้าเว็บโหลดเสร็จสิ้น
window.onload = async () => {
    // ดึงพารามิเตอร์ ID จาก URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
        mode = "EDIT"; // ถ้ามี ID ใน URL กำหนดโหมดการทำงานเป็นแก้ไข (EDIT)
        selectedId = id; // กำหนด ID ที่ถูกเลือกไว้

        try {
            // ดึงข้อมูลนักเรียนจากเซิร์ฟเวอร์โดยใช้ ID
            const response = await axios.get(`${BASE_URL}/students/${id}`);
            const student = response.data;

            // ดึง DOM element ของ input และ select ที่ต้องใช้
            let student_nameDOM = document.querySelector("input[name=student_name]");
            let student_ageDOM = document.querySelector("input[name=student_age]");
            let student_addressDOM = document.querySelector("input[name=student_address]");
            let education_levelDOM = document.querySelector("select[name=education_level]");
            let study_subjectDOM = document.querySelector("input[name=study_subject]");
            let study_gradeDOM = document.querySelector("input[name=study_grade]");
            let extra_learning_activitiesDOM = document.querySelector("input[name=extra_learning_activities]");
            let teacher_nameDOM = document.querySelector("input[name=teacher_name]");
            let teaching_subjectDOM = document.querySelector("input[name=teaching_subject]");
            let class_timeDOM = document.querySelector("input[name=class_time]");

            // กำหนดค่าข้อมูลให้กับ input และ select ตามข้อมูลที่ดึงมา
            student_nameDOM.value = student.student_name;
            student_ageDOM.value = student.student_age;
            student_addressDOM.value = student.student_address;
            education_levelDOM.value = student.education_level;
            study_subjectDOM.value = student.study_subject;
            study_gradeDOM.value = student.study_grade;
            extra_learning_activitiesDOM.value = student.extra_learning_activities;
            teacher_nameDOM.value = student.teacher_name;
            teaching_subjectDOM.value = student.teaching_subject;
            class_timeDOM.value = student.class_time;

        } catch (error) {
            console.log("Error", error);
        }
    }
}

// ฟังก์ชันตรวจสอบความถูกต้องของข้อมูลนักเรียน
const validateData = (studentData) => {
    let errors = []
    if (!studentData.student_name) {
        errors.push("กรุณากรอกชื่อ");
    }
    if (!studentData.student_age) {
        errors.push("กรุณากรอกอายุ");
    }
    if (!studentData.student_address) {
        errors.push("กรุณากรอกที่อยู่");
    }
    if (!studentData.education_level) {
        errors.push("กรุณากรอกระดับการศึกษา");
    }
    if (!studentData.study_subject) {
        errors.push("กรุณากรอกวิชา");
    }
    if (!studentData.study_grade) {
        errors.push("กรุณากรอกเกรด");
    }
    if (!studentData.extra_learning_activities) {
        errors.push("กรุณากรอกกิจกรรมเสริมการเรียน");
    }
    if (!studentData.teacher_name) {
        errors.push("กรุณากรอกชื่อครูผู้สอน");
    }
    if (!studentData.teaching_subject) {
        errors.push("กรุณากรอกวิชาที่สอน");
    }
    if (!studentData.class_time) {
        errors.push("กรุณากรอกเวลาเรียน");
    }
    return errors;
}

// ฟังก์ชันสำหรับส่งข้อมูลนักเรียนไปยังเซิร์ฟเวอร์
const submitData = async () => {
    // ดึง DOM element ของ input และ select ที่ต้องใช้
    let student_nameDOM = document.querySelector("input[name=student_name]");
    let student_ageDOM = document.querySelector("input[name=student_age]");
    let student_addressDOM = document.querySelector("input[name=student_address]");
    let education_levelDOM = document.querySelector("select[name=education_level]");
    let study_subjectDOM = document.querySelector("input[name=study_subject]");
    let study_gradeDOM = document.querySelector("input[name=study_grade]");
    let extra_learning_activitiesDOM = document.querySelector("input[name=extra_learning_activities]");
    let teacher_nameDOM = document.querySelector("input[name=teacher_name]");
    let teaching_subjectDOM = document.querySelector("input[name=teaching_subject]");
    let class_timeDOM = document.querySelector("input[name=class_time]");

    let messageDOM = document.getElementById('message');

    try {
        // กำหนดข้อมูลนักเรียนจากค่าที่ได้จาก DOM elements
        let studentData = {
            student_name: student_nameDOM.value,
            student_age: student_ageDOM.value,
            student_address: student_addressDOM.value,
            education_level: education_levelDOM.value,
            study_subject: study_subjectDOM.value,
            study_grade: study_gradeDOM.value,
            extra_learning_activities: extra_learning_activitiesDOM.value,
            teacher_name: teacher_nameDOM.value,
            teaching_subject: teaching_subjectDOM.value,
            class_time: class_timeDOM.value
        }

        // ตรวจสอบความถูกต้องของข้อมูล
        const errors = validateData(studentData);
        if (errors.length > 0) {
            throw {
                message: "กรอกข้อมูลไม่ครบถ้วน",
                errors: errors
            };
        }

        let message = "บันทึกข้อมูลเรียบร้อย";
        let response;
        // ตรวจสอบโหมดการทำงานเพื่อเลือกว่าจะใช้ HTTP method ไหน
        if (mode === "CREATE") {
            response = await axios.post(`${BASE_URL}/students`, studentData);
            console.log('response', response.data);
        } else {
            response = await axios.put(`${BASE_URL}/students/${selectedId}`, studentData);
            message = "แก้ไขข้อมูลเรียบร้อย";
            console.log('response', response.data);
        }

        // แสดงข้อความสำเร็จ
        messageDOM.innerText = message;
        messageDOM.className = "message success";
    } catch (error) {
        console.log('error message', error.message);
        console.log("error", error.errors);

        // แปลงข้อความและข้อมูลผิดพลาดเป็นรูปแบบ HTML
        if (error.response) {
            console.log(error.response.data.message)
            error.message = error.response.data.message;
            error.errors = error.response.data.errors;
        }

        let htmlData = '<div>';
        htmlData += `<div>${error.message}</div>`;
        htmlData += '<ul>';
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`;
        }
        htmlData += '</ul>';
        htmlData += '</div>';

        // แสดงข้อความแจ้งเตือนเกี่ยวกับข้อผิดพลาด
        messageDOM.innerHTML = htmlData;
        messageDOM.className = "message danger";
    }
};