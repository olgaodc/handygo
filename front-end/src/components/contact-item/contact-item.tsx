import { FC } from 'react';
import styles from './styles.module.scss';

interface Props {
  title: string,
  text: string,
}

const ContactItem: FC<Props> = ({ title, text }) => {
  return (
    <div className={styles.contactItem}>
      <div className={styles.contactTitle}>{title}</div>
      <div className={styles.contactText}>{text}</div>
    </div>
  );
};

export default ContactItem;
