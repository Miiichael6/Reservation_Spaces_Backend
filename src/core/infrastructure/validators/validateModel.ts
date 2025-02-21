import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export async function validateModel<T extends Object>(bodyModel: any, entityOrDto: new () => T): Promise<T> {
  const defaultValues = new entityOrDto();
  const bodyInQuestion = { ...defaultValues, ...bodyModel };
  const model = plainToInstance(entityOrDto, bodyInQuestion, {
    excludeExtraneousValues: true,
  });
  const errors = await validate(model);
  if (errors.length > 0) {
    const objErrors = flattenValidationErrors(errors);
    throw objErrors;
  }
  return model;
}

function flattenValidationErrors(errors: ValidationError[], parentPath: string = ""): Record<string, string[]> {
  return errors.reduce((acc: Record<string, string[]>, error: ValidationError) => {
    const currentPath = parentPath ? `${parentPath}.${error.property}` : error.property;

    if (error.constraints) {
      acc[currentPath] = Object.values(error.constraints);
    }

    if (error.children && error.children.length > 0) {
      const childrenErrors = flattenValidationErrors(error.children, currentPath);
      acc = { ...acc, ...childrenErrors };
    }

    return acc;
  }, {});
}
