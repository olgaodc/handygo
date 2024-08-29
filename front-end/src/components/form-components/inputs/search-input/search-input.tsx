import React, { FC } from 'react';
import styles from './styles.module.scss';

interface Props {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const SearchInput: FC<Props> = ({ value, onChange }) => {
  return (
    <input
      className={styles.input}
      id='search-input'
      type='text'
      placeholder='Search'
      value={value}
      onChange={onChange}
      maxLength={20}
      autoComplete='off'
    />
  );
};

export default SearchInput;
