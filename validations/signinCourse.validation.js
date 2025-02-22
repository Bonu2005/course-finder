import Joi from "joi";

export function signinCourseValidate(data) {
    let signinCourseSchema = Joi.object({
        userId: Joi.number().optional(),
        majorityId: Joi.number().required(),
        filialId: Joi.number().required()
    });
    
    return signinCourseSchema.validate(data, { abortEarly: false });
}
