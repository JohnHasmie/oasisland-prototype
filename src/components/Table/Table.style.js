import { Table } from "antd";
import tw, { styled, css } from "twin.macro";

export const StyledTable = styled(Table)(({ hidden }) => [
    tw``,
    css`
        && {
            .ant-table-tbody > tr.ant-table-row-level-0:hover > td{
                .isVisible{
                    ${tw`visible`}
                }

            }
            tbody > tr:hover > td {
                background: rgba(224, 248, 232, 1);
              }

        }
    `,
    /** Example of passing property to the styles */
    hidden && tw`hidden`,
])