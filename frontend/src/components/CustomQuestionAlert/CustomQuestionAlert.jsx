import Swal from 'sweetalert2';

export default function CustomQuestionAlert (title,info) {
  return Swal.fire({
    title: `<span style="color: #A0AAB4;">${title}</span>`,
    html: `<span style="color: #A0AAB4;">${info}</span>`,
    icon: 'warning',
    background: '#222',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    confirmButtonColor: 'green',
    cancelButtonText: 'No',
    cancelButtonColor: '#D32F2F',
  });
}