import Container from '../container/container';
import styles from './styles.module.scss';

import SearchIcon from '../../assets/search-icon.png';
import PrimaryButton from '../primary-button/primary-button';
import { useState } from 'react';



const SearchSection = () => {
  const [inputText, setInputText] = useState('');

  const handleClick = (e) => {
    setInputText(e.target.value);
    //TO DO: Add functionality
    //console.log(inputText);
  }

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
              className={styles.searchButton}
            >
              <img src={SearchIcon} alt="search icon" />
            </PrimaryButton>
          </div>
        </section>
      </Container>
    </div>
  )
}

export default SearchSection
