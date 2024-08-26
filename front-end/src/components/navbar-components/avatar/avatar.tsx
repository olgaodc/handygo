import userAuth from '@/store/use-auth';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import Dropdown from '../dropdown/dropdown';

const Avatar = () => {
  const { user } = userAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!user) {
    return (<div />);
  }

  const userFirstLetter = user.name[0].toUpperCase();

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.avatarWrapper} ref={dropdownRef}>
      <button
        className={styles.avatar}
        type='button'
        onClick={handleDropdown}
      >
        <span>
          {userFirstLetter}
        </span>
      </button>
      <div className={styles.dropdownWrapper}>
        <Dropdown isOpen={isOpen} closeDropdown={closeDropdown} />
      </div>

    </div>

  );
};

export default Avatar;
