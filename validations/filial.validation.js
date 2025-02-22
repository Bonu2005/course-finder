import Joi from "joi";

export function filialValidate(data) {
    let filialSchema = Joi.object({
        location: Joi.string().min(5).max(10).required(),
        photo: Joi.string().optional(),
        regionId: Joi.number().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        centerId: Joi.number().required()
    });
    
    return filialSchema.validate(data, { abortEarly: false });
}
