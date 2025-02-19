import Joi from "joi";

export function signinCourseValidate(data) {
    let signinCourseSchema = Joi.object({
        userId: Joi.number().required(),
        majorityId: Joi.number().required(),
        centerId: Joi.number().required()
    });
    
    return signinCourseSchema.validate(data, { abortEarly: false });
}
