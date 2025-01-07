import Swal from 'sweetalert2';

export default async function CustomAlert (title,info, isSuccessful) {
  await Swal.fire({
    title: `<span style="color: #A0AAB4;">${title}</span>`,
    html: `<span style="color: #A0AAB4;">${info}</span>`,
    icon: isSuccessful ? "success" : "error",
    confirmButtonText: 'Cerrar',
    background: '#222', // Color de fondo modo oscuro
    confirmButtonColor: '#D32F2F', // Color del botón de confirmación
  });
}