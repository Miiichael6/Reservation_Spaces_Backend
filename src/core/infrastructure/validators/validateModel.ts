import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export async function validateModel<T extends Object>(bodyModel: any, entityOrDto: new () => T): Promise<T> {
  const defaultValues = new entityOrDto()
  const bodyInQuestion = { ...defaultValues, ...bodyModel}
  const model = plainToInstance(entityOrDto, bodyInQuestion, { excludeExtraneousValues: true });
  const errors = await validate(model);
  if (errors.length > 0) {
    const objErrors = errors.reduce((result: Record<string, string[]>, error: ValidationError) => {
      result[error.property] = Object.values(error.constraints || {});
      return result;
    }, {});
    throw objErrors;
  }
  return model;
}
