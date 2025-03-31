import { create } from "zustand";
// import { ModalInterface } from "@interfaces/componentInterface";
interface ModalInterface {
  title: string;
  content: JSX.Element;
}

interface Props {
  /** Modal */
  isOpenModal: boolean;
  setOpenModal: (content: any, title?: string) => void;
  setCloseModal: () => void;
  modalContent: JSX.Element | undefined;
  /** full-view  */
  openfullModal: string[];
  setOpenFullModal: (openfullModal: string) => void;
  isOpenFullModal: (modal: string) => boolean;
  closefullModal: (modals: string[]) => void;

  /** Loading */
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  /** Toast */
  toastContent: JSX.Element | undefined;
  toastType: "success" | "error" | "info" | "caution";
  isOpenToast: boolean;
  setIsOpenToast: (isOpenToast: boolean, toastContent: JSX.Element) => void;
  setCloseToast: () => void;
  /** Dialog */
  isOpenDialog: boolean;
  setIsOpenDialog: (
    isOpenDialog: boolean,
    dialogTitle: string,
    dialogContent: string
  ) => void;
  dialogTitle: string;
  dialogContent: string;
  /** === Error Modal ================================================== */
  isOpenErrorModal: boolean;
  setIsOpenErrorModal: (isOpen: boolean) => void;
  errorModalTitle: string;
  errorModalContent: string;
  setErrorModalContents: (contents: {
    errorModalTitle: string;
    errorModalContent: string;
  }) => void;
}
const useComponentStore = create<Props>()((set, get) => ({
  /** ===[ Modal ]================================================================ */
  isOpenModal: false,
  modalTitle: undefined,
  modalContent: undefined,
  setOpenModal: (item: ModalInterface) => {
    set(() => ({
      isOpenModal: true,
      modalContent: item.content,
    }));
  },
  setCloseModal: () => {
    set(() => ({
      isOpenModal: false,
      modalContent: undefined,
      modalTitle: undefined,
    }));
  },
  /** ===[ Full Modal ]================================================================ */
  openfullModal: [],
  setOpenFullModal: (modal: string) => {
    set((state) => {
      const exists = state.openfullModal.includes(modal);
      return {
        openfullModal: exists
          ? state.openfullModal.filter((m) => m !== modal)
          : [...state.openfullModal, modal],
      };
    });
  },
  isOpenFullModal: (modal: string) => get().openfullModal.includes(modal),
  closefullModal: (modals: string[]) => {
    set((state) => ({
      openfullModal: state.openfullModal.filter((m) => !modals.includes(m)),
    }));
  },
  /** ===[ Loading ]================================================================ */
  isLoading: false,
  setIsLoading: (isLoading) => {
    set(() => ({ isLoading: isLoading }));
  },
  /** ===[ Toast ]================================================================ */
  isOpenToast: false,
  toastContent: undefined,
  toastType: "success",
  setIsOpenToast: (
    isOpenToast: boolean,
    toastContent: JSX.Element,
    toastTypes?: "success" | "error" | "info" | "caution"
  ) => {
    set(({ toastTypes }: any) => ({
      isOpenToast: isOpenToast,
      toastContent: toastContent,
      toastType: typeof toastTypes === undefined ? "success" : toastTypes,
    }));
  },
  setCloseToast: () => {
    set(() => ({
      isOpenToast: false,
      toastContent: undefined,
      // toastType: typeof toastType === undefined ? "success" : toastType,
    }));
  },
  /** ===[ Dialog ]================================================================ */
  dialogTitle: "",
  dialogContent: "",
  isOpenDialog: false,
  setIsOpenDialog: (isOpenDialog, dialogTitle, dialogContent) => {
    set(() => ({
      isOpenDialog: isOpenDialog,
      dialogTitle: dialogTitle,
      dialogContent: dialogContent,
    }));
  },
  /** ===[ Dialog ]================================================================ */
  isOpenErrorModal: false,
  setIsOpenErrorModal: (isOpenErrorModal: boolean) =>
    set(() => ({
      isOpenErrorModal: isOpenErrorModal,
    })),
  errorModalTitle: "",
  errorModalContent: "",
  setErrorModalContents: (contents: {
    errorModalTitle: string;
    errorModalContent: string;
  }) =>
    set(() => ({
      errorModalTitle: contents.errorModalTitle,
      errorModalContent: contents.errorModalContent,
    })),
}));

const set = useComponentStore.setState;

export const setIsLoading = (isLoading: boolean) =>
  set(() => ({ isLoading: isLoading }));

export const setIsOpenToast = (
  isOpenToast: boolean,
  toastContent: JSX.Element,
  toastType?: "success" | "error" | "info" | "caution"
) =>
  set(() => ({
    isOpenToast: isOpenToast,
    toastContent: toastContent,
    toastType: typeof toastType === undefined ? "success" : toastType,
  }));

export const setIsOpenErrorModal = (isOpen: boolean) =>
  set(() => ({
    isOpenErrorModal: isOpen,
  }));
export const setErrorModalContents = (contents: {
  errorModalTitle: string;
  errorModalContent: string;
}) =>
  set(() => ({
    errorModalTitle: contents.errorModalTitle,
    errorModalContent: contents.errorModalContent,
  }));

export default useComponentStore;
