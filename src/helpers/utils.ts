export const confirmModal = ({ Swal, text, callback }: { Swal: any; text: string; callback: () => any }) => {
  Swal.fire({
    title: 'Peringatan',
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then((result: any) => {
    if (result.isConfirmed) {
      callback()
    }
  })
}
