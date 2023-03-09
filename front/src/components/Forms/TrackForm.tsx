import React, {useEffect, useState} from 'react';
import {TrackMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTrackCreateError, selectTrackCreateLoading} from "../../feauters/tracks/tracksSlice";
import {Grid, MenuItem, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {getArtists} from "../../feauters/artists/artistsThunks";
import {selectArtists} from "../../feauters/artists/artistsSlice";
import {selectAlbums} from "../../feauters/albums/albumsSlice";
import {getArtistAlbums} from "../../feauters/albums/albumsThunks";

interface Props {
  onSubmit: (track: TrackMutation) => void;
}

const TrackForm: React.FC<Props> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists)
  const albumsData = useAppSelector(selectAlbums);
  const error = useAppSelector(selectTrackCreateError);
  const loading = useAppSelector(selectTrackCreateLoading);
  const [track, setTrack] = useState<TrackMutation>({
    title: "",
    album: "",
    duration: "",
    number: ""
  });
  const [artist, setArtist] = useState("");

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setTrack(prevState => ({...prevState, [name]: value}));
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
    onSubmit(track);
  };

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  useEffect(() => {
    if (artist) {
      dispatch(getArtistAlbums(artist));
    }
  }, [dispatch, artist]);

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
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
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
            select
            label="Album"
            name="album"
            fullWidth
            value={track.album}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('album'))}
            helperText={getFieldError('album')}
          >
            <MenuItem value="" disabled>Please select an album</MenuItem>
            {albumsData?.albums.length !== 0 && albumsData?.albums.map(album => (
              <MenuItem key={album._id} value={album._id}>{album.title}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={track.title}
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
            label="Duration"
            name="duration"
            type="time"
            fullWidth
            value={track.duration}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('duration'))}
            helperText={getFieldError('duration')}
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Number"
            name="number"
            type="number"
            fullWidth
            value={track.number}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('number'))}
            helperText={getFieldError('number')}
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

export default TrackForm;