import { Link, useNavigate } from 'react-router-dom';
import routes from '@navigation/routes';
import Container from '../container/container';
import styles from './styles.module.scss';

const Form = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(routes.HOME);
  };

  return (
    <div className={styles.formWrapper}>
      <Container>
        <form className={styles.form} action=''>
          <h2 className={styles.title}>Welcome</h2>
          <input
            type='email'
            name='email'
            id='email'
            required
            placeholder='Email'
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
          />
          <button
            type='button'
            className={styles.button}
            onClick={handleSubmit}
          >
            Login
          </button>
          <Link className={styles.link} to={routes.REGISTER}>
            Don&#39;t have an account? Sign up
          </Link>
        </form>
      </Container>
    </div>
  );
};

export default Form;
