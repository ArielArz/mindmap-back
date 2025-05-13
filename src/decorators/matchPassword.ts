import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPassword implements ValidatorConstraintInterface {
  validate(passwordConfirm: string, args: ValidationArguments) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (passwordConfirm !== (args.object as any)[args.constraints[0]])
      return false;
    return true;
  }

  defaultMessage() {
    return 'Las passwords no coinciden';
  }
}