import winston, { level } from "winston";
const {combine,timestamp,printf}=winston.format

const myFormat= printf(
    ({level,message,label,timestamp})=>{
        return `${timestamp} [${label}] ${level}:${message}`
    }
)
export let logger=winston.createLogger({
    level:"info",
    format:combine(timestamp(),myFormat),
    transports:[
        new winston.transport.File({
            level:"info",
            filname:"logs/info.log"
        }),
        new winston.transport.File({
            level:"warn",
            filename:"logs/warn.log"
        }),
        new winston.transport.File({
            level:"error",
            filename:"logs/error.log"
        }),
        
    ]
})