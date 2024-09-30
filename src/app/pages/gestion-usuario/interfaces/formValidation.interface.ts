

export interface FormValidations {
    [key: string]: {
      [key: string]: string;
    };
}

export const errores: FormValidations = {
    rol_id: { 
      required: `El rol es requerido` 
    },
    num_celular: { 
      required: `El número celular es requerido`, 
      pattern: `El número celular no tiene formato correcto`, 
      minlength: `El número celular debe tener mínimo 10 caracteres` 
    },
    name: { 
      required: `El usuario es requerido`, 
      minlength: `El usuario debe tener mínimo 3 caracteres` 
    },
    nombres: { 
      required: `El nombre es requerido`,
      pattern: `El nombre no puede tener valores numéricos ni caracteres especiales`, 
      minlength: `El nombre debe tener mínimo 3 caracteres` 
    },
    apellidos: { 
      required: `El apellido es requerido`,
      pattern: `El apellido no puede tener valores numéricos ni caracteres especiales`, 
      minlength: `El apellido debe tener mínimo 3 caracteres` 
    },
    cedula: { 
      required: `La cédula es requerido`,
      //pattern: `La cédula solo permite numeros`, 
      //minlength: `La cédula debe tener mínimo 10 caracteres`,
      cedula: `Ingrese una cédula válida`
    },
    email: { 
      required: `El correo es requerido`, 
      pattern: `El correo no tiene formato correcto` 
    }
  }; 