import Joi from "joi";

export function subjectValidate(data) {
    let subjectSchema = Joi.object({
        name: Joi.string().required(),
        photo: Joi.string().optional(),
        type: Joi.string().required()
    });
    
    return subjectSchema.validate(data, { abortEarly: false });
}
