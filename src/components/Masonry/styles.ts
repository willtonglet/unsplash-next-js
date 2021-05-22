import styled from 'styled-components';

export const StyledMasonry = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: stretch;
  box-sizing: border-box;
  width: 100%;

  .column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: stretch;
    flex: 1;
    width: 0;
    height: fit-content;
  }
`;
