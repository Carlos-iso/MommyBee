import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;

          const cpf = value.replace(/\D/g, '');

          // Modo demo: aceita qualquer CPF com 11 dígitos
          if (
            process.env.NODE_ENV?.toLowerCase() === 'development' ||
            process.env.CPF_BYPASS === 'true'
          ) {
            return cpf.length === 11;
          }

          if (cpf.length !== 11) return false;

          if (/^(\d)\1{10}$/.test(cpf)) return false;

          let sum = 0;
          for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf[i]) * (10 - i);
          }
          let digit1 = (sum * 10) % 11;
          if (digit1 === 10) digit1 = 0;
          if (parseInt(cpf[9]) !== digit1) return false;

          sum = 0;
          for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf[i]) * (11 - i);
          }
          let digit2 = (sum * 10) % 11;
          if (digit2 === 10) digit2 = 0;
          if (parseInt(cpf[10]) !== digit2) return false;

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return 'CPF inválido';
        },
      },
    });
  };
}
