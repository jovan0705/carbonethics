import Swal from "sweetalert2";

export function successToast(text) {
  const toast = Swal.mixin({
    toast: true,
    position: "bottom-left",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  toast.fire({
    icon: "success",
    title: text
  })
}
