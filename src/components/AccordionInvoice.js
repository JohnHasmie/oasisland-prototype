import { Button, Collapse, Form, Input, notification } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import axios from "axios";
import React, { useState, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import tw from "twin.macro";
import { AccordionCustomPanel } from "./AccordionCustom.style";
import AppContext from "./context/AppContext";
import { translateBg } from './Utils';

export default function AccordionInvoice() {
  const onChange = (key) => {
    console.log(key);
  };
  const [message, setMessage] = useState("");
  const { globalDetailInvoice } = useContext(AppContext);
  const onFinish=(values)=>{
    console.log("cek atas",message);
    mutation.mutate({invoice_id:globalDetailInvoice?.id,
    body:message
    })
  }
  const queryClient = useQueryClient();
  const { data: dataComment, status: statusComment } = useQuery(
    "comment-listing",
    () => axios.get(`invoices/${globalDetailInvoice?.id}/comments?limit=11`).then((res) => res.data?.data)
  );
  const mutation = useMutation(
    async (data) => {
      return axios.post("invoices/comments", data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("comment-listing");
        notification.success({
          message: `Comment has been added`,
          placement: "topLeft",
        });
      },
      onError: (err) => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
        console.log(err.response.data.message);
      },
    }
  );
  return (
    <Collapse tw="md:ml-5 mb-10 " defaultActiveKey={[]} onChange={onChange}>
         {globalDetailInvoice === "" && (
        <div role="status" tw="flex flex-col w-full items-center justify-center">
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
  { globalDetailInvoice &&  <AccordionCustomPanel bg={translateBg(globalDetailInvoice?.status)} header={globalDetailInvoice?.status } key="status">
        <Form
        onFinish={onFinish}
        >
          <ul style={{ paddingInlineStart: "30px" }}>
          {statusComment === "loading" && (
                    <div
                      role="status"
                      tw="flex flex-col w-full h-full items-center justify-center"
                    >
                      <svg
                        tw="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
           {statusComment === "success" && dataComment?.data?.map((item,i)=>(<li key={i}>{item.body}</li>))}
          </ul>
          <Form.Item tw="flex" name="message">
            <span tw="rounded-full p-2 border border-green-200 text-lg font-bold">
              SJ
            </span>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${
                message ? "accordion-message-active " : "accordion-message"
              }`}
              placeholder="Send a message"
            />
            {message ? (
              <Button htmlType="submit" tw="bg-success text-white text-lg ">Send</Button>
            ) : (
              <></>
            )}
          </Form.Item>
        </Form>
      </AccordionCustomPanel>}
    </Collapse>
  );
}

