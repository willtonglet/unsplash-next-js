import styled from 'styled-components';

export const StyledImageContent = styled.a`
  cursor: zoom-in;

  .content {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 1rem;
    flex-direction: column;
    justify-content: space-between;
  }

  &:hover {
    .content {
      display: flex;
    }
  }
`;
