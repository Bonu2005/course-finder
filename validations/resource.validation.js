import Joi from "joi";
export function resourceValidate(data) {
    let resourceSchema = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    media: Joi.string().required(),
    photo:  Joi.string().optional(),
    userId: Joi.number().optional(),
    description:Joi.string().required().max(100).min(2),
    resourseCategoryId:Joi.number().required()
    })
    return resourceSchema.validate(data, { abortEarly: false });
}