import React, {useState} from 'react';
import {Grid, TextField} from "@mui/material";
import FileInput from "../UI/FileInput/FileInput";
import {ArtistMutation} from "../../types";
import {useAppSelector} from "../../app/hooks";
import {selectArtistCreateError, selectArtistCreateLoading} from "../../feauters/artists/artistsSlice";
import {LoadingButton} from "@mui/lab";
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props {
  onSubmit: (artist: ArtistMutation) => void;
}

const ArtistForm: React.FC<Props> = ({onSubmit}) => {
  const error = useAppSelector(selectArtistCreateError);
  const loading = useAppSelector(selectArtistCreateLoading);
  const [artist, setArtist] = useState<ArtistMutation>({
    name: "",
    photo: null,
    info: ""
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setArtist(prevState => ({...prevState, [name]: value}));
  };
  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setArtist(prev => ({
      ...prev, [name]: files && files[0] ? files[0] : null,
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(artist);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="name" label="Name"
            value={artist.name}
            fullWidth
            required
            name="name"
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('name'))}
            helperText={getFieldError('name')}
          />
        </Grid>
        <Grid item xs>
          <FileInput onChange={fileInputHandler} name="photo" label="Photo"/>
        </Grid>
        <Grid item xs>
          <TextField
            id="info" label="Info"
            value={artist.info}
            fullWidth
            name="info"
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('info'))}
            helperText={getFieldError('info')}
          />
        </Grid>
        <Grid item xs sx={{textAlign: "center"}}>
          <LoadingButton
            loading={loading}
            disabled={loading}
            type="submit"
            color="primary"
            variant="contained"
          >
            <AddCircleIcon/>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArtistForm;