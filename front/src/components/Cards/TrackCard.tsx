import React from 'react';
import {Button, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {TrackType} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../../feauters/users/usersSlice";
import {submitTrackHistory} from "../../feauters/trackHistory/trackHistoryThunks";
import {getYouTubeUrl, selectTrackDeleteLoading, selectTrackPublishLoading} from "../../feauters/tracks/tracksSlice";
import {LoadingButton} from "@mui/lab";
import {deleteTrack, getAlbumTracks, publishTrack} from "../../feauters/tracks/tracksThunks";

interface Props {
  track: TrackType;
}

const TrackCard: React.FC<Props> = ({track}) => {
  const dispatch = useAppDispatch();
  const publishLoading = useAppSelector(selectTrackPublishLoading);
  const deleteLoading = useAppSelector(selectTrackDeleteLoading);
  const user = useAppSelector(selectUser);

  const playSong = async () => {
    await dispatch(submitTrackHistory(track._id));
    dispatch(getYouTubeUrl(track.videoId));
  };

  const togglePublish = async () => {
    await dispatch(publishTrack(track._id));
    await dispatch(getAlbumTracks(track.album));
  };

  const removeTrack = async () => {
    await dispatch(deleteTrack(track._id));
    await dispatch(getAlbumTracks(track.album));
  };

  let adminControllers = user?.role === "admin" && (
    <>
      <LoadingButton
        sx={{ml:1}}
        variant="contained"
        color="error"
        size="small"
        loading={deleteLoading}
        disabled={deleteLoading || publishLoading}
        onClick={removeTrack}
      >
        Delete
      </LoadingButton>
      {!track.isPublished &&
          <LoadingButton
              sx={{ml:1}}
              variant="contained"
              color="success"
              size="small"
              loading={publishLoading}
              disabled={deleteLoading || publishLoading}
              onClick={togglePublish}
          >
              Publish
          </LoadingButton>}
    </>
  );

  let publishInfo = !track.isPublished && (
    (user?.role === "admin" && <span>Not Published</span>) ||
    (user?.role === "user" && user._id === track.addedBy && <span>Not Published</span>)
  );

  let userControllers = user?.role === "user" && (user._id === track.addedBy && !track.isPublished && (
    <LoadingButton
      variant="contained"
      color="error"
      size="small"
      loading={deleteLoading}
      disabled={deleteLoading || publishLoading}
      onClick={removeTrack}
    >
      Delete
    </LoadingButton>
  ));

  return (
    <ListItem>
      <ListItemIcon>
        <AudiotrackIcon/>
      </ListItemIcon>
      <ListItemText style={{width: "40px", flex: "0 0 auto"}}>
        {track.number}
      </ListItemText>
      <ListItemText sx={{textAlign: "left"}}>
        {track.title}
      </ListItemText>
      <ListItemText sx={{textAlign: "right"}}>
        <Typography sx={{display: "inline", mr: 1}}>{publishInfo}</Typography>
        {adminControllers}
        {userControllers}
        {user && (
          <Button onClick={playSong}>
            <PlayCircleOutlineIcon/>
          </Button>
        )}
        {track.duration}
      </ListItemText>
    </ListItem>
  );
};

export default TrackCard;