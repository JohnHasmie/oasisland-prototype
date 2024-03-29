// import { useState } from "react";
import {
  CloseCircleFilled,
  LogoutOutlined,
  SettingOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Menu, Button, Popover, Typography, Skeleton } from "antd";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import tw from "twin.macro";
import axios from "axios";
import { useQuery } from "react-query";
import AppContext from "../context/AppContext";
import useAuth, { unsetClientCredential } from "../../hooks/useAuth";

function Sidenav({ color }) {
  const { Title } = Typography;
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { setUser, setSetting } = useContext(AppContext);
  const { role } = useAuth();

  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      return window.scrollY > 0 && setClicked(false);
    });
  });
  const { data: settingData, status: settingStatus } = useQuery(
    "settings",
    () => axios.get("settings").then((res) => res.data?.data)
  );
  const { data, status } = useQuery("profile", () =>
    axios.get("user/profile").then((res) => res.data?.data)
  );

  const text = <Title level={5}>{data?.user?.company_name}</Title>;
  useEffect(() => {
    data && setUser({ data: data?.user, status: status });
  }, [data]);
  useEffect(() => {
    settingData &&
      setSetting({ data: settingData?.setting, status: settingStatus });
  }, [settingData]);
  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const tables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const billing = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const rtl = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 6C3 4.34315 4.34315 3 6 3H16C16.3788 3 16.725 3.214 16.8944 3.55279C17.0638 3.89157 17.0273 4.29698 16.8 4.6L14.25 8L16.8 11.4C17.0273 11.703 17.0638 12.1084 16.8944 12.4472C16.725 12.786 16.3788 13 16 13H6C5.44772 13 5 13.4477 5 14V17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17V6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signin = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signup = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      key={0}
    >
      <path
        d="M0,2A2,2,0,0,1,2,0H8a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H2A2,2,0,0,1,0,8Z"
        transform="translate(4 4)"
        fill={color}
      />
      <path
        d="M2,0A2,2,0,0,0,0,2V8a2,2,0,0,0,2,2V4A2,2,0,0,1,4,2h6A2,2,0,0,0,8,0Z"
        fill={color}
      />
    </svg>,
  ];

  const bell = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z"
        fill="#fff"
      ></path>
      <path
        d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const logsetting = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  async function logout() {
    await axios.post("auth/logout").then((res) => res.data);
    await unsetClientCredential();
    hide();
    window.location.href = "/";
  }
  const content = (
    <Menu theme="light" mode="inline" style={{ width: "300px" }}>
      <Menu.Item className="menu-border" >
        <NavLink
          tw="text-base"
          
          onClick={() => {
            hide();
          }}
          to="/global-settings"
        >
          <SettingOutlined />
          <span>Settings</span>
        </NavLink>
      </Menu.Item>

      <Menu.Item className="menu-border">
        <NavLink
          tw="text-base"
          onClick={() => {
            hide();
          }}
          to="/items"
        >
          <TagOutlined />
          <span>Items</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <button tw="bg-transparent pl-0 cursor-pointer" onClick={logout}>
          <LogoutOutlined />
          <span>Log Out</span>
        </button>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className="profile" style={{ position: "relative" }}>
        {status === "success" && (
          <>
            {/* <img
              src={data?.user?.avatar + "+" + data?.user?.last_name}
              className="profile-photo"
              alt="profile"
            /> */}
            {data?.user?.avatar?.includes("storage") ? (
              <img
                src={data?.user?.avatar}
                alt="profile"
                tw="w-20 h-20 rounded-full"
              />
            ) : data?.user?.first_name !== null &&
              data?.user?.last_name !== null ? (
              <div tw="rounded-full w-[70px] bg-gray-300 text-black px-2 py-3.5 text-4xl font-medium">
                {data?.user?.first_name[0] + data?.user?.last_name[0]}
              </div>
            ) : (
              <div tw="rounded-full w-[70px] bg-gray-300 text-black px-2 py-3.5 text-4xl font-medium">
                UK
              </div>
            )}
            <span style={{ marginTop: "1rem" }}>
              {data?.user?.first_name ? data?.user?.first_name : "Unknown"}
            </span>
          </>
        )}
        {status === "loading" && (
          <div role="status" tw="flex flex-col items-center justify-center">
            <svg
              tw="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {status === "error" && (
          <div tw="flex flex-col items-center justify-center">
            {/* <CloseCircleFilled tw="text-3xl text-red-400" /> */}

            <span className="sr-only">Error</span>
          </div>
        )}
        {status === "success" && (
          <span tw="font-bold">{data?.user?.company_name}</span>
        )}
        {status === "loading" && (
          <div
            role="status"
            tw="flex flex-col items-center justify-center mt-10"
          >
            <svg
              tw="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {status === "error" && (
          <div tw="flex flex-col items-center justify-center">
            <CloseCircleFilled tw="text-2xl text-red-400" />

            <span className="sr-only">Error</span>
          </div>
        )}
        {/* bell dihidden sementara */}
        {/* <div style={{ position: "absolute", right: "-8px", top: "4px" }}>
          {bell}
        </div> */}
        {/* <NavLink to="/global-settings" style={{ position: "absolute", right: "-8px", top: "40px", cursor:"pointer" }}>{logsetting}</NavLink> */}
        {/* <Popover
              placement="rightTop"
              content={<content />}
              trigger="click"
              visible={clicked}
              onVisibleChange={handleClickChange}
            >
              <Button tw="!py-6 bg-success text-white">
                <span>Create New...</span>
              </Button>
            </Popover> */}

        <Popover
          placement="rightTop"
          title={text}
          content={content}
          trigger="click"
          visible={clicked}
          onVisibleChange={handleClickChange}
        >
          <div
            style={{
              position: "absolute",
              right: "-8px",
              top: "40px",
              cursor: "pointer",
              transform: clicked ? "rotate(12deg)" : "rotate(0deg)",
            }}
          >
            {logsetting}
          </div>
        </Popover>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="dashboard">
          <NavLink to="/dashboard">
            <span className="" style={{ marginRight: "10px" }}>
              {dashboard}
            </span>
            <span className="text-light">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="clients" style={{display:role !== "user" ? "" : "none"}}>
          <NavLink to="/clients">
            <span className="" style={{ marginRight: "10px" }}>
              {billing}
            </span>
            <span className="text-light">Clients</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="invoices">
          <NavLink to="/invoices">
            <span className="" style={{ marginRight: "10px" }}>
              {tables}
            </span>
            <span className="text-light">Invoices</span>
          </NavLink>
        </Menu.Item>
      </Menu>
      <hr />
      <Menu theme="light" mode="inline" style={{display:role !== "user" ? "" : "none"}}>
        <Menu.Item key="accounting">
          <NavLink to="/accounting">
            <span className="text-light">Accounting</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
