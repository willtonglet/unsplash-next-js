import styled from 'styled-components';

export const StyledBackground = styled.div<{ backgroundImage: string }>`
  ${({ backgroundImage }) =>
    `background-image: linear-gradient(rgba(255, 255, 255, 0.8), white 150px), url(${backgroundImage}%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60);`}
  background-size: cover;
  background-position: 50%;
`;
