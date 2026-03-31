import Swal from 'sweetalert2';

 
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#ffffff',
  color: '#0f172a',
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

export const showToast = (icon, title) => {
  Toast.fire({
    icon,
    title,
    customClass: {
      popup: 'rounded-2xl shadow-2xl border border-slate-100',
      title: 'text-sm font-black tracking-tight font-sans',
    }
  });
};

export const showAlert = (icon, title, text) => {
  return Swal.fire({
    icon,
    title,
    text,
    background: '#ffffff',
    color: '#1e293b',
    confirmButtonColor: '#4f46e5',  
    cancelButtonColor: '#94a3b8',  
    confirmButtonText: 'Confirm',
    padding: '2rem',
    width: '32rem',
    customClass: {
      popup: 'rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 animate-in zoom-in-95 duration-300',
      title: 'text-2xl font-black tracking-tight text-slate-900',
      htmlContainer: 'text-slate-500 font-medium leading-relaxed',
      confirmButton: 'px-10 py-3 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-indigo-500/30 active:scale-95 transition-all',
      cancelButton: 'px-10 py-3 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all',
    },
    buttonsStyling: true,
  });
};

export const showConfirm = (title, text, confirmText = 'Yes, Proceed') => {
  return showAlert('warning', title, text).then((result) => {
    return result.isConfirmed;
  });
};

export default { showToast, showAlert, showConfirm };
