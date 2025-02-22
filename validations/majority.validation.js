import Joi from "joi";

export function majorityValidate(data) {
    let majoritySchema = Joi.object({
        name: Joi.string().min(2).max(40).required(),
        photo: Joi.string().optional(),
        subjectId: Joi.number().required()
    });
    
    return majoritySchema.validate(data, { abortEarly: false });
}
