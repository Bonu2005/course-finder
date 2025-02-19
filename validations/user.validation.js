import Joi from "joi";
export function userValidate(data) {
    let userSchema = Joi.object({
        fullName: Joi.string().required(),
        image: Joi.string().optional().allow(null),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        type: Joi.string().optional(),
        role: Joi.string().optional()
    });
    
    return userSchema.validate(data, { abortEarly: false });
}

export default userValidate;