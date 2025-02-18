import Joi from "joi";

export function likeValidate(data) {
    let likeSchema = Joi.object({
        userId: Joi.number().required(),
        centerId: Joi.number().required()
    });
    
    return likeSchema.validate(data, { abortEarly: false });
}
