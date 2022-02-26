import {
  ChipAutocomplete,
  CoverImage,
  Fab,
  ModalDialog,
  PlaceHolderImage,
} from "@/components";
import { useFetchMovieDossier } from "@/hooks";
import styled from "@emotion/styled";
import { Save } from "@mui/icons-material";
import { TextField, useMediaQuery, useTheme } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type StyledProps = {
  isMobile: boolean;
};

const Container = styled.div<StyledProps>`
  margin: 32px auto;
  justify-content: center;
  display: flex;
  flex-flow: ${(props: StyledProps) => (!props.isMobile ? "row" : "column")};
  min-height: calc(100vh - 186px);

  #dossier-text:nth-child(2) {
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
  const theme = useTheme();
  const TabletUpMatch = useMediaQuery(theme.breakpoints.up("sm"));
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

  console.log(TabletUpMatch);

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
        <Container isMobile={!TabletUpMatch}>
          <div id="cover">
            {formData.url ? (
              <CoverImage name={formData.name} url={formData.url} />
            ) : (
              <PlaceHolderImage />
            )}
            <label
              htmlFor="image-upload"
              style={{
                alignSelf: `${TabletUpMatch ? "flex-start" : "center"}`,
              }}
            >
              Choose a new image
            </label>
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
          <div
            className="EditButton"
            style={{
              position: "sticky",
              zIndex: 1000,
              bottom: "24px",
              right: "24px",
            }}
          >
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
  } else return <div />;
};
