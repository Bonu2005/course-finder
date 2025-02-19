import Joi from "joi";

export function resourceValidate(data) {
    let resourceSchema = Joi.object({
    name: Joi.string().required(),
    media: Joi.string().required(),
    photo:  Joi.string().optional(),
    userId: Joi.number().required(),

    })

    return resourceSchema.validate(data, { abortEarly: false });
}