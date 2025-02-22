import Joi from "joi";

export function centerValidate(data) {
    let centerSchema = Joi.object({
        name: Joi.string().min(5).max(10).required(),
        photo: Joi.string().optional(),
        userId:Joi.number().required(),
        regionId: Joi.number().required(),
        address: Joi.string().min(5).max(10).required()
    });
    
    return centerSchema.validate(data, { abortEarly: false });
}

