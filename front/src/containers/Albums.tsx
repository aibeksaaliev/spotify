import React, {useEffect} from 'react';
import {CircularProgress, Container, Grid} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectAlbums, selectAlbumsLoading} from "../feauters/albums/albumsSlice";
import {getArtistAlbums} from "../feauters/albums/albumsThunks";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import AlbumCard from "../components/Cards/AlbumCard";
import Typography from "@mui/material/Typography";

const Albums = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams() as {id: string};
  const albumsData = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectAlbumsLoading);

  useEffect(() => {
    dispatch(getArtistAlbums(id));
  }, [dispatch, id]);

  let content = loading ? (
    <Box sx={{ display: 'flex'}}>
      <CircularProgress sx={{margin: "auto"}} />
    </Box>
  ) : (
    <Grid container spacing={4}>
      {albumsData?.albums.map(album => {
        return <AlbumCard key={album._id} album={album}/>
      })}
    </Grid>
  )

  return (
    <>
      <Container sx={{py:8}} maxWidth="md">
        <Box sx={{display: albumsData?.artist.name ? "block" : "none"}}>
          <Typography variant="h3" sx={{mb: 2}}>
            {albumsData?.artist.name}
          </Typography>
        </Box>
        {content}
      </Container>
    </>
  );
};

export default Albums;