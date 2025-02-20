function isGmail(email) {
    return typeof email === "string" && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}

function check_phone(phone){
   return phone.startsWith("+998");
 }
    
export {isGmail, check_phone};  