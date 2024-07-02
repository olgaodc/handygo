import React from 'react';
import styles from './styles.module.scss';

const PrimaryButton = ({buttonName, onClick, children, className}) => {
  return (
    <button 
      className={`${styles.button} ${className || ''}`}
      onClick={onClick}
    >
      {buttonName || children}
    </button>
  )
}

export default PrimaryButton