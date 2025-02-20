function isGmail(email) {
    return typeof email === "string" && email.endsWith("@gmail.com");
}



function check_phone(phone){
        return phone.startsWith("+998");
    }
    
export {isGmail, check_phone};  