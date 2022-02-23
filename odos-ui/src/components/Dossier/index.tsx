import { useFetchMovieDossier } from "@/hooks";
import styled from "@emotion/styled";
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { ModalDialog, CoverImage } from "@/components";
import { useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  margin: 32px auto;
  justify-content: center;
  display: flex;

  div:nth-child(2) {
    margin: 0px 32px;
    width: 40%;
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




export const Dossier = () => {
  // const [queryRefetch, setQueryFetch] = useState(true);
  const params = useParams();
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();
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
          <CoverImage name={data.name} url={data.url} />
          <IconButton
            color="primary"
            aria-label="Edit Movie"
            component="span"
            onClick={()=>navigate(`/dossier/${params.id}/edit`)}
            sx={{
              justifyContent: "flex-end",
              width: "fit-content",
              alignSelf: "flex-end",
            }}
          >
            <EditOutlined />
          </IconButton>
          
        </div>
        <TextContainer>
          <h2>{data.name}<IconButton
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
          </IconButton></h2>
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
                    {data.director}
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Starring:</TableCell>
                <TableCell>
                  {data.actors.map((a: any) => (
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
                <TableCell>{data.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">
                  {data.genres.length > 1 ? "Categories" : "Category"}:
                </TableCell>
                <TableCell>{data.genres.join(", ")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div id="description" dangerouslySetInnerHTML={{__html: data.description}} />
        </TextContainer>
        <ModalDialog
          title={`Delete - ${data.name}`}
          content={
            "Deleting will permanently remove this record and its associations from the system."
          }
          isOpen={openDelete}
          setIsOpen={setOpenDelete}
          actions={[{ text: "Proceed", autoFocus: false },
          { text: "Cancel", autoFocus: true }]}
        />
      </Container>
    );
  else return <Container />;
};
