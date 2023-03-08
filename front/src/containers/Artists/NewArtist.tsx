import React from 'react';
import ArtistForm from "../../components/Forms/ArtistForm";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate, useNavigate} from "react-router-dom";
import {selectUser} from "../../feauters/users/usersSlice";
import {ArtistMutation} from "../../types";
import {createArtist} from "../../feauters/artists/artistsThunks";
import {Container, Typography} from "@mui/material";

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const onFormSubmit = async (artist: ArtistMutation) => {
    try {
      await dispatch(createArtist(artist)).unwrap();
      navigate('/');
    } catch (e) {
      throw new Error();
    }
  };

  if (!user) {
    return <Navigate to="/login"/>;
  }

  return (
    <Container sx={{pt:4}}>
      <Typography variant="h5" sx={{mb:2}}>New Artist</Typography>
      <ArtistForm onSubmit={onFormSubmit}/>
    </Container>
  );
};

export default NewArtist;