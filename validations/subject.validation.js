import Joi from "joi";

export function subjectValidate(data) {
    let subjectSchema = Joi.object({
        name: Joi.string().min(2).max(10).required(),
        photo: Joi.string().optional(),
        type: Joi.string().required()
    });
    
    return subjectSchema.validate(data, { abortEarly: false });
}
