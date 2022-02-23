import styled from "@emotion/styled";

const Image = styled.img`
  object-fit: none;
  align-self: flex-start;
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
}

export const CoverImage = ({name, url}: Props) => <Image alt={name} src={url} />