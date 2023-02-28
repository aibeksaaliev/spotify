import React from 'react';
import {ListItem, ListItemText} from "@mui/material";
import dayjs from "dayjs";
import {TrackHistoryType} from "../../types";

interface Props {
  history: TrackHistoryType;
}

const TrackHistoryCard: React.FC<Props> = ({history}) => {
  const date = dayjs(history.datetime).format("DD/MM/YYYY");
  const time = dayjs(history.datetime).format("HH:mm");


  return (
    <ListItem>
      <ListItemText sx={{textAlign: "left"}}>
        {history.artist + " - " + history.track + " (" + history.album + ")"}
      </ListItemText>
      <ListItemText sx={{textAlign: "right"}}>
        {date + " " + time}
      </ListItemText>
    </ListItem>
  );
};

export default TrackHistoryCard;