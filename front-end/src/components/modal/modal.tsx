import { FC } from 'react';
import ReactModal from 'react-modal';
import clsx from 'clsx';
import styles from './styles.module.scss';
import PrimaryButton from '../primary-button/primary-button';

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
      <h2>Book a Service</h2>
      <p>Select  Date and Time to book a service</p>
      <h3>Select Date</h3>
      <div>Calendar</div>
      <h3>Select Time Slot</h3>
      <div>
        <span>time</span>
        <span>time</span>
        <span>time</span>
        <span>time</span>
        <span>time</span>
        <span>time</span>
      </div>
      <PrimaryButton variant='primary' onClick={closeModal}>Close</PrimaryButton>

    </ReactModal>
  );
};

export default Modal;
