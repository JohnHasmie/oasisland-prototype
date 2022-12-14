import { Button } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledButtonInvite = styled(Button)(({ hidden }) => [
  tw`p-button bg-transparent  !border !border-[#cdd4d9] md:!border-transparent   hover:!border hover:!border-[#cdd4d9] shadow-none  px-4 flex items-center justify-center `,
  css`
    && {
    

      span {
        ${tw`text-xl text-[#576981]`}
      }

      &:hover {
        span {
          ${tw`text-xl text-black`}
        }
        svg path {
          fill: black;
        }
      }

      .anticon {
        ${tw`ml-2 flex items-center md:-mr-3 font-bold text-gray-400 `}
        path {
          ${tw`fill-current`}
        }
      }

      &:not(:hover) {
        border: 2px solid white;
      }

      svg {
        ${tw` ml-2 `}
        path {
          fill: #576981;
        }
      }
    }
  `,
  /** Example of passing property to the styles */
  hidden && tw`hidden`,
]);
