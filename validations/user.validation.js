import Joi from "joi";
function userValidate(data) {
    let userSchema = Joi.object({
        fullName: Joi.string().min(2).max(30).required(),
        image: Joi.string().optional().allow(null),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.string().min(12).max(12).required(),
        type: Joi.string().optional(),
        role: Joi.string().optional()
    })
    return userSchema.validate(data,{abortEarly:false});
}


function usersPatchValidate(data) {
    let userPatchSchema = Joi.object({
        fullName: Joi.string().min(2).max(10).optional(),
        image: Joi.string().optional().allow(null),
        email: Joi.string().optional(),
        password: Joi.string().optional(),
        phone: Joi.string().min(12).max(12).optional(),
        type: Joi.string().optional(),
        role: Joi.string().optional()
    })
    return userPatchSchema.validate(data,{abortEarly:false});
}


export { usersPatchValidate, userValidate};