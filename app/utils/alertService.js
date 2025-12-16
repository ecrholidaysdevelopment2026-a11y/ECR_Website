<<<<<<< HEAD
import { toast } from "react-toastify";

export const successAlert = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const errorAlert = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const infoAlert = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
  });
};

export const warningAlert = (message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
  });
};
=======
import { toast } from "react-toastify";

export const successAlert = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const errorAlert = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const infoAlert = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
  });
};

export const warningAlert = (message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
  });
};
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
