import Swal from 'sweetalert2';

function Toast() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true
  })
  return Toast
}

export default Toast