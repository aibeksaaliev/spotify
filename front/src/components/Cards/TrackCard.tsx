import React from 'react';
import {Button, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {TrackType} from "../../types";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../feauters/users/usersSlice";

interface Props {
  track: TrackType;
}

const TrackCard: React.FC<Props> = ({track}) => {
  const user = useAppSelector(selectUser);

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
          <Button>
            <PlayCircleOutlineIcon/>
          </Button>
        )}
        {track.duration}
      </ListItemText>
    </ListItem>
  );
};

export default TrackCard;