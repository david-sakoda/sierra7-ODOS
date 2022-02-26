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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ModalDialog, CoverImage } from "@/components";
import { Fragment, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

type StyledProps = {
  isMobile: boolean;
};

const Container = styled.div`
  margin: 32px auto;
  justify-content: center;
  display: flex;
  flex-flow: ${(props: StyledProps) => (!props.isMobile ? "row" : "column")};

  div:nth-child(2) {
    margin: 0px 32px;
    width: ${(props: StyledProps) => (!props.isMobile ? "40%" : "auto")};
  }
  #cover {
    display: flex;
    flex-direction: column;
    align-content: ${(props: StyledProps) =>
      !props.isMobile ? "flex-start" : "center"};
    align-items: ${(props: StyledProps) =>
      !props.isMobile ? "flex-start" : "center"};
    margin-bottom: 16px;
  }
`;

const TextContainer = styled.div`
  text-align: left;
`;

export const Dossier = () => {
  // const [queryRefetch, setQueryFetch] = useState(true);
  const theme = useTheme();
  const TabletUpMatch = useMediaQuery(theme.breakpoints.up("sm"));
  const params = useParams();
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  const keycloakRoles =
    keycloak.idTokenParsed && keycloak.idTokenParsed.resource_access
      ? keycloak.idTokenParsed.resource_access["odos-ui"]?.roles
      : null;

  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };
  const { isLoading, data } = useFetchMovieDossier(params.id);
  if (data && !isLoading)
    return (
      <Container isMobile={!TabletUpMatch}>
        <div id="cover">
          <CoverImage name={data.name} url={data.url} />
          {keycloakRoles && keycloakRoles.includes("SUPERVISOR") && (
            <IconButton
              color="primary"
              aria-label="Edit Movie"
              component="span"
              onClick={() => navigate(`/dossier/${params.id}/edit`)}
              sx={{
                justifyContent: "flex-end",
                width: "fit-content",
                alignSelf: "flex-end",
              }}
            >
              <EditOutlined />
            </IconButton>
          )}
        </div>
        <TextContainer>
          <h2>
            {data.name}
            {keycloakRoles && keycloakRoles.includes("SUPERVISOR") && (
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
            )}
          </h2>
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
                  {data.actors.map((a: any, index: number) => (
                    <Fragment key={index}>
                      <Link component={RouterLink} to="/visualize">
                        {a.name}
                      </Link>{" "}
                      as{" "}
                      <Link component={RouterLink} to="/visualize">
                        {a.character}
                      </Link>
                      <br />
                    </Fragment>
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
          <div
            id="description"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </TextContainer>
        <ModalDialog
          title={`Delete - ${data.name}`}
          content={
            "Deleting will permanently remove this record and its associations from the system."
          }
          isOpen={openDelete}
          setIsOpen={setOpenDelete}
          actions={[
            {
              text: "Proceed",
              autoFocus: false,
              onClickFunction: () => {
                navigate("/");
              },
            },
            { text: "Cancel", autoFocus: true },
          ]}
        />
      </Container>
    );
  else return <div />;
};
