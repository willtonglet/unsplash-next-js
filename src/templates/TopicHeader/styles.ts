import styled from 'styled-components';

export const StyledTopicHeader = styled.div`
  grid-template-columns: repeat(3, [col-start] 1fr);

  .info-text {
    p {
      margin-bottom: 1rem;
    }

    a {
      color: #767676;
      transition: color 0.1s ease-in-out, opacity 0.1s ease-in-out;
      -webkit-text-decoration-skip: ink;
      text-decoration-skip-ink: auto;
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;
