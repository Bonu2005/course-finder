import Joi from "joi";

export function regionValidate(data) {
    let regionSchema = Joi.object({
    name: Joi.string().required()
    })

    return regionSchema.validate(data, { abortEarly: false });
}