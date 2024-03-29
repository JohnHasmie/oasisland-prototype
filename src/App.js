import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import GlobalSetting from "./pages/setting/GlobalSetting";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Business from "./pages/setting/Business";
import EmailNotification from "./pages/setting/EmailNotification";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import useAuth, { unsetClientCredential } from "./hooks/useAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Items from "./pages/item-service/Items";
// import Service from "./pages/item-service/Service";
import Clients from "./pages/clients/Clients";
import Detail from "./pages/clients/Detail";
import DetailReports from "./pages/clients/DetailReports";
import AccountAging from "./pages/report/AccountAging";
import RecurringRevenue from "./pages/report/RecurringRevenue";
import RevenueByClient from "./pages/report/RevenueByClient";
import PaymentsCollected from "./pages/report/PaymentsCollected";
import AccountStatement from "./pages/report/AccountStatement";
import InvoiceDetail from "./pages/report/InvoiceDetail";
import Invoices from "./pages/invoices/Invoices";
import DetailInvoice from "./pages/invoices/Detail";
import AppContext from "./components/context/AppContext";
import ItemsArchived from "./pages/item-service/ItemsArchived";
import ItemsDeleted from "./pages/item-service/ItemsDeleted";
import Email from "./pages/clients/Email";
import DetailInvoiceClient from "./pages/clients/DetailInvoice";
import DetailRecurring from "./pages/clients/DetailRecurring";
import RecurringInvoice from "./pages/invoices/Recurring";
import AccountBalance from "./pages/report/AccountBalance";
import AccountTrialBalance from "./pages/report/AccountTrialBalance";
import ClientsDraft from "./pages/clients/ClientsDraft";
import ClientsOverdue from "./pages/clients/ClientsOverdue";
import ClientsOutstanding from "./pages/clients/ClientsOutstanding";
import OutstandingBalance from "./pages/invoices/OutstandingBalance";
import ClientsArchived from "./pages/clients/ClientsArchived";
import ClientsDeleted from "./pages/clients/ClientsDeleted";
import EmailDeleted from "./pages/clients/EmailDeleted";
import InvoicesOverdue from './pages/invoices/InvoicesOverdue';
import InvoicesDraft from './pages/invoices/InvoicesDraft';
import InvoicesOutstanding from "./pages/invoices/InvoicesOutstanding";
import Accounting from "./pages/accounting/Accounting";
import InvoicesArchived from "./pages/invoices/InvoicesArchived";
import InvoicesDeleted from "./pages/invoices/InvoicesDeleted";
import RecurringArchived from "./pages/invoices/RecurringArchived";
import RecurringDeleted from "./pages/invoices/RecurringDeleted";
import FormClient from "./pages/clients/FormClient";
import FormRecurringTemplate from "./pages/invoices/FormRecurringTemplate";
import FormInvoice from "./pages/invoices/FormInvoice";
import AccountAgingPrint from "./pages/report/AccountAgingPrint";
import AccountBalancePrint from "./pages/report/AccountBalancePrint";
import InvoicePrint from "./pages/invoices/InvoicePrint";
import withAdminRedirect from "./components/WithAdminRedirect";

const queryClient = new QueryClient();

