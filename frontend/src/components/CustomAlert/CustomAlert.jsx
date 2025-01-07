import Swal from 'sweetalert2';

export default async function CustomAlert (title,info, isSuccessful) {
  await Swal.fire({
    title: `<span style="color: #202224FF;">${title}</span>`,
    html: `<span style="color: #202224FF;">${info}</span>`,
    icon: isSuccessful ? "success" : "error",
    confirmButtonText: 'Cerrar',
    background: '#fff', // Color de fondo modo oscuro
    confirmButtonColor: '#D32F2F', // Color del botón de confirmación
  });
}