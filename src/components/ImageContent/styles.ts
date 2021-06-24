import styled from 'styled-components';

export const StyledImageContent = styled.div`
  cursor: zoom-in;
  display: block;

  .content {
    visibility: hidden;
    cursor: zoom-in;
  }

  &:hover {
    .content {
      visibility: visible;
    }
  }
`;
