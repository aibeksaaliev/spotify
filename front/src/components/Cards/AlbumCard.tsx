import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AlbumType} from "../../types";
import {apiUrl} from "../../constants";
import {useNavigate} from "react-router-dom";
import NoImageAvailable from "../../../src/assets/images/no_image_available.jpg";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../../feauters/users/usersSlice";
import {deleteAlbum, getArtistAlbums, publishAlbum} from "../../feauters/albums/albumsThunks";
import {selectAlbumDeleteLoading, selectAlbumPublishLoading} from "../../feauters/albums/albumsSlice";

interface Props {
  album: AlbumType;
}

const AlbumCard: React.FC<Props> = ({album}) => {
  const dispatch = useAppDispatch();
  const publishLoading = useAppSelector(selectAlbumPublishLoading);
  const deleteLoading = useAppSelector(selectAlbumDeleteLoading);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  let image = NoImageAvailable;

  if (album.cover) {
    image = apiUrl + album.cover;
  }

  const togglePublish = async () => {
    await dispatch(publishAlbum(album._id));
    await dispatch(getArtistAlbums(album.artist));
  };

  const removeAlbum = async () => {
    await dispatch(deleteAlbum(album._id));
    await dispatch(getArtistAlbums(album.artist));
  };

  let adminControllers = user?.role === "admin" && (
    <>
      <LoadingButton
        loading={deleteLoading}
        disabled={deleteLoading || publishLoading}
        size="small"
        onClick={removeAlbum}
      >
        Delete
      </LoadingButton>
      {!album.isPublished &&
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

  let publishInfo = !album.isPublished && (
    (user?.role === "admin" && <span>Not Published</span>) ||
    (user?.role === "user" && user._id === album.addedBy && <span>Not Published</span>)
  );

  let userControllers = user?.role === "user" && (user._id === album.addedBy && !album.isPublished && (
    <LoadingButton
      loading={deleteLoading}
      disabled={deleteLoading || publishLoading}
      size="small"
      onClick={removeAlbum}
    >
      Delete
    </LoadingButton>
  ));

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
            {album.title}
          </Typography>
          <Typography>{album.releaseYear}</Typography>
          <Typography>{album.tracksAmount} songs</Typography>
          <Typography>{publishInfo}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate('/albums/' + album._id)}>View</Button>
          {adminControllers}
          {userControllers}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumCard;