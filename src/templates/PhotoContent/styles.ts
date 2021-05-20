import styled from 'styled-components';

export const StyledPhotoContent = styled.div<{ isExpanded?: boolean }>`
  .wrapper {
    cursor: ${({ isExpanded }) => (isExpanded ? 'zoom-out' : 'zoom-in')};
  }
`;
