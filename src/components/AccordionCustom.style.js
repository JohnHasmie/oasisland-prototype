import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import tw, { styled, css } from "twin.macro";

export const AccordionCustomPanel = styled(CollapsePanel)(() => [
    tw``,
    css`
        && {
            .ant-collapse-header {
                ${tw`bg-pink-300 md:pl-24`}
            }
            .ant-collapse-content-box {
                ${tw`md:pl-24`}
            }
            .anticon{
                ${tw`absolute right-5 top-8 bg-white p-2 rounded-full`}
            }
        }
    `,


])

