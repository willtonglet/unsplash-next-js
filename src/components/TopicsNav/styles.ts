import styled from 'styled-components';

export const StyledTopicsNav = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 100vw;
  height: 3.5rem;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    min-width: 100vw;

    li {
      display: inline-flex;
      height: 3.5rem;
      padding: 0 0.6rem;
      align-items: center;
    }
  }
`;
