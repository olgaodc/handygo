import ReactModal from 'react-modal';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';
import CloseIcon from '@/assets/close-icon.svg';
import WarningIcon from '@/assets/warning-icon.svg';
import PrimaryButton from '../primary-button/primary-button';
import styles from './styles.module.scss';

ReactModal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  closeModal: () => void;
  onDelete: () => void;
  name: string;
  isDeleting: boolean;
}

const DeleteModal: FC<ModalProps> = ({
  isOpen, onRequestClose, closeModal, onDelete, name, isDeleting,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      contentLabel='Delete Modal'
      closeTimeoutMS={500}
    >
      <div className={styles.modalContent}>
        <button className={styles.closeButton} type='button' onClick={closeModal}>
          <ReactSVG src={CloseIcon} />
        </button>
        <ReactSVG className={styles.warningIcon} src={WarningIcon} />
        <h2 className={styles.title}>Are you sure?</h2>
        <p className={styles.description}>
          {`Do you really  want to delete this ${name}? Once deleted, your ${name} will be permanently canceled and cannot be undone.`}
        </p>
        <div className={styles.buttonsWrapper}>
          <PrimaryButton variant='cancel' onClick={closeModal}>Cancel</PrimaryButton>
          <PrimaryButton variant='modalDeleteBtn' onClick={onDelete} disabled={isDeleting}>Delete</PrimaryButton>
        </div>
      </div>
    </ReactModal>
  );
};

export default DeleteModal;
