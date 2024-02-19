import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: true })
export class ValidateTimeEntryConstraint implements ValidatorConstraintInterface {
  validate(check_in: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const check_out = (args.object as any)[relatedPropertyName];
    return typeof check_in === 'object' && typeof check_out === 'object' && check_in < check_out;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Check-in time must be before check-out time.';
  }
}

export function ValidateTimeEntry(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: ValidateTimeEntryConstraint,
    });
  };
}
