import styled from "@emotion/styled";
import { useMediaQuery, useTheme } from "@mui/material";

type ImageProps = {
  isMobile: boolean;
};

const Image = styled.img`
  object-fit: none;
  align-self: ${(props: ImageProps) =>
    !props.isMobile ? "flex-start" : "center"};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  transform: perspective(3000px) rotateY(5deg);
  transition: transform 1s ease 0s;
  &:hover {
    transform: perspective(1500px) rotateY(10deg);
  }
`;

type Props = {
  name: string;
  url: string;
};

export const CoverImage = ({ name, url }: Props) => {
  const theme = useTheme();
  const TabletUpMatch = useMediaQuery(theme.breakpoints.up("sm"));
  return <Image alt={name} src={url} isMobile={!TabletUpMatch} />;
};
