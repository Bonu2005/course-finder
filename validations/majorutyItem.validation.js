import Joi from "joi";

export function majorityItemValidate(data) {
    let majorityItemSchema = Joi.object({
        centerId: Joi.number().required(),
        majorityId: Joi.number().required()
    })
    return majorityItemSchema.validate(data, { abortEarly: false });

}