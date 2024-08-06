import { FC } from 'react';
import styles from './styles.module.scss';
import FormikInput from '../formik-input/formik-input';

interface Props {
  title: string,
  name: string,
  type?: string,
  placeholder: string,
}

const ContactItem: FC<Props> = ({
  title, name, type = 'text', placeholder,
}) => {
  return (
    <div className={styles.contactItem}>
      <label htmlFor={name} className={styles.contactTitle}>{title}</label>
      <FormikInput
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default ContactItem;
