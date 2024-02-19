let score=[10,20,30,40];
let newscore=score.filter((s)=>{
    if(s>=30){
        return true;
    }      
});

newscore.forEach((s)=>{
    console.log("Newscore:",s);
});
// ------------------------------------------------------------------------------------------------------------------------ 
let student=[
    {
        name:'ouu',
        age:10,
        grade:'A'
    },{
        name:'pooh',
        age:15,
        grade:'B'
    },{
        name:'phat',
        age:20,
        grade:'C'
    }];
let newstudent2=student.map((s)=>{
    s.age=s.age+10;
    return s; 
});
console.log(newstudent2);

let newstudent=student.filter((s)=>{
    if(s.age>=25){
        return true;
    }
});
console.log(newstudent);


let a="Phat";
let b="Ouu";
let c="Pooh";
let cal = (c,d,e) => {
    return c+d+e;
}
console.log(cal);

let hon=15;
kok = (hon==15);
console.log(kok);
if(kok){
    console.log("yess");
}

let count=0;
while(count<10){
    console.log(count);
    count++;
}

let count2=0;
let vov = () => {
    console.log("kuy");
}
vov();