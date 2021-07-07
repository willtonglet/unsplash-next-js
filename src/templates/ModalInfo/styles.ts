import styled from 'styled-components';

export const StyledBackground = styled.div<{ backgroundImage: string }>`
  ${({ backgroundImage }) =>
    `background-image: linear-gradient(rgba(255, 255, 255, 0.8), white 150px), url(${backgroundImage});`}
  background-size: cover;
  background-position: 50%;
`;
