import styled from 'styled-components';

export const StyledPicture = styled.picture`
  display: block;
  height: 100%;
  position: relative;
  box-sizing: border-box;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.38) 0,
      rgba(0, 0, 0, 0.38) 3.5%,
      rgba(0, 0, 0, 0.379) 7%,
      rgba(0, 0, 0, 0.377) 10.35%,
      rgba(0, 0, 0, 0.375) 13.85%,
      rgba(0, 0, 0, 0.372) 17.35%,
      rgba(0, 0, 0, 0.369) 20.85%,
      rgba(0, 0, 0, 0.366) 24.35%,
      rgba(0, 0, 0, 0.364) 27.85%,
      rgba(0, 0, 0, 0.361) 31.35%,
      rgba(0, 0, 0, 0.358) 34.85%,
      rgba(0, 0, 0, 0.355) 38.35%,
      rgba(0, 0, 0, 0.353) 41.85%,
      rgba(0, 0, 0, 0.351) 45.35%,
      rgba(0, 0, 0, 0.35) 48.85%,
      rgba(0, 0, 0, 0.353) 52.35%,
      rgba(0, 0, 0, 0.36) 55.85%,
      rgba(0, 0, 0, 0.371) 59.35%,
      rgba(0, 0, 0, 0.385) 62.85%,
      rgba(0, 0, 0, 0.402) 66.35%,
      rgba(0, 0, 0, 0.42) 69.85%,
      rgba(0, 0, 0, 0.44) 73.35%,
      rgba(0, 0, 0, 0.46) 76.85%,
      rgba(0, 0, 0, 0.48) 80.35%,
      rgba(0, 0, 0, 0.498) 83.85%,
      rgba(0, 0, 0, 0.515) 87.35%,
      rgba(0, 0, 0, 0.529) 90.85%,
      rgba(0, 0, 0, 0.54) 94.35%,
      rgba(0, 0, 0, 0.547) 97.85%,
      rgba(0, 0, 0, 0.55)
    );
  }

  * {
    box-sizing: border-box;
  }

  img {
    width: 100%;
    height: 100%;
    font-family: 'object-fit:cover';
    object-fit: cover;
    vertical-align: middle;
  }
`;
