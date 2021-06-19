import styled from 'styled-components';

export const StyledImageContent = styled.a`
  cursor: zoom-in;
  display: block;
  z-index: 1;

  .content {
    visibility: hidden;
  }

  &:hover {
    .content {
      visibility: visible;
    }
  }
`;
