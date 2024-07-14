import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface PrimaryButtonProps {
  children: React.ReactNode,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  variant: 'primary' | 'searchButton',
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  onClick, children, variant = 'primary',
}) => {
  return (
    <button
      type='button'
      className={clsx(styles.button, styles[variant])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
