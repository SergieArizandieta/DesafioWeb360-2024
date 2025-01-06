import * as yup from 'yup';

// Esquema para el campo Email
export const emailSchema = yup.string()
  .email("Email no válido")
  .required("Email es requerido");

// Esquema para el campo Password
export const passwordSchema = yup.string()
  .required("Contraseña es requerida");


// Esquema para creacion de Password
export const passwordCreateSchema = yup.string()
  .required("Contraseña es requerida")
  .min(8, "La contraseña debe tener al menos 8 caracteres")
  .max(16, "La contraseña debe tener como máximo 16 caracteres")

// Esquema para el compo DPI
export const dpiSchema = yup.string()
  .required("DPI es requerido")
  .matches(/^[0-9]{13}$/, "DPI no válido");


// esquema para el compo de numero de telefono
export const phoneSchema = yup.string()
  .required("Número de teléfono es requerido")
  .matches(/^[0-9]{8}$/, "Número de teléfono no válido");

// esque para el nombre completo
export const fullNameSchema = yup.string()
  .required("Nombre completo es requerido")
  .matches(/^[a-zA-Z\s]+$/, "Nombre completo no válido");

  // validacion para la fecha de nacimiento, tiene que ser mayor de edad
export const birthDateSchema = yup.date()
   .required("Fecha de nacimiento es requerida")
   .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), "Debes ser mayor de edad");



// Esquema de formulario de inicio de sesión
export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});