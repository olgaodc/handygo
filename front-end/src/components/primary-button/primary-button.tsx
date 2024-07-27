import React, { FC, ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.scss';

interface PrimaryButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  variant?: 'primary' | 'round' | 'small',
  disabled?: boolean,
  type?: 'button' | 'submit' | 'reset',
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  onClick, children, variant = 'primary', disabled = false, type = 'button',
}) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={clsx(styles.button, styles[variant])}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
