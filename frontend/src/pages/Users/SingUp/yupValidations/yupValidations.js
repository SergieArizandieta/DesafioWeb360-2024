import * as yup from 'yup';

const dpiSchema = yup.string()
  .required("DPI es requerido")
  .matches(/^[0-9]{13}$/, "DPI no válido");

const emailSchema = yup.string()
  .email("Email no válido")
  .required("Email es requerido");

const fullNameSchema = yup.string()
  .required("Nombre completo es requerido")
  .matches(/^[a-zA-Z\s]+$/, "Nombre completo no válido");

const passwordSchema = yup.string()
  .required("Contraseña es requerida")
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .max(16, "La contraseña debe tener como máximo 16 caracteres")
  .matches(/[A-Z]/, "La contraseña debe incluir al menos una letra mayúscula")
  .matches(/[a-z]/, "La contraseña debe incluir al menos una letra minúscula")
  .matches(/[0-9]/, "La contraseña debe incluir al menos un número")
  .matches(/[\W_]/, "La contraseña debe incluir al menos un carácter especial: !@#$%^&*()");

const confirmPassSchema = yup.string()
  .required("Confirmar contraseña es requerido")
  .oneOf([yup.ref('password')], "Las contraseñas no coinciden");

const phoneSchema = yup.string()
  .required("Número de teléfono es requerido")
  .matches(/^[0-9]{8}$/, "Número de teléfono no válido");

const birthDateSchema = yup.date()
  .typeError("Fecha de nacimiento no válida")
  .required("Fecha de nacimiento es requerida")
  .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), "Debes ser mayor de edad");


const sourceSchema = yup.string()
  .required("Fuente es requerida");

const resonSchema = yup.string()
  .required("Razón es requerida");

const addressSchema = yup.string()
  .required("Dirección es requerida");
  

export const registerSchema = yup.object().shape({
  id_userDPI: dpiSchema,
  email: emailSchema,
  full_name: fullNameSchema,
  password: passwordSchema,
  confirmPass: confirmPassSchema,
  phone: phoneSchema,
  birth_date: birthDateSchema,
  source: sourceSchema,
  reason: resonSchema,
  address: addressSchema,
});