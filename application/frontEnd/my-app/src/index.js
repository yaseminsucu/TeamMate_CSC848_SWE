import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import Login from './login'
import Register from './register';
import reportWebVitals from './reportWebVitals';
import Header from './Header'
import ForgotPass from './forgotPass'
import OrganizationDashboard from './organizationDashboard.js';
import Dashboard from './dashboard';
import Footer from './Footer';
import About from './About';
import Services from './Services.js';
import Privacy from './Privacy.js';
import Product from './Product.js';
import Blog from './Blog.js';
import Terms from './Terms.js';
import Contact from './Contact.js';
import Members from './Members.js';
import MembersDetails from './MembersDetails.js';
import Groups from './Groups.js';
import GroupsDetails from './GroupsDetails.js';
import Events from './Events.js';
import EventsDetails from './EventsDetails.js';
import TasksProjects from './TasksProjects.js';
import TasksProjectsDetails from './TasksProjectsDetails.js';
import TasksProjectsDetailsExpand from './TasksProjectsDetailsExpand.js';
import Recognition from './Recognition.js';
import RecognitionDetails from './RecognitionDetails.js';
import Highlights from './Highlights.js';
import Home from './home.js'
import Sidebar from './Sidebar.js';
import Features from './Features.js';
import Careers from './Careers.js';
import Culture from './Culture.js';
import Pricing from './Pricing.js';
import UnderConstruction from './UnderConstruction.js';
import HelpCenter from './HelpCenter.js';
import GettingStarted from './gettingStarted.js';
import CaseStudy from './CaseStudy.js';
import Comment from './Comment.js';
import Update from './Update.js';
import ServerStatus from './ServerStatus.js';
import ReportBug from './ReportBug.js';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const AppContainer = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to ="/home" />,
  },
  {
    path: "/login",
    element: <Login />,
  }
  ,
  {
    path: "/Header",
    element: <Header />,
  }
  ,
  {
    path: "/Footer",
    element: <Footer />,
  }
  ,
  {
    path: "/register",
    element: <Register />,
  }
  ,
  {
    path: "/About",
    element: <About />,
  }
  ,
  {
    path: "/Services",
    element: <Services />,
  }
  ,

  {
    path: "/Terms",
    element: <Terms />,
  }
  ,

  {
    path: "/Privacy",
    element: <Privacy />,
  }
  ,

  {
    path: "/Contact",
    element: <Contact />,
  }
  ,
  {
    path: "/Blog",
    element: <Blog />,
  }
  ,

  {
    path: "/Members",
    element: <Members />,
  }
  ,

  {
    path: "/MembersDetails/:memberID",
    element: <MembersDetails />,
  }
  ,

  {
    path: "/Groups",
    element: <Groups />,
  }
  ,

  {
    path: "/GroupsDetails",
    element: <GroupsDetails />,
  }
  ,

  {
    path: "/Events",
    element: <Events />,
  }
  ,

  {
    path: "/EventsDetails",
    element: <EventsDetails />,
  }
  ,

  {
    path: "/TasksProjects",
    element: <TasksProjects />,
  }
  ,

  {
    path: "/TasksProjectsDetails",
    element: <TasksProjectsDetails />,
  }
  ,

  {
    path: "/TasksProjectsDetailsExpand",
    element: <TasksProjectsDetailsExpand />,
  }
  ,

  {
    path: "/UnderConstruction",
    element: <UnderConstruction />,
  }
  ,

  {
    path: "/Recognition",
    element: <Recognition />,
  }
  ,

  {
    path: "/RecognitionDetails",
    element: <RecognitionDetails />,
  }
  ,

  {
    path: "/Culture",
    element: <Culture />,
  }
  ,

  {
    path: "/Highlights",
    element: <Highlights />,
  }
  ,
  {
    path: "/Pricing",
    element: <Pricing />,
  }
  ,

  {
    path: "/HelpCenter",
    element: <HelpCenter />,
  }
  ,

  {
    path: "/gettingStarted",
    element: <GettingStarted />,
  }
  ,

  {
    path: "/ReportBug",
    element: <ReportBug />,
  }
  ,

  {
    path: "/Product",
    element: <Product />,
  }
  ,
  {
    path: "/forgotPass",
    element: <ForgotPass />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/organizationDashboard/:orgName",
    element: <OrganizationDashboard />,
  }
  ,
  {
    path: "/home",
    element: <Home />,
  }
  ,

  {
    path: "/Careers",
    element: <Careers />,
  }
  ,
  {
    path: "/sidebar",
    element: <Sidebar />,
  }
  ,
  {
    path: "/features",
    element: <Features />,
  }
  ,
  {
    path: "/casestudy",
    element: <CaseStudy />,
  }
  ,
  {
    path: "/comment",
    element: <Comment />,
  }
  ,
  {
    path: "/update",
    element: <Update />,
  }
  ,
  {
    path: "/serverstatus",
    element: <ServerStatus />,
  }
]);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
