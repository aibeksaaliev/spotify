import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ArtistType} from "../../types";
import {apiUrl} from "../../constants";

interface Props {
  artist: ArtistType;
}

const ArtistCard: React.FC<Props> = ({artist}) => {
  let image = "";

  if (artist.photo) {
    image = apiUrl + artist.photo;
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
            {artist.name}
          </Typography>
          <Typography>
            {artist.info}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View</Button>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistCard;