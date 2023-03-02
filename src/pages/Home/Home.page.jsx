import BookDetails from '../../components/book_details/book_details.component';
import SubjectsDrawer from '../../components/subjects_drawer/subjects_drawer.component';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.subjectsWrapper}>
        <SubjectsDrawer />
      </div>
      <div className={styles.contentWrapper}>
        <BookDetails />
      </div>
    </div>
  );
};

export default Home;
