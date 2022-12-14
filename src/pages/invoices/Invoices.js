import {
  CaretDownOutlined,
  CloseOutlined,
  CopyOutlined,
  DollarOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  HddOutlined,
  MailOutlined,
  PlusCircleFilled,
  PlusOutlined,
  PrinterOutlined,
  RestOutlined,
  RightOutlined,
  SearchOutlined,
  SendOutlined,
  UnorderedListOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import {
  Button, 
  Form,
  Menu,
  Popover,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardInvoice from "../../components/CardInvoice/index";
import TableCustom from "../../components/Table";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import { FormAdvanceSearchInvoice } from "../clients/FormAdvanceSearch";
import InvoiceTabs from "./InvoicesTabs";
import TabHome from "../clients/TabHome";
import PaginationFooter from "../../components/layout/PaginationFooter";
import { useQuery } from "react-query";
import axios from "axios";
import { numberWithDot, translateBg } from "../../components/Utils";
import moment from "moment";
import ListCardInvoice from "./ListCardInvoice";

export default function Invoices() {
  const { Title} = Typography;
  const [isAdvance, setIsAdvance] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [clicked, setClicked] = useState(false);

  const [searchField, setSearchField] = useState({
    company_name: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
    total_outstanding: "",
    credit_number: "",
    credit_amount: "",
  });
 

  const [isToggle, setIsToggle] = useState(true);
  const handleClickChange = (open) => {
    setClicked(open);
  };



  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };

  const { data: dataInvoices, status } = useQuery(
    ["invoices-listing", filter],
    async (key) =>
      axios
        .get("invoices", {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );
  const filteredData =
    status === "success" &&
    dataInvoices?.data.filter((item) => {
      return (
        item?.client?.company_name
          .toLowerCase()
          .includes(searchField?.company_name.toLowerCase()) 
      );
    });

    const data =
    status === "success" &&
    filteredData?.map((item) => ({
      key: item.id,
      company_name: item.client.company_name,
      invoice_number:item.code,
      date: item.issued_at ,
      due_date:item.due_date,
      description: item.notes,
      amount:item.total,
      status:item.status
    }));

const defaultFooter = () => (<div tw="text-right text-base">Grand Total: {data && getTotal(data?.map(x=>{
  const splitAmount=x.amount.split(".")
  return parseInt(splitAmount[0])
}))} </div>);

 

  const columns = [
   
    {
      title: "Client / Invoice Number",
      dataIndex: "invoice_number",
      key: "invoice_number",
      render: (text, record) => (
        <div>
          <span>{record.company_name}</span>{" "}
          <p tw="text-xs">
            {record.invoice_number} 
          </p>{" "}
        </div>
      ),
      sorter: (a, b) => a.company_name.length - b.company_name.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.length - b.description.length,
      width:'30%'

    },

    {
      title: "Issued Date / Due Date",
      key: "issued_due_date",
      dataIndex: "issued_due_date",
      render: (text, record) => (
        <div>
          <span>{moment(record.date).format("MM/DD/YYYY")}</span>{" "}
          <p tw="text-xs">
            {`Due ${moment(record.due_date).endOf('month').from(record.date)} `} 
          </p>{" "}
        </div>
      ),
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Amount / Status",
      key: "amount",
      dataIndex: "amount",
      render: (text, record) => (
        <div tw="grid">
             <div
            className="isVisible"
            tw="absolute bottom-16 right-6 flex invisible rounded-full bg-white shadow-sm border border-gray-200  "
          >
            <div tw="hover:bg-gray-100 hover:rounded-l-full ">
              <Tooltip placement="top" title="edit">
                <EditOutlined tw="p-2" onClick={(e)=>{
                  handleAction(e,'edit',record)}} />
              </Tooltip>
            </div>

            <div tw="hover:bg-gray-100  border-l border-r border-gray-200 ">
              <Tooltip placement="top" title="duplicate">
                <CopyOutlined tw="p-2" onClick={(e)=>{
                  handleAction(e,'duplicate',record)}} />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100   border-r border-gray-200 ">
              <Tooltip placement="top" title="add payment">
                <DollarOutlined tw="p-2 "
                onClick={(e)=>{
                  handleAction(e,'payment',record)}}
                />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100  hover:rounded-r-full ">
              <Tooltip placement="top" title="More">
                <EllipsisOutlined tw="text-xs p-2" />
              </Tooltip>
            </div>
          </div>
          <span>Rp{numberWithDot(record.amount)}</span>{" "}
          <span tw="text-xs rounded p-1 ml-auto" style={{background:translateBg(record.status)}}>{record.status} </span>
         
        </div>
      ),
      sorter: (a, b) => a.amount - b.amount,
      align:'right'
    },
  ];
  const handleAction=(e,type,record)=>{
e.stopPropagation()
switch (type) {
  case 'edit':
    history.push(`/invoices/${record.key}/edit`)
    break;
    case 'duplicate':
    history.push(`/invoices/${record.key}/edit`)
    break;
    case 'payment':
    history.push(`/invoices/${record.key}/edit`)
    break;

  default:
    history.push(`/invoices`)

    break;
}
  }
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const bulkList = (
    <div tw="w-36">
      <Menu>
        <Menu.Item key="edit">
          <div>
            <EditOutlined />
            <span>Edit</span>
          </div>
        </Menu.Item>

        <Menu.Item key="duplicate">
          <div>
            <CopyOutlined />
            <span>Duplicate</span>
          </div>
        </Menu.Item>

        <Menu.Item key="print">
          <div>
            <PrinterOutlined />
            <span>Print</span>
          </div>
        </Menu.Item>

        <Menu.Item key="send-email">
          <div>
            <MailOutlined />
            <span>Send By Email</span>
          </div>
        </Menu.Item>
        <Menu.Item key="">
          <div>
            <SendOutlined />
            <span>Mark as Sent</span>
          </div>
        </Menu.Item>
        <Menu.Item key="mark-as-sent">
          <div>
            <DollarOutlined />
            <span>Add a Payment</span>
          </div>
        </Menu.Item>
        <Menu.Item key="download-pdf">
          <div>
            <VerticalAlignBottomOutlined />
            <span>Download PDF</span>
          </div>
        </Menu.Item>
        <Menu.Item key="archive">
          <div>
            <HddOutlined />
            <span>Archive</span>
          </div>
        </Menu.Item>
        <Menu.Item key="delete">
          <div>
            <RestOutlined />
            <span>Delete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <>
      <div className="layout-content">
        <div tw="max-w-screen-lg">
          <TabHome />
          {isToggle?<div tw="hidden md:block mt-20">

             <div tw=" flex justify-between"  onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
            <Title level={4}>Recently Active</Title>
            <span tw=" font-bold text-lg cursor-pointer" onClick={()=>setIsToggle(false)} style={{ visibility: isHover ? 'visible' : 'hidden',}}>Remove <CloseOutlined tw="ml-1" /></span>
          </div>
            <div tw="flex" style={{opacity:isHover?'0.5':'1'}}>
          {dataInvoices?.data.length < 4 && (
              <div
                onClick={() => history.push("/invoices/new")}
                tw="cursor-pointer border border-gray-200 hover:bg-blue-50 border-dashed flex w-44 rounded-md  mr-5 justify-center items-center"
              >
                <div tw="flex flex-col">
                  <PlusOutlined tw="text-xl text-green-400" />
                  <span tw="text-base  font-bold">New Invoice</span>
                </div>
              </div>
              )}
              <ListCardInvoice invoiceProps={[dataInvoices,status]}/>
   
            </div>
          </div>:
          <div tw=" hidden opacity-0 hover:opacity-100  md:block relative mt-20">
          <div tw="inline-block">
          <Tooltip placement="top" title="Show recent cards">
            <PlusCircleFilled tw="text-2xl z-30 text-gray-400"  onClick={()=>setIsToggle(true)} />
            </Tooltip>
            <hr tw="bg-gray-400 absolute top-1 z-0 left-5 w-full translate-y-2/4	 "/>
          </div> 
         </div>
         
        }
          <div tw="md:mt-20">
            <InvoiceTabs />
            <div tw="grid md:flex justify-between mb-6">
            <div tw="flex items-center">
                {hasSelected ? (
                  <>
                    <span
                      onClick={() => setSelectedRowKeys([])}
                      tw="text-xl font-bold text-primary cursor-pointer"
                    >
                      Invoices
                    </span>

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
                ) : (
                  <>
                  <span tw="text-xl font-bold text-black">All Invoices</span>
                  <PlusOutlined
                  onClick={()=>history.push('/invoices/new')}
                  tw="ml-2 text-white bg-success text-xl flex items-center rounded-md font-bold py-1.5 px-2 cursor-pointer "
                  />
                  </>
                )}
              </div>
              <div tw="flex relative cursor-pointer">
                <InputAdvanceSearch prefix={<SearchOutlined />} />
                <div
                  onClick={() => setIsAdvance(!isAdvance)}
                  tw="inline-flex rounded-r-full border border-gray-300 justify-center items-center px-1"
                >
                  <UnorderedListOutlined />
                  <span tw="text-xs ml-2">Advanced Search </span>
                  <CaretDownOutlined tw="ml-1" />
                </div>
              </div>
            </div>
            {isAdvance ? (
              <div tw="bg-gray-100 border-y-2 border-gray-400 p-3 mb-4">
                <FormAdvanceSearchInvoice
                  form={form}
                  setIsAdvance={setIsAdvance}
                />
              </div>
            ) : (
              <></>
            )}
            <div className="table-responsive">
            <TableCustom
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      history.push(`/invoices/${record.key}/invoice-detail`);
                    },
                  };
                }}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={false}
                footer={defaultFooter}
                className="ant-border-space"
              />
            </div>
            <div tw="flex justify-between my-5">
              <div>
                <span tw="text-sm text-black font-bold">
                  1-{data.length} of {data.length}{" "}
                </span>
              </div>
              <div tw="flex flex-col items-center">
                <button
                  onClick={() => history.push("/invoices/archived")}
                  tw="cursor-pointer border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-400 "
                >
                  View Archived Invoice
                </button>
                <p tw="text-xs text-gray-500">
                  or{" "}
                  <Link tw="underline text-gray-500" to="/invoices/deleted">
                    deleted
                  </Link>
                </p>
              </div>
              <div>
                <span tw="text-gray-500">Items per page: </span>
                <PaginationFooter filterProps={[filter,setFilter]}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export function getTotal(outstanding) {
  const sum = outstanding.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return `Rp. ${numberWithDot(sum)} IDR`
}
