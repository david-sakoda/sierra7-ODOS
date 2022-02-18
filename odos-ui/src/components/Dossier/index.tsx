import { useFetchMovieDossier } from "@/hooks";
import styled from "@emotion/styled";
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

const Container = styled.div`
  margin: 32px auto;
  justify-content: center;
  display: flex;

  div:nth-child(2) {
    margin: 0px 32px;
    width: 25%;
  }
  #cover {
    display: flex;
    flex-direction: column;
    align-content: flex-end;
  }
`;

const TextContainer = styled.div`
  text-align: left;
`;

const CoverImage = styled.img`
  object-fit: none;
  align-self: flex-start;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  transform: perspective(3000px) rotateY(5deg);
  transition: transform 1s ease 0s;
  &:hover {
    transform: perspective(1500px) rotateY(10deg);
  }
`;

const actorsArray = [
  { name: "Adam Driver", character: "Paterson" },
  { name: "Golshiefteh Farahani", character: "Laura" },
];
const categoriesArray = ["Drama", "Romance", "Thriller"];

export const Dossier = () => {
  // const [queryRefetch, setQueryFetch] = useState(true);
  const params = useParams();
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };
  const { isLoading, data } = useFetchMovieDossier(params.id);
  if (data && !isLoading)
    return (
      <Container>
        <div id="cover">
          <CoverImage alt={data.name} src={data.url} />
          <IconButton
            color="primary"
            aria-label="Edit Movie"
            component="span"
            sx={{
              justifyContent: "flex-end",
              width: "fit-content",
              alignSelf: "flex-end",
            }}
          >
            <EditOutlined />
          </IconButton>
          <IconButton
            color="error"
            aria-label="Delete Movie"
            component="span"
            onClick={handleClickOpen}
            sx={{
              justifyContent: "flex-end",
              width: "fit-content",
              alignSelf: "flex-end",
            }}
          >
            <DeleteForeverOutlined />
          </IconButton>
        </div>
        <TextContainer>
          <h2>{data.name}</h2>
          <Button variant="text">
            <Link component={RouterLink} to="/visualize">
              VIEW REPORT
            </Link>
          </Button>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head">Director:</TableCell>
                <TableCell>
                  <Link component={RouterLink} to="/visualize">
                    Jim Jarmusch
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Starring:</TableCell>
                <TableCell>
                  {actorsArray.map((a) => (
                    <>
                      <Link component={RouterLink} to="/visualize">
                        {a.name}
                      </Link>{" "}
                      as{" "}
                      <Link component={RouterLink} to="/visualize">
                        {a.character}
                      </Link>
                      <br />
                    </>
                  ))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Year:</TableCell>
                <TableCell>1999</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">
                  {categoriesArray.length > 1 ? "Categories" : "Category"}:
                </TableCell>
                <TableCell>{categoriesArray.join(", ")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Et
            pharetra pharetra massa massa. Pellentesque habitant morbi tristique
            senectus. Eget egestas purus viverra accumsan in nisl nisi
            scelerisque. Luctus accumsan tortor posuere ac ut consequat semper
            viverra nam. Diam vulputate ut pharetra sit amet. Arcu cursus vitae
            congue mauris rhoncus aenean vel. Mi sit amet mauris commodo quis
            imperdiet massa. Malesuada pellentesque elit eget gravida cum sociis
            natoque. Odio pellentesque diam volutpat commodo sed egestas egestas
            fringilla.
          </p>
          <p>
            Sapien et ligula ullamcorper malesuada proin libero nunc. Platea
            dictumst vestibulum rhoncus est pellentesque elit ullamcorper
            dignissim cras. At urna condimentum mattis pellentesque id nibh
            tortor id. Quis auctor elit sed vulputate mi sit amet. Viverra
            maecenas accumsan lacus vel facilisis. Ridiculus mus mauris vitae
            ultricies leo integer. At imperdiet dui accumsan sit amet nulla
            facilisi. Nisi est sit amet facilisis magna etiam. Sagittis orci a
            scelerisque purus. Ipsum faucibus vitae aliquet nec ullamcorper.
            Purus sit amet luctus venenatis lectus magna. Platea dictumst
            quisque sagittis purus sit amet volutpat consequat. Massa tincidunt
            nunc pulvinar sapien et ligula ullamcorper. Sed ullamcorper morbi
            tincidunt ornare massa eget egestas purus viverra.
          </p>
        </TextContainer>
        <Dialog
          open={openDelete}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Delete - ${data.name}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleting will permanently remove this record and it's associations from the system.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Proceed</Button>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  else return <Container />;
};
