import Joi from "joi";

export function centerValidate(data) {
    let centerSchema = Joi.object({
        name: Joi.string().min(5).max(30).required(),
        photo: Joi.string().optional(),
        userId:Joi.number().optional(),
        regionId: Joi.number().required(),
        address: Joi.string().min(5).max(100).required()
    });
    
    return centerSchema.validate(data, { abortEarly: false });
}

