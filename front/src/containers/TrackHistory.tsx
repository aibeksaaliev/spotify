import React, {useEffect} from 'react';
import {Box, CircularProgress, Container, List, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getTrackHistory} from "../feauters/trackHistory/trackHistoryThunks";
import {selectTrackHistory, selectTrackHistoryLoading} from "../feauters/trackHistory/trackHistorySlice";
import TrackHistoryCard from "../components/Cards/TrackHistoryCard";

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectTrackHistoryLoading);
  const trackHistoryData = useAppSelector(selectTrackHistory);

  useEffect(() => {
    dispatch(getTrackHistory());
  }, [dispatch]);

  let content = loading ? (
    <Box sx={{ display: 'flex'}}>
      <CircularProgress sx={{margin: "auto"}} />
    </Box>
  ) : (
    <List>
      {trackHistoryData.length !== 0 ? trackHistoryData.map(trackHistory => {
        return <TrackHistoryCard key={trackHistory._id} history={trackHistory}/>
      }) : (<Typography component="div" sx={{margin: "auto", mt: 5}}>History is empty</Typography>)}
    </List>
  )

  return (
    <Container sx={{py:8}} maxWidth="md">
      <Box>
        <Typography variant="h3">
          Track History
        </Typography>
      </Box>
      <List>
        {content}
      </List>
    </Container>
  );
};

export default TrackHistory;