function App() {
  let { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const { token,role } = useAuth();
  const [user, setUser] = useState("");
  const [setting, setSetting] = useState("");
  const [globalDetailClient, setGlobalDetailClient] = useState("");
  const [globalDetailInvoice, setGlobalDetailInvoice] = useState("");
  const [globalOutstanding, setGlobalOutstanding] = useState("");
  
const refInvoice=useRef(null)
  let history = useHistory();

  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
    Accept: "Application/json",
  };
  useEffect(() => {
    if (isAuthenticated === false && !pathname.includes("sign")) {
      history.push("/sign-in");
    }
    if (isAuthenticated === true && pathname.includes("sign")) {
      history.push("/dashboard");
    }
    if (pathname === "/") {
      history.push("/dashboard");
    }
  }, [pathname, isAuthenticated]);

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 403) {
        unsetClientCredential();
        window.location.href = "/sign-in";
      }
      if (error.response.status === 401) {
        unsetClientCredential();
        window.location.href = "/sign-in";
      }

      return Promise.reject(error);
    }
  );
  console.log("user",role)
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider
          value={{
            refInvoice:refInvoice,
            user: user,
            setting:setting,
            globalDetailClient:globalDetailClient,
            setSetting:setSetting,
            setUser: setUser,
            setGlobalDetailClient:setGlobalDetailClient,
            globalDetailInvoice:globalDetailInvoice,
            setGlobalDetailInvoice:setGlobalDetailInvoice,
            globalOutstanding:globalOutstanding,
            setGlobalOutstanding:setGlobalOutstanding
          }}
        >
          <Switch>
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            {/* <Route path="/excel" component={ExportExcel} /> */}


            <Route
              exact
              path="/dashboard/reports/account-aging"
              component={withAdminRedirect(AccountAging)}
            />
             <Route
              exact
              path="/dashboard/reports/account-aging/print"
              component={withAdminRedirect(AccountAgingPrint)}
            />
            <Route
              exact
              path="/dashboard/reports/recurring-revenue"
              component={withAdminRedirect(RecurringRevenue)}
            />
            <Route
              exact
              path="/dashboard/reports/revenue-by-client"
              component={withAdminRedirect(RevenueByClient)}
            />
            <Route
              exact
              path="/dashboard/reports/payments-collected"
              component={withAdminRedirect(PaymentsCollected)}
            />
            <Route
              exact
              path="/dashboard/reports/account-statement"
              component={withAdminRedirect(AccountStatement)}
            />
            <Route
              exact
              path="/dashboard/reports/invoice-detail"
              component={withAdminRedirect(InvoiceDetail)}
            />
            <Route
              exact
              path="/dashboard/reports/balance"
              component={withAdminRedirect(AccountBalance)}
            />
               <Route
              exact
              path="/dashboard/reports/balance/print"
              component={withAdminRedirect(AccountBalancePrint)}
            />
            <Route
              exact
              path="/dashboard/reports/trial-balance"
              component={withAdminRedirect(AccountTrialBalance)}
            />
            <Route exact path="/invoices/new" component={FormInvoice} />
            {/* <Route exact path="/invoices/new-recurring-template" component={FormInvoice} /> */}

            <Route
                exact
                path="/invoices/:invoiceId/edit"
                component={FormInvoice}
              />
            <Route exact path="/clients/new" component={FormClient} />
            <Route
                exact
                path="/clients/:clientId/edit"
                component={FormClient}
              />
            <Route exact path="/recurring-template/new" component={FormInvoice} />
            <Route exact path="/recurring-template/:invoiceId/edit" component={FormInvoice} />
            <Route exact path="/invoices/:invoiceId/print" component={InvoicePrint} />
        

            <Main>
              <Route exact path="/dashboard" component={Home} />

              <Route exact path="/clients" component={withAdminRedirect(Clients)} />
              <Route exact path="/clients/archived" component={withAdminRedirect(ClientsArchived)} />
              <Route exact path="/clients/deleted" component={withAdminRedirect(ClientsDeleted)} />
              <Route exact path="/clients/draft" component={withAdminRedirect(ClientsDraft)} />
              <Route exact path="/clients/overdue" component={withAdminRedirect(ClientsOverdue)} />
              <Route
                exact
                path="/clients/outstanding"
                component={ClientsOutstanding}
              />

              <Route exact path="/clients/sent-email" component={Email} />
              <Route exact path="/clients/sent-email/deleted" component={EmailDeleted} />

              <Route
                exact
                path="/clients/:clientId/client-detail/recurring-templates"
                component={DetailRecurring}
              />

              <Route
                exact
                path="/clients/:clientId/client-detail"
                component={Detail}
              />
              <Route
                exact
                path="/clients/:clientId/client-detail/reports"
                component={DetailReports}
              />
              <Route
                exact
                path="/clients/:clientId/client-detail/invoices"
                component={DetailInvoiceClient}
              />
                <Route
                exact
                path="/invoices/:invoiceId/invoice-detail"
                component={DetailInvoice}
              />
                <Route
                exact
                path="/invoices/:invoiceId/invoice-detail/recurring-template"
                component={DetailInvoice}
              />


              <Route exact path="/invoices" component={Invoices} />

              <Route exact path="/invoices/archived" component={InvoicesArchived} />
              <Route exact path="/invoices/deleted" component={InvoicesDeleted} />
              <Route exact path="/invoices/draft" component={InvoicesDraft} />
              <Route exact path="/invoices/overdue" component={InvoicesOverdue} />
              <Route
                exact
                path="/invoices/outstanding"
                component={InvoicesOutstanding}
              />
              <Route
                exact
                path="/invoices/recurring-templates"
                component={RecurringInvoice}
              />
                <Route exact path="/invoices/recurring-templates/archived" component={RecurringArchived} />
              <Route exact path="/invoices/recurring-templates/deleted" component={RecurringDeleted} />

              <Route
                exact
                path="/client/:clientId/invoices/outstanding-balance"
                component={OutstandingBalance}
              />
          
              <Route exact path="/global-settings" component={GlobalSetting} />
              <Route
                exact
                path="/global-settings/business"
                component={withAdminRedirect(Business)}
              />
              <Route
                exact
                path="/global-settings/email-notifications"
                component={EmailNotification}
              />
              <Route exact path="/items" component={Items} />
              <Route exact path="/items/archived" component={ItemsArchived} />
              <Route exact path="/items/deleted" component={ItemsDeleted} />

              <Route exact path="/accounting" component={withAdminRedirect(Accounting)} />


              <Route exact path="/tables" component={Tables} />
              <Route exact path="/billing" component={Billing} />
              <Route exact path="/rtl" component={Rtl} />
              <Route exact path="/profile" component={Profile} />
              {/* <Redirect from="*" to="/dashboard" /> */}
            </Main>
          </Switch>
        </AppContext.Provider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </div>
    
  );
}

export default App;
