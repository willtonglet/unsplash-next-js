import styled from 'styled-components';

export const StyledMainCover = styled.section<{ image?: string }>`
  ${({ image }) => image && `background-image: url(${image});`}
  background-size: cover;
  background-position-y: center;
  height: 560px;
  overflow: hidden;
  position: relative;
`;
