import React, {useState} from 'react';
import {TrackMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTrackCreateError, selectTrackCreateLoading} from "../../feauters/tracks/tracksSlice";
import {Grid, MenuItem, TextField} from "@mui/material";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LoadingButton} from "@mui/lab";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Props {
  onSubmit: (track: TrackMutation) => void;
}

const TrackForm: React.FC<Props> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectTrackCreateError);
  const loading = useAppSelector(selectTrackCreateLoading);
  const [track, setTrack] = useState<TrackMutation>({
    title: "",
    album: "",
    duration: "",
    number: ""
  });

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

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
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
            <MenuItem value="" disabled>Please select an artist</MenuItem>
            {/*{artists.map(artist => (*/}
            {/*  <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>*/}
            {/*))}*/}
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