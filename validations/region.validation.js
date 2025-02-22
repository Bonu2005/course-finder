import Joi from "joi";

export function regionValidate(data) {
    let regionSchema = Joi.object({
    name: Joi.string().min(5).max(10).required(),
    })

    return regionSchema.validate(data, { abortEarly: false });
}