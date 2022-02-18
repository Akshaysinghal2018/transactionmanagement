const nameregex=/^[a-zA-Z]{2,20}$/
const emailregex=    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const mobileregex=/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
const addressregex= /^[a-zA-Z!@#&*]{2,50}$/
const passwordregex= /^[a-zA-Z0-9!@#$%^&*(){}]{7,22}$/
const validatename=(data)=>{
    
    if(nameregex.test(data)==true){
        return("")
    }
    else{
        return("invalid name and length should be more than 2")
    }
}
const validateemail=(data)=>{
    if(emailregex.test(data)==true){
        return("")
    }
    else{
        return("invalid email format.")
    }
}
const validatemobile=(data)=>{
    if(mobileregex.test(data)==true){
        return("")
    }
    else{
        return("invalid mobile format.")
    }
}
const validateaddress=(data)=>{
    if(addressregex.test(data)==true){
        return("")
    }
    else{
        return("invalid address format. or length should greater than 5")
    }
}
const validatepassword=(data)=>{
    if(passwordregex.test(data)==true){
        return("")
    }
    else{
        return("invalid password format or length should more than 7.")
    }
}
module.exports= {validateemail,validatename,validatemobile,validateaddress,validatepassword}