import React, { FC } from 'react';
import { ErrorMessage, Field } from 'formik';
import styles from './styles.module.scss';

interface FormikInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const FormikInput: FC<FormikInputProps> = ({ name, type, placeholder }) => {
  return (
    <div className={styles.inputWrapper}>
      <Field
        className={styles.input}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
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
