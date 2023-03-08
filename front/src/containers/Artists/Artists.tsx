import React, {useEffect} from 'react';
import {CircularProgress, Container, Grid} from "@mui/material";
import ArtistCard from "../../components/Cards/ArtistCard";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectArtists, selectArtistsLoading} from "../../feauters/artists/artistsSlice";
import {getArtists} from "../../feauters/artists/artistsThunks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artistsData = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistsLoading);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  let content = loading ? (
    <Box sx={{ display: 'flex'}}>
      <CircularProgress sx={{margin: "auto"}} />
    </Box>
  ) : (
    <Grid container spacing={4}>
      {artistsData.length !== 0 ? artistsData.map(artist => {
        return <ArtistCard key={artist._id} artist={artist}/>
      }) : (<Typography component="div" sx={{margin: "auto", mt: 5}}>No artists yet</Typography>)}
    </Grid>
  );

  return (
    <div>
      <Container sx={{py:8}} maxWidth="md">
        {content}
      </Container>
    </div>
  );
};

export default Artists;