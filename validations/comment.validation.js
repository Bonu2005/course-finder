import Joi from "joi";

export function commentValidate(data) {
    let commentSchema = Joi.object({
        msg_text: Joi.string().required(),
        userId: Joi.number().required(),
        star: Joi.number().min(1).max(5).required(),
        centerId: Joi.number().required()
    });
    
    return commentSchema.validate(data, { abortEarly: false });
}
