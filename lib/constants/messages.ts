// Mensajes de error para validaciones
export const VALIDATION_MESSAGES = {
    email: {
      required: 'El email es requerido',
      invalid: 'Ingresa un email válido',
    },
    password: {
      required: 'La contraseña es requerida',
      minLength: 'La contraseña debe tener al menos 6 caracteres',
    },
    confirmPassword: {
      required: 'Debes confirmar tu contraseña',
      mismatch: 'Las contraseñas no coinciden',
    },
    name: {
      required: 'El nombre es requerido',
      minLength: 'El nombre debe tener al menos 3 caracteres',
    },
  } as const;