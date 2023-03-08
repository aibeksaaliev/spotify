import React, { useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import {useAppSelector} from "../../../app/hooks";
import {selectArtistCreateError} from "../../../feauters/artists/artistsSlice";
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({onChange, name, label}) => {
  const error = useAppSelector(selectArtistCreateError);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <>
      <input
        style={{display: 'none'}}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            disabled
            label={label}
            value={filename}
            fullWidth
            onClick={activateInput}
            error={Boolean(getFieldError(name))}
            helperText={getFieldError(name)}
          />
        </Grid>
        <Grid item>
          <Button type="button" variant="contained" onClick={activateInput}><SearchIcon/></Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;