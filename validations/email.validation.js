function isGmail(email) {
    return typeof email === "string" && email.endsWith("@gmail.com");
}

export default isGmail;