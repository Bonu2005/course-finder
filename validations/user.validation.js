import Joi from "joi";

export function userValidate(data) {
    let userSchema = Joi.object({
        fullName: Joi.string().required(),
        image: Joi.string().optional(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        type: Joi.string().required(),
        role: Joi.string().required()
    });
    
    return userSchema.validate(data, { abortEarly: false });
}
