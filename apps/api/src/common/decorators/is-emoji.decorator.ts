import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Regex pattern to match emoji characters
const EMOJI_REGEX = /^(?:\p{Extended_Pictographic}|\p{Emoji_Component})$/u;

/**
 * Class representing a custom emoji validator constraint
 */
@ValidatorConstraint({ name: 'IsEmoji', async: false })
export class IsEmojiConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    if (typeof value !== 'string') return false;

    return EMOJI_REGEX.test(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must contain only emoji characters`;
  }
}

/**
 * Function representing an emoji validation decorator
 */
export function IsEmoji(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmojiConstraint,
    });
  };
}
