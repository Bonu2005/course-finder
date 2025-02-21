import Joi from "joi";

export function centerValidate(data) {
    let centerSchema = Joi.object({
        name: Joi.string().required(),
        photo: Joi.string().optional(),
        userId:Joi.number().required(),
        regionId: Joi.number().required(),
        address: Joi.string().required()
    });
    
    return centerSchema.validate(data, { abortEarly: false });
}

