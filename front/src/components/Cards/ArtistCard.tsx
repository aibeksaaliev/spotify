import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ArtistType} from "../../types";
import {apiUrl} from "../../constants";
import {useNavigate} from "react-router-dom";
import NoImageAvailable from "../../../src/assets/images/no_image_available.jpg";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../../feauters/users/usersSlice";
import {LoadingButton} from "@mui/lab";
import {selectArtistDeleteLoading, selectArtistPublishLoading} from "../../feauters/artists/artistsSlice";
import {deleteArtist, publishArtist} from "../../feauters/artists/artistsThunks";

interface Props {
  artist: ArtistType;
}

const ArtistCard: React.FC<Props> = ({artist}) => {
  const dispatch = useAppDispatch();
  const publishLoading = useAppSelector(selectArtistPublishLoading);
  const deleteLoading = useAppSelector(selectArtistDeleteLoading);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  let image = NoImageAvailable;

  if (artist.photo) {
    image = apiUrl + artist.photo;
  }

  const togglePublish = async () => {
    await dispatch(publishArtist(artist._id));
  };

  const removeArtist = async () => {
    await dispatch(deleteArtist(artist._id));
  };

  let adminControllers = user?.role === "admin" && (
    <>
      <LoadingButton
        size="small"
        loading={deleteLoading}
        disabled={deleteLoading || publishLoading}
        onClick={removeArtist}
      >
        Delete
      </LoadingButton>
      {!artist.isPublished &&
          <LoadingButton
              loading={publishLoading}
              disabled={deleteLoading || publishLoading}
              size="small"
              onClick={togglePublish}
          >
              Publish
          </LoadingButton>}
    </>
  );

  let userControllers = user?.role === "user" && (
    user._id === artist.addedBy && !artist.isPublished && (
      <LoadingButton
        loading={deleteLoading}
        disabled={deleteLoading || publishLoading}
        size="small"
        onClick={removeArtist}
      >
        Delete
      </LoadingButton>
    )
  );

  let publishInfo = !artist.isPublished && (
    (user?.role === "admin" && <span>Not Published</span>) ||
    (user?.role === "user" && user._id === artist.addedBy && <span>Not Published</span>)
  );


  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
      >
        <CardMedia
          component="img"
          image={image}
        />
        <CardContent sx={{flexGrow: 1}}>
          <Typography gutterBottom variant="h5" component="h2">
            {artist.name}
          </Typography>
          <Typography>
            {publishInfo}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate('/artists/' + artist._id)}>View</Button>
          {adminControllers}
          {userControllers}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistCard;