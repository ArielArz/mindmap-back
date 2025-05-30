import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'FileTypeValidator', async: false })
export class FileTypeValidator implements ValidatorConstraintInterface {
  validate(file: Express.Multer.File, args: ValidationArguments) {
    const allowedTypes = args.constraints[0] as string[];
    return file && allowedTypes.includes(file.mimetype);
  }
}

@ValidatorConstraint({ name: 'MaxFileSizeValidator', async: false })
export class MaxFileSizeValidator implements ValidatorConstraintInterface {
  validate(file: Express.Multer.File, args: ValidationArguments) {
    const maxSize = args.constraints[0] as number;
    return file && file.size <= maxSize;
  }
}
