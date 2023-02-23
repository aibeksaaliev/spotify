import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AlbumType} from "../../types";
import {apiUrl} from "../../constants";
import {useNavigate} from "react-router-dom";

interface Props {
  album: AlbumType;
}

const AlbumCard: React.FC<Props> = ({album}) => {
  const navigate = useNavigate();
  let image = "";

  if (album.cover) {
    image = apiUrl + album.cover;
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="img"
          image={image}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {album.title}
          </Typography>
          <Typography>{album.releaseYear}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate('/album/' + album._id)}>View</Button>
          <Button size="small" disabled>Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumCard;