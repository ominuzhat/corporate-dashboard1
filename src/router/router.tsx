import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../common/ErrorPage/ErrorPage";
import DashboardLayout from "../layout/page/DashboardLayout";
import Accounts from "../modules/Accounts/pages/Accounts";
import ForgotPassword from "../modules/Auth/components/ForgotPassword";
import MatchOTP from "../modules/Auth/components/MatchOTP";
import SendOTP from "../modules/Auth/components/SendOTP";
import Login from "../modules/Auth/page/Login";
import BlogPage from "../modules/Blog/pages/BlogPage";
import BlogView from "../modules/Blog/pages/BlogView";
import CategoryPage from "../modules/Configuration/Category/pages/CategoryPage";
import CategoryView from "../modules/Configuration/Category/pages/CategoryView";
import ProductCategoryPage from "../modules/Configuration/ProductCategory/pages/ProductCategoryPage";
import ProductCategoryView from "../modules/Configuration/ProductCategory/pages/ProductCategoryView";
import TagPage from "../modules/Configuration/Tag/pages/TagPage";
import TagView from "../modules/Configuration/Tag/pages/TagView";
import Dashboard from "../modules/Dashboard/page/Dashboard";
import SectionPage from "../modules/GenericSection/Section/pages/SectionPage";
import SectionView from "../modules/GenericSection/Section/pages/SectionView";
import SectionItemPage from "../modules/GenericSection/SectionItem/pages/SectionItemPage";
import SectionItemView from "../modules/GenericSection/SectionItem/pages/SectionItemView";
import OfficeInfoPage from "../modules/officeInfo/pages/OfficeInfoPage";
import OfficeInfoView from "../modules/officeInfo/pages/OfficeInfoView";
import OurServicePage from "../modules/OurService/pages/OurServicePage";
import OurServiceView from "../modules/OurService/pages/OurServiceView";
import ProductPage from "../modules/Product/pages/ProductPage";
import ProductView from "../modules/Product/pages/ProductView";
import Profile from "../modules/Profile/page/Profile";
import RolePage from "../modules/UserManagement/Role/pages/RolePage";
import RoleView from "../modules/UserManagement/Role/pages/RoleView";
import UserPage from "../modules/UserManagement/User/pages/UserPage";
import UserView from "../modules/UserManagement/User/pages/UserView";
import PrivateRouter from "./PrivateRouter";

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
        path: "/product",
        element: <Accounts />,
        children: [
          {
            path: "/product",
            element: <ProductPage />,
          },
          {
            path: ":productId",
            element: <ProductView />,
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
        path: "/tag",
        element: <Accounts />,
        children: [
          {
            path: "/tag",
            element: <TagPage />,
          },
          {
            path: ":categoryId",
            element: <TagView />,
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
        path: "/product-category",
        element: <Accounts />,
        children: [
          {
            path: "/product-category",
            element: <ProductCategoryPage />,
          },
          {
            path: ":productCategoryId",
            element: <ProductCategoryView />,
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
