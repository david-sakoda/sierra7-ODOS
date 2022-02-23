import { useFetchMovieDossier } from "@/hooks";
import styled from "@emotion/styled";
import { Image, ImageOutlined, Save } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { MouseEventHandler, useEffect, useState } from "react";
import {
  PlaceHolderImage,
  CoverImage,
  ChipAutocomplete,
  Fab,
  ModalDialog,
} from "@/components";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const Container = styled.div`
  margin: 32px auto;
  justify-content: center;
  display: flex;

  #dossier-text:nth-child(2) {
    margin: 0px 32px;
    width: 40%;
  }
  #cover {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    gap: 8px;
  }
  
`;

const TextContainer = styled.div`
  text-align: left;
`;

const Form = styled.form`
  display: grid;
  gap: 8px;
`;

type Props = {
  type: "edit" | "add";
};

type formdata = {
  name: string;
  director: string;
  actors: [{ name: string; character: string }];
  year: string;
  genres: [string];
  description: string;
  url: string;
};

export const UpsertMovie = ({ type }: Props) => {
  const [formData, setFormData] = useState<formdata>({
    name: "",
    director: "",
    actors: [{ name: "", character: "" }],
    year: "",
    genres: [""],
    description: "",
    url: "",
  });
  const params = useParams();
  const [openSave, setOpenSave] = useState(false);

  const user = useKeycloak();
  const navigate = useNavigate();
  const roleArray = user.keycloak.idTokenParsed?.resource_access
    ? user.keycloak.idTokenParsed.resource_access["odos-ui"].roles
    : [];

  // Only call API on Edits, not Adds
  const { isLoading, data } = useFetchMovieDossier(params.id, type === "edit");

  useEffect(() => {
    if (data && !isLoading) {
      setFormData({ ...data });
    }
  }, [data, isLoading]);

  const handleSave = () => {
    //mutate on movie item

    //Dialog to confirm success/fail
    setOpenSave(true);
  };

  const handleDialogClose: MouseEventHandler = () => {
    const id = params.id; //Or returned id from mutation
    // Navigate to Dossier page for item

    navigate(`/dossier/${id}`);
  };

  if ((formData.name !== "" && data && !isLoading) || type === "add") {
    return (
      <>
      <Container>
        <div id="cover">
          {formData.url ? (
            <CoverImage name={formData.name} url={formData.url} />
          ) : (
            <PlaceHolderImage />
          )}
          <label htmlFor="image-upload" style={{alignSelf:"flex-start"}}>Choose a new image</label>
          <input id="image-upload" type="file" accept="'image/*'" />
        </div>
        <TextContainer id="dossier-text">
          <Form>
            <TextField
              fullWidth
              id="title"
              label="Title"
              variant="outlined"
              defaultValue={formData.name}
            />
            <TextField
              fullWidth
              id="director"
              label="Director"
              variant="outlined"
              defaultValue={formData.director}
            />
            <ChipAutocomplete
              label="Starring"
              options={[]}
              values={formData.actors.map((i) =>
                i.name !== "" ? `${i.name} as ${i.character}` : ""
              )}
            />
            {/* <FormControl variant="filled">
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="actor" aria-describedby="actor" />
              
            </FormControl> */}

            <TextField
              fullWidth
              id="year"
              label="Year"
              InputProps={{ inputProps: { min: 1900, max: 2022 } }}
              InputLabelProps={{
                shrink: true,
              }}
              type="number"
              variant="outlined"
              defaultValue={formData.year}
            />
            <ChipAutocomplete
              label="Categories"
              options={[]}
              values={formData.genres}
            />
            <TextField
              id="description"
              label="Description"
              multiline
              minRows={5}
              defaultValue={formData.description}
            />
          </Form>
        </TextContainer>
        
        <ModalDialog
          title={`Save - ${formData.name}`}
          content={"Save was successful"}
          isOpen={openSave}
          setIsOpen={setOpenSave}
          actions={[
            {
              text: "Confirm",
              autoFocus: true,
              onClickFunction: handleDialogClose,
            },
          ]}
        />
      </Container>
      {roleArray.includes("SUPERVISOR") && (
        <div className="EditButton" style={{
          position: "sticky", zIndex: 1000,
          bottom: "24px",
          right: "24px"
        }}>
          <Fab
            color="primary"
            label="save"
            onClick={handleSave}
            text="Save Movie"
          >
            <Save />
          </Fab>
        </div>
      )}
      </>
    );
  } else return <Container />;
};
