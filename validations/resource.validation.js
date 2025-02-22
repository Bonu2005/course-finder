import Joi from "joi";
export function resourceValidate(data) {
    let resourceSchema = Joi.object({
    name: Joi.string().min(5).max(10).required(),
    media: Joi.string().required(),
    photo:  Joi.string().optional(),
    userId: Joi.number().required()
    })
    return resourceSchema.validate(data, { abortEarly: false });
}