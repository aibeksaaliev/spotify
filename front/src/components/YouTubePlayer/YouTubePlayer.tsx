import React from 'react';
import {useAppSelector} from "../../app/hooks";
import {selectYouTubeVideoId} from "../../feauters/tracks/tracksSlice";
import {Box} from "@mui/material";

const YouTubePlayer = () => {
  const videoId = useAppSelector(selectYouTubeVideoId);

  return (
    <Box style={{display: videoId ? "block" : "none"}}>
      <iframe
        width="200"
        height="113"
        src={"https://www.youtube.com/embed/" + videoId + "?autoplay=1"}
        title="YouTube video player"
        style={{border: 0}}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </Box>
  );
};

export default YouTubePlayer;