import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate, useNavigate} from "react-router-dom";
import {selectUser} from "../../feauters/users/usersSlice";
import {TrackMutation} from "../../types";
import {createTrack} from "../../feauters/tracks/tracksThunks";
import {Container, Typography} from "@mui/material";
import TrackForm from "../../components/Forms/TrackForm";

const NewTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onFormSubmit = async (track: TrackMutation) => {
    try {
      await dispatch(createTrack(track)).unwrap();
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
      <Typography variant="h5" sx={{mb:2}}>New Track</Typography>
      <TrackForm onSubmit={onFormSubmit}/>
    </Container>
  );
};

export default NewTrack;