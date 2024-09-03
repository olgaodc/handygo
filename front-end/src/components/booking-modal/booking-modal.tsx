import { FC } from 'react';
import Modal from 'react-modal';
import { clsx } from 'clsx';
import styles from './styles.module.scss';
import BookingForm from '../form-components/forms/booking-form/booking-form';

Modal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  closeModal: () => void;
}

const BookingModal: FC<ModalProps> = ({ isOpen, onRequestClose, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={clsx(styles.modal, isOpen && styles.isOpen)}
      overlayClassName={styles.modalOverlay}
      contentLabel='Reservation Modal'
      closeTimeoutMS={300}
    >
      <BookingForm closeModal={closeModal} />

    </Modal>
  );
};

export default BookingModal;
