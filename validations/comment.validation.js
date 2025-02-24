import Joi from "joi";

export function commentValidate(data) {
    let commentSchema = Joi.object({
        msg_text: Joi.string().max(100).required(),
        userId: Joi.number().optional(),
        star: Joi.number().min(1).max(5).required(),
        centerId: Joi.number().required()
    });
    
    return commentSchema.validate(data, { abortEarly: false });
}
