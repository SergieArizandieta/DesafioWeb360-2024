import Swal from 'sweetalert2';

export default function CustomQuestionAlert (title,info) {
  return Swal.fire({
    title: `<span style="color: #202224FF;">${title}</span>`,
    html: `<span style="color: #202224FF;">${info}</span>`,
    icon: 'warning',
    background: '#fff',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    confirmButtonColor: 'green',
    cancelButtonText: 'No',
    cancelButtonColor: '#D32F2F',
  });
}