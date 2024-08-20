import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import routes from '@/navigation/routes';
import useAuth from '@/store/use-auth';
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
        My Account
      </Link>
      <Link
        className={styles.dropdownItem}
        to={routes.BOOKINGS}
        onClick={closeDropdown}
      >
        My Bookings
      </Link>
      <button
        className={styles.dropdownItem}
        type='button'
        onClick={logout}
      >
        Log Out
      </button>
    </div>

  );
};

export default Dropdown;
