import styled from 'styled-components';

export const StyledImageContent = styled.a`
  cursor: zoom-in;
  display: block;
  z-index: 1;

  .content {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 1rem;
    flex-direction: column;
    justify-content: flex-end;
  }

  &:hover {
    .content {
      display: flex;
    }
  }
`;
