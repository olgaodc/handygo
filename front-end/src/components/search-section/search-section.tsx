import React, { useState } from 'react';
import SearchIcon from '@/assets/search-icon.png';
import Container from '../container/container';
import PrimaryButton from '../primary-button/primary-button';
import styles from './styles.module.scss';

const SearchSection = () => {
  const [inputText, setInputText] = useState('');

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    // TODO: Add functionality
    // console.log(inputText);
  };

  return (
    <div className={styles.sectionWrapper}>
      <Container>
        <section className={styles.section}>
          <div className={styles.searchBox}>
            <input
              className={styles.input}
              id='serviceName'
              type='text'
              placeholder='Search'
              value={inputText}
              onChange={handleClick}
            />
            <PrimaryButton
              variant='round'
              // TODO: Add functionality
              // eslint-disable-next-line no-console
              onClick={() => console.log('clicked')}
            >
              <img
                className={styles.searchIcon}
                src={SearchIcon}
                alt='search icon'
              />
            </PrimaryButton>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default SearchSection;
