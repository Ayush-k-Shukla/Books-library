import { Button } from '@mui/material';

const CustomButton = ({
  label,
  handleClick,
  prependIcon,
  appendIcon,
  disabled = false,
  variant,
  loading,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        onClick={handleClick}
        variant={variant}
        disabled={disabled}
        endIcon={appendIcon}
        startIcon={loading ? <CircularProgress size={20} /> : prependIcon}
        size='medium'
        color='success'
      >
        {label}
      </Button>
    </div>
  );
};

export default CustomButton;
