import React, {useEffect} from 'react';
import {CircularProgress, Container, List} from "@mui/material";
import TrackCard from "../components/Cards/TrackCard";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectTracks, selectTracksLoading} from "../feauters/tracks/tracksSlice";
import {useParams} from "react-router-dom";
import {getAlbumTracks} from "../feauters/tracks/tracksThunks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import YouTubePlayer from "../components/YouTubePlayer/YouTubePlayer";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams() as { id: string };
  const tracksData = useAppSelector(selectTracks);
  const loading = useAppSelector(selectTracksLoading);

  useEffect(() => {
    dispatch(getAlbumTracks(id));
  }, [dispatch, id]);

  let content = loading ? (
    <Box sx={{display: 'flex'}}>
      <CircularProgress sx={{margin: "auto"}}/>
    </Box>
  ) : (
    <List>
      {tracksData?.tracks.length !== 0 ? tracksData?.tracks.map(track => {
        return <TrackCard key={track._id} track={track}/>
      }) : (<Typography component="div" sx={{margin: "auto", mt: 5}}>No tracks yet</Typography>)}
    </List>
  )


  return (
    <Container sx={{py: 8}} maxWidth="md">
      <Box sx={{display: tracksData?.albumInfo ? "flex" : "none", justifyContent: "space-between", alignItems: "center"}}>
        <Typography variant="h3" sx={{mb: 2}}>
          {tracksData?.albumInfo.artist.name} - {tracksData?.albumInfo.title} ({tracksData?.albumInfo.releaseYear})
        </Typography>
        <YouTubePlayer/>
      </Box>
      <List>
        {content}
      </List>
    </Container>
  );
};

export default Tracks;