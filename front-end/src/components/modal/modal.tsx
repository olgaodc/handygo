import { FC } from 'react';
import ReactModal from 'react-modal';
import { clsx } from 'clsx';
import styles from './styles.module.scss';
import BookingForm from '../form-components/forms/booking-form/booking-form';

ReactModal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  closeModal: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onRequestClose, closeModal }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={clsx(styles.modal, isOpen && styles.isOpen)}
      overlayClassName={styles.modalOverlay}
      contentLabel='Reservation Modal'
      closeTimeoutMS={500}
    >
      <BookingForm closeModal={closeModal} />

    </ReactModal>
  );
};

export default Modal;
