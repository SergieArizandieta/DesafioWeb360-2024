import * as yup from 'yup';

const addressSchema = yup.string()
  .required("Dirección es requerida");
  
export const orderSchema = yup.object().shape({
  address: addressSchema,
});