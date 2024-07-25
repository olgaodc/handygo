import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
  path: string,
  children: React.ReactNode,
  onClick?: () => void
}

const NavigationLink: FC<Props> = ({ path, children, onClick }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => clsx(
        styles.listItem,
        isActive && styles.active,
      )}
      onClick={onClick}
    >
      {children}
    </NavLink>

  );
};

export default NavigationLink;
