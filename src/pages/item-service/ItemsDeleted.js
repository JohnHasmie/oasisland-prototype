import {  Menu, notification, Popover, Table } from "antd";
import React, { useEffect, useState,useContext } from "react";
import { Button } from "antd";

import {
  DownOutlined,
 
  RightOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import tw from "twin.macro";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { numberWithDot } from "../../components/Utils";
import {  useHistory } from "react-router-dom";

import { ModalConfirm } from "../../components/ModalConfirm.style";
import AppContext from "../../components/context/AppContext";


export default function ItemsDeleted() {
  const history = useHistory();

  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    show:"deleted"
  });
  const queryClient = useQueryClient();
  const { user } = useContext(AppContext);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isType, setIsType] = useState("");
  const [isItemId, setIsItemId] = useState("");


  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleModal = (type) => {
    if (type === "undelete") {
      setIsType("undelete");
    } else {
      setIsType("delete");
    }
    showModal();
    hide();
  };

  const onSelectChange = (newSelectedRowKeys, x, y) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleClickChange = (open) => {
    setClicked(open);
  };

 
  const hide = () => {
    setClicked(false);
  };
  const hasSelected = selectedRowKeys.length > 0;
  const bulkList = (
    <div tw="border border-[#7f8c9f]">
      <Menu>
        <Menu.Item>
          <div onClick={() => handleModal("undelete")}>
            <UndoOutlined />
            <span>Undelete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );
  const handleOk = () => {
    if (selectedRowKeys.length === 0 ) {
      mutationUndelete.mutate(isItemId);
    } else {
      mutationUndeleteBatch.mutate({ids: selectedRowKeys});
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { data: dataItems, status } = useQuery(
    ["items-deleted", filter],
    async (key) =>
      axios
        .get("items", {
          params: key.queryKey[1],
        })
        .then((res) => res.data)
  );

  // function for get items deleted, waiting data from backend
  const data =
    status === "success" &&
    dataItems?.data?.data?.map((item, i) => ({
        key: item.id,
        i: i,
        name: item.name,
        desc: item.description,
        current: item.current_stock,
        rate: numberWithDot(item.rate),
        client_id:item.client_id
      }));

  // function for undelete, waiting from backend
  const mutationUndelete = useMutation(
    async (data) => {
      return axios.post(`items/restore/${data}`).then((res) => res.data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries("items-deleted");
        }, 500);
        setSelectedRowKeys([]);
        notification.success({
          message: `The selected item has been undelete`,
          placement: "topLeft",
        });
      },
      onError: () => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
      },
    }
  );
  const mutationUndeleteBatch = useMutation(
    async (data) => {
      return axios.post(`items/batch-restore`, data).then((res) => res.data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries("items-deleted");
        }, 500);
        setSelectedRowKeys([]);
        notification.success({
          message: `The selected items has been undelete`,
          placement: "topLeft",
        });
      },
      onError: () => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
      },
    }
  );

  const mutation = useMutation(
    async (data) => {
      return axios.delete(`items/1/${data}`).then((res) => res.data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries("items-by-client");
        }, 500);
        setSelectedRowKeys([]);
        notification.success({
          message: `The selected items has been deleted`,
          placement: "topLeft",
        });
      },
      onError: () => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
      },
    }
  );

  const columns = [
    {
      title: "Name/Description",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <span>{record.name}</span> <p>{record.desc}</p>{" "}
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    // {
    //   title: "Current Stock",
    //   dataIndex: "current",
    //   key: "current",

    //   sorter: (a, b) => a.current - b.current,
    // },

    {
      title: "Rate",
      key: "rate",
      dataIndex: "rate",
      render: (text, record) => (
        <div>
         {filter.currency === "USD" ? "$" : "£"} {numberWithDot(record.rate)}
        </div>
      ),
      sorter: (a, b) => a.rate.length - b.rate.length,
    },
  ];
  
  useEffect(() => {
    if (user) {
      setFilter({ ...filter, currency: user?.data?.base_currency });
    }
  }, [user]);
  return (
    <>
      <div tw="w-full md:w-[98%]">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div tw="flex items-center">
            <span
              tw="text-xl cursor-pointer font-bold text-primary"
              onClick={() => history.push("/items")}
            >
              Items
            </span>
            <RightOutlined tw=" ml-2" />
            <span tw="text-xl font-bold text-black ml-2">Deleted</span>
            {hasSelected && (
              <>
                <RightOutlined tw=" ml-2" />
                <span tw="text-xl font-bold text-black ml-2">Selected</span>
                <span tw="align-middle bg-gray-300 text-black rounded-full px-2  mx-2">
                  {selectedRowKeys.length}
                </span>
                <Popover
                  placement="bottom"
                  content={bulkList}
                  trigger="click"
                  visible={clicked}
                  onVisibleChange={handleClickChange}
                >
                  <div className="flex items-center justify-center">
                    <Button>
                      <span tw="mr-2">Bulk Actions</span>
                      <DownOutlined />
                    </Button>
                  </div>
                </Popover>
              </>
            )}
          </div>
        </div>
        <ModalConfirm
          title="Confirm"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={500}
          closable={false}
        >
          <span tw="text-lg">
            {isType === "delete"
              ? "This is deleted and can't be viewed or edited. Would you like to undelete it?"
              : `Are you sure you want to undelete ${selectedRowKeys.length === 0 ? 'this' : selectedRowKeys.length} items?`}
          </span>
        </ModalConfirm>
        <div className="table-responsive">
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setIsType("undelete");
                  setIsItemId(record.key)
                  showModal();
                  hide();
                },
              };
            }}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={false}
            className="ant-border-space"
          />
        </div>
        <div tw="flex justify-between mt-5">
          <div>
            <span tw="text-sm text-black font-bold">
              1-{data.length} of {data.length}{" "}
            </span>
          </div>

          {/* <div>
            <PaginationFooter />
          </div> */}
        </div>
      </div>
    </>
  );
}
