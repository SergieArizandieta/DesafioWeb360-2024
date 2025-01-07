import * as yup from 'yup';

const emailSchema = yup.string()
  .email("Email no válido")
  .required("Email es requerido");

const passwordSchema = yup.string()
  .required("Contraseña es requerida");

export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});