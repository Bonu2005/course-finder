function isGmail(email) {
    return typeof email === "string" && /@gmail\.\w+$/.test(email);
}

function check_phone(phone){
   return phone.startsWith("+998");
 }
    
export {isGmail, check_phone};