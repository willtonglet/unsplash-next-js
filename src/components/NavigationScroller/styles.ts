import styled from 'styled-components';

export const StyledNavigationScroller = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }
`;
