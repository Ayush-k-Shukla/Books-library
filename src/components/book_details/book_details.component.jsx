import { NavigateBefore } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooksListBySubject, getBooksListByTitleAndAuthor } from '../../api';
import { isLastPage } from '../../utils';
import CustomButton from '../button/index.button';
import CustomInput from '../input/input.component';
import CustomLoader from '../loader/loader.component';
import SingleBook from '../single_book/single_book.component';
import styles from './book_details.module.scss';

const LIMIT = 10;

const BookDetails = ({ subject }) => {
  const [booksList, setBooksList] = useState([]);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!subject) fetchBookDetils();
  }, [title, author, page]);

  useEffect(() => {
    if (subject) {
      fetchBookDetilsBySubject();
    }
  }, [subject, page]);

  const fetchBookDetils = async () => {
    let res = [];
    setLoading(true);
    getBooksListByTitleAndAuthor(title, author, page).then((data) => {
      res = data.docs;
      setBooksList(res);
      setTotal(data.numFound);
      setLoading(false);
    });
  };
  const fetchBookDetilsBySubject = async () => {
    let res = [];
    setLoading(true);
    getBooksListBySubject(subject, (page - 1) * LIMIT).then((data) => {
      res = data.works;
      setBooksList(res);
      setTotal(data.work_count);
      setLoading(false);
    });
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const clearSearch = () => {
    setAuthor('');
    setTitle('');
    setPage(1);
  };

  return (
    <div className={styles.books}>
      <div className={`${styles.inputWrapper} ${subject && styles.subject}`}>
        {subject && (
          <ArrowBackIcon
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        )}
        <p className='primary-h1'>
          {subject
            ? `Books related to ${subject}`
            : 'Search books by author or title'}
        </p>
        {!subject && (
          <div className={styles.input}>
            <CustomInput
              placeholder='Search by title'
              fullWidth
              prependIcon={<SearchIcon />}
              value={title}
              name='title'
              handleValueChange={(value) => setTitle(value)}
            />
            <CustomInput
              placeholder='Search by author'
              fullWidth
              prependIcon={<SearchIcon />}
              value={author}
              name='author'
              handleValueChange={(value) => setAuthor(value)}
            />
            <p className='primary-h3' onClick={clearSearch}>
              Clear Search
            </p>
          </div>
        )}
      </div>
      {loading ? (
        <div className={styles.loader}>
          <CustomLoader />
        </div>
      ) : (
        <div className={styles.allbooks}>
          {booksList?.length > 0 ? (
            booksList?.map((book, index) => (
              <SingleBook
                author_name={
                  subject ? book?.authors?.[0]?.name : book?.author_name?.[0]
                }
                first_publish_year={book?.first_publish_year}
                number_of_pages_median={book?.number_of_pages_median}
                title={book?.title}
                key={index}
                link_to_website={book?.key}
              />
            ))
          ) : (
            <p className='primary-h1'>No Result Found</p>
          )}
        </div>
      )}

      {booksList?.length > 0 && (
        <div className={styles.pagination}>
          <CustomButton
            label='Previous'
            prependIcon={<NavigateBefore />}
            variant='outlined'
            disabled={page === 1}
            handleClick={handlePrevious}
          />
          <CustomButton
            label='Next'
            appendIcon={<NavigateNextIcon />}
            variant='outlined'
            handleClick={handleNext}
            disabled={isLastPage(page, total, LIMIT)}
          />
        </div>
      )}
    </div>
  );
};

export default BookDetails;
