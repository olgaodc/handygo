import React, { FC } from 'react';
import { ErrorMessage, Field } from 'formik';
import styles from '../input.module.scss';

interface FormikInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  showLabel?: boolean;
  title?: string;
}

const FormikInput: FC<FormikInputProps> = ({
  name, type, placeholder, showLabel = false, title,
}) => {
  return (
    <div className={styles.inputWrapper}>
      {showLabel && <label htmlFor={name} className={styles.contactTitle}>{title}</label>}
      <Field
        className={styles.input}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete='off'
      />
      <ErrorMessage
        className={styles.error}
        name={name}
        component='div'
      />
    </div>
  );
};

export default FormikInput;
