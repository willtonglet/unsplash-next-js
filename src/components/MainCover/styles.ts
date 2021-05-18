import styled from 'styled-components';

export const StyledMainCover = styled.section<{ image?: string }>`
  ${({ image }) => image && `background-image: url(${image});`}
  height: 660px;
  overflow: hidden;
  position: relative;
`;
