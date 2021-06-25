import styled from 'styled-components';

export const StyledPopover = styled.div`
  .popper-wrapper {
    .popper {
      animation: ping 0.1s ease-in-out forwards;

      &.remove {
        animation: pingOut 0.05s linear forwards;
      }

      @keyframes ping {
        0% {
          transform: scale(0);
        }
        75% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }

      @keyframes pingOut {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(0);
        }
      }

      .arrow {
        position: absolute;
        width: 10px;
        height: 10px;
        top: 0;
        left: 10px;

        &:after {
          content: ' ';
          position: absolute;
          top: -0.3rem;
          left: 0;
          transform: rotate(45deg);
          width: 10px;
          height: 10px;
          background-color: white;
          box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
        }
      }
    }
    &[data-popper-placement^='top'] > .popper {
      .arrow {
        top: unset;
        bottom: 0;

        :after {
          box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
          top: unset;
          bottom: -0.3rem;
        }
      }
    }
  }
`;
