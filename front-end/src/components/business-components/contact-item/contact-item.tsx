import React, { FC } from 'react';
import clsx from 'clsx';
import { ReactSVG } from 'react-svg';
import styles from './styles.module.scss';

interface Props {
  src: string,
  children: React.ReactNode,
  variant?: string,
  svgColor?: string,
}

const ContactItem: FC<Props> = ({
  src, children, variant = '', svgColor = '',
}) => {
  return (
    <div className={clsx(styles.contactItem, styles[variant])}>
      <ReactSVG className={clsx(styles.icon, styles[svgColor])} src={src} />
      <div className={styles.contact}>{children}</div>
    </div>
  );
};

export default ContactItem;
