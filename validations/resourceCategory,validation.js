import Joi from "joi";

export function resourseCategoryValidate(data) {
    let resourseCategorySchema = Joi.object({
        name: Joi.string().required(),
        photo: Joi.string().optional()
    });
    
    return resourseCategorySchema.validate(data, { abortEarly: false });
}
