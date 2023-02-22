import React, {useEffect} from 'react';
import {Container, Grid} from "@mui/material";
import ArtistCard from "../components/Cards/ArtistCard";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectArtists, selectArtistsLoading} from "../feauters/artists/artistsSlice";
import {getArtists} from "../feauters/artists/artistsThunks";

const Artists = () => {
  const dispatch = useAppDispatch();
  const artistsData = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistsLoading);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  return (
    <div>
      <Container sx={{py:8}} maxWidth="md">
        <Grid container spacing={4}>
          {artistsData.map(artist => {
            return <ArtistCard key={artist._id} artist={artist}/>
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Artists;