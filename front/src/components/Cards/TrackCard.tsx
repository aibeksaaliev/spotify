import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import {TrackType} from "../../types";

interface Props {
  track: TrackType;
}

const TrackCard: React.FC<Props> = ({track}) => {
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
        {track.duration}
      </ListItemText>
    </ListItem>
  );
};

export default TrackCard;