import { Instrumento } from './Instrumento';

export interface ModalProps {
  show: boolean;
  handleClose: () => void;
  instrumento: Instrumento;
}
