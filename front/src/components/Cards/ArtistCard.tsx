import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ArtistType} from "../../types";
import {apiUrl} from "../../constants";
import {useNavigate} from "react-router-dom";
import NoImageAvailable from "../../../src/assets/images/no_image_available.jpg";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../feauters/users/usersSlice";
import {LoadingButton} from "@mui/lab";

interface Props {
  artist: ArtistType;
}

const ArtistCard: React.FC<Props> = ({artist}) => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  let image = NoImageAvailable;

  if (artist.photo) {
    image = apiUrl + artist.photo;
  }

  let adminControllers = user?.role === "admin" && (
    <>
      <LoadingButton size="small">
        Delete
      </LoadingButton>
      {!artist.isPublished &&
          <LoadingButton size="small">
              Publish
          </LoadingButton>}
    </>
  );

  let userControllers = user?.role === "user" && (
    user._id === artist.addedBy && !artist.isPublished && (
      <LoadingButton>
        Delete
      </LoadingButton>
    )
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