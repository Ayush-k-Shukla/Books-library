import SearchIcon from '@mui/icons-material/Search';
import { Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubjectsListByQuery } from '../../api';
import CustomInput from '../input/input.component';
import styles from './subjects_drawer.module.scss';

const SubjectsDrawer = () => {
  const TRENDING_SUBJECTS = [
    'Javascript',
    'Harry Potter',
    'Indian History',
    'Crypto Currency',
    'Criminal Law',
  ];
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [query]);

  const fetchData = async () => {
    if (query.trim().length) {
      const res = await getSubjectsListByQuery(query);
      setAvailableSubjects(res.docs);
    } else {
      setAvailableSubjects([]);
    }
  };

  const handleChange = (e) => {
    setQuery(e);
  };

  const handleChipClick = (val) => {
    navigate(`/${val}`);
  };

  return (
    <div className={styles.drawer}>
      <div className={styles.input}>
        <p className='primary-h1'>Search subjects</p>
        <CustomInput
          placeholder='Search subjects'
          value={query}
          handleValueChange={handleChange}
          fullWidth
          prependIcon={<SearchIcon />}
        />
      </div>
      <div className={styles.title}>
        <p className='primary-h3'>Matching Subjects</p>
      </div>
      <div className={styles.result}>
        {availableSubjects && availableSubjects.length > 0 ? (
          availableSubjects.map((val, index) => {
            if (index < 10)
              return (
                <Chip
                  label={val.name}
                  onClick={() => handleChipClick(val.name)}
                />
              );
          })
        ) : (
          <p>No Subjects</p>
        )}
      </div>
      <div className={styles.title}>
        <p className='primary-h3'>Trending Subjects</p>
      </div>
      <div className={styles.result}>
        {TRENDING_SUBJECTS.map((val, index) => {
          return <Chip label={val} onClick={() => handleChipClick(val)} />;
        })}
      </div>
    </div>
  );
};

export default SubjectsDrawer;
