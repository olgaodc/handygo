import Container from '@/components/container/container';
import BusinessCard from '@/components/business-components/business-card/business-card';
import SearchSection from '@/components/search-section/search-section';
import useBusinesses from '@/hooks/use-businesses';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '@/components/loader/loader';
import styles from './styles.module.scss';

const ServicesPage = () => {
  const { data: businesses, isLoading } = useBusinesses();
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [inputText, setInputText] = useState(initialSearch);

  const handleSearch = (searchText: string) => {
    setInputText(searchText);
    const filtered = businesses && businesses.filter((business) => business.businessName
      .toLowerCase().includes(searchText.toLowerCase()));
    setFilteredBusinesses(filtered);
    setSearchParams({ search: searchText.toLowerCase() });
  };

  useEffect(() => {
    if (initialSearch === '') {
      handleSearch('');
    }
    if (initialSearch) {
      handleSearch(initialSearch);
    }
  }, [businesses, initialSearch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.content}>
      <SearchSection
        shouldNavigate={false}
        value={inputText}
        onChange={setInputText}
        onSearch={handleSearch}
      />
      <div>
        <Container>
          <div className={styles.sectionWrapper}>
            {filteredBusinesses && filteredBusinesses.length > 0
              ? (
                <section className={styles.section}>
                  {filteredBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />))}
                </section>
              ) : <p className={styles.noData}>No results found for your search</p>}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ServicesPage;
