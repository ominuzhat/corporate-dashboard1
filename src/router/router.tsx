import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "../layout/page/DashboardLayout";
import ErrorPage from "../common/ErrorPage/ErrorPage";
import Login from "../modules/Auth/page/Login";
import Dashboard from "../modules/Dashboard/page/Dashboard";
import Profile from "../modules/Profile/page/Profile";
import Accounts from "../modules/Accounts/pages/Accounts";
import SendOTP from "../modules/Auth/components/SendOTP";
import MatchOTP from "../modules/Auth/components/MatchOTP";
import ForgotPassword from "../modules/Auth/components/ForgotPassword";
import CategoryPage from "../modules/Configuration/Category/pages/CategoryPage";
import OfficeInfoPage from "../modules/officeInfo/pages/OfficeInfoPage";
import PrivateRouter from "./PrivateRouter";
import WebServicePage from "../modules/Configuration/WebService/pages/WebServicePage";
import KmsPage from "../modules/Configuration/KeyManagement/pages/KmsPage";
import CategoryView from "../modules/Configuration/Category/pages/CategoryView";
import WebServiceView from "../modules/Configuration/WebService/pages/WebServiceView";
import KmsView from "../modules/Configuration/KeyManagement/pages/KmsView";
import OfficeInfoView from "../modules/officeInfo/pages/OfficeInfoView";
import BlogPage from "../modules/Blog/pages/BlogPage";
import BlogView from "../modules/Blog/pages/BlogView";
import SectionPage from "../modules/GenericSection/Section/pages/SectionPage";
import SectionView from "../modules/GenericSection/Section/pages/SectionView";
import SectionItemView from "../modules/GenericSection/SectionItem/pages/SectionItemView";
import SectionItemPage from "../modules/GenericSection/SectionItem/pages/SectionItemPage";
import OurServicePage from "../modules/OurService/pages/OurServicePage";
import OurServiceView from "../modules/OurService/pages/OurServiceView";
import UserView from "../modules/UserManagement/User/pages/UserView";
import UserPage from "../modules/UserManagement/User/pages/UserPage";
import RoleView from "../modules/UserManagement/Role/pages/RoleView";
import RolePage from "../modules/UserManagement/Role/pages/RolePage";
import { constant } from "../common/constant/Constant";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>{(role) => <DashboardLayout role={role} />}</PrivateRouter>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/officeInfo",
        element: <Accounts />,
        children: [
          {
            path: "/officeInfo",
            element: <OfficeInfoPage />,
          },
          {
            path: ":officeInfoId",
            element: <OfficeInfoView />,
          },
        ],
      },
      {
        path: "/our-service",
        element: <Accounts />,
        children: [
          {
            path: "/our-service",
            element: <OurServicePage />,
          },
          {
            path: ":ourServiceId",
            element: <OurServiceView />,
          },
        ],
      },
      {
        path: "/blog",
        element: <Accounts />,
        children: [
          {
            path: "/blog",
            element: <BlogPage />,
          },
          {
            path: ":blogId",
            element: <BlogView />,
          },
        ],
      },
      {
        path: "/category",
        element: <Accounts />,
        children: [
          {
            path: "/category",
            element: <CategoryPage />,
          },
          {
            path: ":categoryId",
            element: <CategoryView />,
          },
        ],
      },
      {
        path: "/section",
        element: <Accounts />,
        children: [
          {
            path: "/section",
            element: <SectionPage />,
          },
          {
            path: ":sectionId",
            element: <SectionView />,
          },
        ],
      },
      {
        path: "/section-item",
        element: <Accounts />,
        children: [
          {
            path: "/section-item",
            element: <SectionItemPage />,
          },
          {
            path: ":sectionItemId",
            element: <SectionItemView />,
          },
        ],
      },
      {
        path: "/user",
        element: <Accounts />,
        children: [
          {
            path: "/user",
            element: <UserPage />,
          },
          {
            path: ":userId",
            element: <UserView />,
          },
        ],
      },
      {
        path: "/role",
        element: <Accounts />,
        children: [
          {
            path: "/role",
            element: <RolePage />,
          },
          {
            path: ":roleId",
            element: <RoleView />,
          },
        ],
      },
      {
        path: "/web-service",
        element: <Accounts />,
        children: [
          {
            path: "/web-service",
            element: <WebServicePage />,
          },
          {
            path: ":webServiceId",
            element: <WebServiceView />,
          },
        ],
      },

      {
        path: "/key-management",
        element: (
          <PrivateRouter>
            {(role) =>
              role === constant.ROLE ? (
                <Accounts />
              ) : (
                <Navigate to="/" replace />
              )
            }
          </PrivateRouter>
        ),
        children: [
          {
            path: "/key-management",
            element: (
              <PrivateRouter>
                {(role) =>
                  role === constant.ROLE ? (
                    <KmsPage />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              </PrivateRouter>
            ),
          },
          {
            path: ":kmsId",
            element: (
              <PrivateRouter>
                {(role) =>
                  role === constant.ROLE ? (
                    <KmsView />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              </PrivateRouter>
            ),
          },
        ],
      },

      // {
      //   path: "/key-management",
      //   element: <Accounts />,
      //   children: [
      //     {
      //       path: "/key-management",
      //       element: <KmsPage />,
      //     },
      //     {
      //       path: ":kmsId",
      //       element: <KmsView />,
      //     },
      //   ],
      // },

      // {
      //   path: "/user/view",
      //   element: <UserPage />,
      // },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/send-otp",
    element: <SendOTP />,
  },
  {
    path: "/match-otp",
    element: <MatchOTP />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

export default router;
