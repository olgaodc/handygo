import { ReactSVG } from 'react-svg';
import EyeIcon from '@/assets/eye-icon.svg';
import BlindEyeIcon from '@/assets/blind-eye-icon.svg';
import React, { FC, useState } from 'react';
import { ErrorMessage, Field } from 'formik';
import styles from '../input.module.scss';

interface FormikInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  showLabel?: boolean;
  title?: string;
}

const PasswordInput: FC<FormikInputProps> = ({
  name, placeholder, showLabel = false, title,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputWrapper}>
      {showLabel && <label htmlFor={name} className={styles.contactTitle}>{title}</label>}
      <div className={styles.fieldWrapper}>
        <Field
          className={styles.input}
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete='off'
        />
        <button
          className={styles.inputButton}
          type='button'
          onClick={handleShow}
        >
          {showPassword ? <ReactSVG className={styles.buttonIcon} src={EyeIcon} />
            : <ReactSVG className={styles.buttonIcon} src={BlindEyeIcon} /> }
        </button>
      </div>
      <ErrorMessage
        className={styles.error}
        name={name}
        component='div'
      />
    </div>
  );
};

export default PasswordInput;
