import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate, useNavigate} from "react-router-dom";
import {selectUser} from "../../feauters/users/usersSlice";
import {AlbumMutation} from "../../types";
import {createAlbum} from "../../feauters/albums/albumsThunks";
import {Container, Typography} from "@mui/material";
import AlbumForm from "../../components/Forms/AlbumForm";

const NewAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onFormSubmit = async (album: AlbumMutation) => {
    try {
      await dispatch(createAlbum(album)).unwrap();
      navigate('/');
    } catch (e) {
      throw new Error();
    }
  };

  if (!user) {
    return <Navigate to="/login"/>
  }

  return (
    <Container sx={{pt:4}}>
      <Typography variant="h5" sx={{mb:2}}>New Album</Typography>
      <AlbumForm onSubmit={onFormSubmit}/>
    </Container>
  );
};

export default NewAlbum;