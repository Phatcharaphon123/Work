const validateData = (userData) => {
    let errors = []
    if (!userData.firstname){
    errors.push('กรุณากรอกชื่อ')
}
    if (!userData.lastname){
    errors.push('กรุณากรอกนามสกุล')
}
    if (!userData.age){
    errors.push('กรุณากรอกอายุ')
}
    if (!userData.gender){
    errors.push('กรุณากรอกเพศ')
}
    if (!userData.interest){
    errors.push('กรุณาเลือกสิ่งที่สนใจ')
}
    if (!userData.description){
    errors.push('กรุณากรอกคำอธิบาย')
}
    return errors
}

const submitData = async () => {

    let firstnameDOM=document.querySelector('input[name=firstname]')
    let lastnameDOM=document.querySelector('input[name=lastname]')
    let ageDOM=document.querySelector('input[name=age]')

    let genderDOM=document.querySelector('input[name=gender]:checked') ||{}
    let interestDOMs=document.querySelectorAll('input[name=interest]:checked') ||{}
    
    let messageDOM=document.getElementById('message')

    let descriptionDOM=document.querySelector('textarea[name=description]')

    console.log('test')

    try{
        let interest = ''

        for(let i=0;i<interestDOMs.length;i++){
            interest += interestDOMs[i].value
            if(i != interestDOMs.length-1){
                interest += ','
            }
        }
        
        let userData = {
            firstname: firstnameDOM.value,
            lastname: lastnameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: descriptionDOM.value,
            interests: interest
        


        }
        console.log('sumit Data', userData)

            const errors = validateData(userData)

            if (errors.length > 0){
                 //มี error เกิดขึ้น
                throw {
                    message:'กรอกข้อมูลให้ครบถ้วน',
                    errors:errors
                }
            }

        const response= await axios.post('http://localhost:8000/users',userData)
        console.log('submit data',userData)
        messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อย'
        messageDOM.className = 'message success'
}catch(error){
    console.log('error message', error.message)
    console.log('error', error.errors)
    if(error.response){
        console.log(error.response.data.message)
        }
        let htmlData ='<div>'
        htmlData += `<div>'${error.message}<div>`
        htmlData += '</ul>'
        for(let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`;
        }
        htmlData += '</div>';
        messageDOM.innerHTML = htmlData; // ใช้ innerHTML เพื่อใส่ HTML ลงใน element
        messageDOM.className = 'message danger';
    }
};
