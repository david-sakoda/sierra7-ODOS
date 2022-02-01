import { Button, Card, CardActions, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import {Link as RouterLink} from "react-router-dom";
import Truncate from 'react-truncate';

export type Movie = {
    id: number,
    name: string, 
    description: string, 
    url: string
}

export const MovieCard : FunctionComponent<Movie> = ({id, name, description, url}) => {
    
  return (
    
      <Card key={id} sx={{ maxWidth: 345, display: "grid", gridTemplateColumns: "1fr 1fr", width: "345px", height: "250px" }}>
        <CardMedia
          component="img"
          image={url}
          alt={`${name} poster`}
          height="250px"
          
        />
        <CardContent sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: 0, height: "calc(250px - 32px"}}>
          <Typography gutterBottom variant="subtitle1" component="div" align="left">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary"  align="left">
            <Truncate  lines={4}>{description}</Truncate>
          </Typography>
        <CardActions sx={{ paddingLeft: 0, justifyItems: "flex-start"}}>
          <Button variant="text"><Link component={RouterLink} to={`/dossier/${id}`}>View Dossier</Link></Button>
        </CardActions>
        </CardContent>
      </Card>
    
  );
};
