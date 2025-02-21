import Joi from "joi";

export function majorityValidate(data) {
    let majoritySchema = Joi.object({
        name: Joi.string().required(),
        photo: Joi.string().optional(),
        subjectId: Joi.number().required()
    });
    
    return majoritySchema.validate(data, { abortEarly: false });
}
