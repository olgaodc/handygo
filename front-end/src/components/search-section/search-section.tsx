import React, { FC } from 'react';
import SearchIcon from '@/assets/search-icon.svg';
import { ReactSVG } from 'react-svg';
import { useNavigate } from 'react-router-dom';
import routes from '@/navigation/routes';
import Container from '../container/container';
import PrimaryButton from '../primary-button/primary-button';
import styles from './styles.module.scss';
import SearchInput from '../form-components/inputs/search-input/search-input';

interface Props {
  shouldNavigate?: boolean,
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (searchText: string) => void,
}

const SearchSection: FC<Props> = ({
  shouldNavigate = false,
  value = '',
  onChange = () => {},
  onSearch,
}) => {
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (shouldNavigate) {
      navigate(`${routes.SERVICES}?search=${encodeURIComponent(value)}`);
    } else if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={styles.sectionWrapper}>
      <Container>
        <section className={styles.section}>
          <form className={styles.searchBox} onSubmit={handleSearch}>
            <SearchInput
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            <PrimaryButton
              variant='round'
              type='submit'
            >
              <ReactSVG className={styles.searchIcon} src={SearchIcon} />
            </PrimaryButton>
          </form>
        </section>
      </Container>
    </div>
  );
};

export default SearchSection;
