import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Truncate from "react-truncate";
export type Movie = {
  id: number;
  name: string;
  description: string;
  url: string;
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

type StyledProps = {
  isMobile: boolean;
};

const StyledCard = styled(Card)<StyledProps>`
  display: flex;
  height: 250px;
  width: ${(props: StyledProps) => (!props.isMobile ? "423px" : "343px")};
  margin: ${(props: StyledProps) => (!props.isMobile ? "0 auto 0 0" : "0")};
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  transform: perspective(3000px) rotateY(5deg);
  transition: transform 1s ease 0s;
  &:hover {
    transform: perspective(1500px) rotateY(15deg);
  }
`;

export const MovieCard: FunctionComponent<Movie> = ({
  id,
  name,
  description,
  url,
}) => {
  const theme = useTheme();
  const TabletUpMatch = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();
  return (
    <motion.li
      key={id}
      initial="hidden"
      animate="visible"
      variants={item}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <StyledCard isMobile={!TabletUpMatch}>
        <CardMedia
          component="img"
          image={url}
          alt={`${name} poster`}
          height="250px"
          sx={{ width: 151 }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: 0,
            height: "calc(250px - 32px",
          }}
        >
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            align="left"
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="left">
            <Truncate width={900}>{description}</Truncate>
          </Typography>
          <CardActions sx={{ paddingLeft: 0, justifyItems: "flex-start" }}>
            <Button variant="text" onClick={() => navigate(`/dossier/${id}`)}>
              View Dossier
            </Button>
            <Button variant="text" onClick={() => navigate(`/visualize`)}>
              View Report
            </Button>
          </CardActions>
        </CardContent>
      </StyledCard>
    </motion.li>
  );
};
