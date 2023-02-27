import React from 'react';
import {Button, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {TrackType} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../../feauters/users/usersSlice";
import {submitTrackHistory} from "../../feauters/tracks/tracksThunks";

interface Props {
  track: TrackType;
}

const TrackCard: React.FC<Props> = ({track}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const playSong = async () => {
    await dispatch(submitTrackHistory(track._id));
  };

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