import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import routes from '@/navigation/routes';
import useAuth from '@/store/use-auth';
import { ReactSVG } from 'react-svg';
import UserIcon from '@/assets/user-icon.svg';
import BookingIcon from '@/assets/book-icon.svg';
import LogoutIcon from '@/assets/logout-icon.svg';
import styles from './styles.module.scss';

interface Props {
  isOpen: boolean,
  closeDropdown: () => void,
}

const Dropdown: FC<Props> = ({ isOpen = false, closeDropdown }) => {
  const { logout } = useAuth();
  return (
    <div className={clsx(
      styles.dropdown,
      isOpen && styles.isOpen,
    )}
    >
      <Link
        className={styles.dropdownItem}
        to={routes.ACCOUNT}
        onClick={closeDropdown}
      >
        <ReactSVG className={styles.icon} src={UserIcon} />
        <span>My Account</span>
      </Link>
      <Link
        className={styles.dropdownItem}
        to={routes.BOOKINGS}
        onClick={closeDropdown}
      >
        <ReactSVG className={styles.icon} src={BookingIcon} />
        <span>My Bookings</span>
      </Link>
      <button
        className={styles.dropdownItem}
        type='button'
        onClick={logout}
      >
        <ReactSVG className={styles.icon} src={LogoutIcon} />
        <span>Log Out</span>
      </button>
    </div>

  );
};

export default Dropdown;
