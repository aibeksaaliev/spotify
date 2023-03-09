import React, {useEffect, useState} from 'react';
import {AlbumMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAlbumCreateError} from "../../feauters/albums/albumsSlice";
import {selectArtistCreateLoading, selectArtists} from "../../feauters/artists/artistsSlice";
import {Grid, MenuItem, TextField} from "@mui/material";
import {getArtists} from "../../feauters/artists/artistsThunks";
import FileInput from "../UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props {
  onSubmit: (album: AlbumMutation) => void;
}

const AlbumForm: React.FC<Props> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const error = useAppSelector(selectAlbumCreateError);
  const loading = useAppSelector(selectArtistCreateLoading);
  const [album, setAlbum] = useState<AlbumMutation>({
    title: "",
    artist: "",
    releaseYear: "",
    cover: null
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAlbum(prevState => ({...prevState, [name]: value}));
  };

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setAlbum(prev => ({
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

  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(album);
  };

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            select
            label="Artist"
            name="artist"
            fullWidth
            value={album.artist}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('artist'))}
            helperText={getFieldError('artist')}
          >
            <MenuItem value="" disabled>Please select an artist</MenuItem>
            {artists.map(artist => (
              <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={album.title}
            fullWidth
            required
            name="title"
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>
        <Grid item xs>
          <TextField
            type="number"
            id="releaseYear" label="Release Year"
            value={album.releaseYear}
            fullWidth
            required
            name="releaseYear"
            onChange={inputChangeHandler}
            error={Boolean(getFieldError('releaseYear'))}
            helperText={getFieldError('releaseYear')}
          />
        </Grid>
        <Grid item xs>
          <FileInput onChange={fileInputHandler} name="cover" label="Cover"/>
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

export default AlbumForm;