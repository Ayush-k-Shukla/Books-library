import styles from './single_book.module.scss';

const SingleBook = ({
  title,
  first_publish_year,
  author_name,
  link_to_website,
  number_of_pages_median,
}) => {
  const gotToMainUrl = () => {
    window.open(`https://openlibrary.org${link_to_website}`, '_blank');
  };

  return (
    <div className={styles.wrapper} onClick={gotToMainUrl}>
      <p className='primary-h4'>{title}</p>
      <p className={`${styles.row} primary-h5`}>
        Author : <span className='primary-h4-semi'>{author_name ?? 'N/A'}</span>
      </p>
      {first_publish_year && (
        <p className={`${styles.row} primary-h5`}>
          Published in :
          <span className='primary-h4-semi'>{first_publish_year ?? 'N/A'}</span>
        </p>
      )}
      {number_of_pages_median && (
        <p className={`${styles.row} primary-h5`}>
          Pages :
          <span className='primary-h4-semi'>
            {number_of_pages_median ?? 'N/A'}
          </span>
        </p>
      )}
    </div>
  );
};

export default SingleBook;
