import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const CustomInput = ({
  name,
  label,
  placeholder,
  handleValueChange,
  prependIcon,
  fullWidth = false,
  value,
}) => {
  const [val, setVal] = useState(value);
  const handleChange = (e) => {
    setVal(e.target.value);
    handleValueChange(e.target.value);
  };
  useEffect(() => {
    setVal(value);
  }, [value]);
  return (
    <TextField
      type='text'
      name={name}
      label={label}
      value={val}
      variant='outlined'
      onChange={handleChange}
      fullWidth={fullWidth}
      placeholder={placeholder}
      size='small'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>{prependIcon}</InputAdornment>
        ),
      }}
    />
  );
};

export default CustomInput;
