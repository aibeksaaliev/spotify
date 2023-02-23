import React, {useEffect} from 'react';
import {CircularProgress, Container, List} from "@mui/material";
import TrackCard from "../components/Cards/TrackCard";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectTracks, selectTracksLoading} from "../feauters/tracks/tracksSlice";
import {useParams} from "react-router-dom";
import {getAlbumTracks} from "../feauters/tracks/tracksThunks";
import Box from "@mui/material/Box";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams() as {id: string};
  const tracksData = useAppSelector(selectTracks);
  const loading = useAppSelector(selectTracksLoading);

  useEffect(() => {
    dispatch(getAlbumTracks(id));
  }, [dispatch, id]);

  let content = loading ? (
    <Box sx={{ display: 'flex'}}>
      <CircularProgress sx={{margin: "auto"}} />
    </Box>
  ) : (
    <List>
      {tracksData.map(track => {
        return <TrackCard key={track._id} track={track}/>
      })}
    </List>
  )


  return (
    <Container sx={{py:8}} maxWidth="md">
      <List>
        {content}
      </List>
    </Container>
  );
};

export default Tracks;