import React from "react";
import "./App.css";
import GamePage from "./pages/GamePage/GamePage";
import { Type } from "./data/game";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: `/`,
      element: <HomePage />,
    },
    {
      path: `/${Type.Writer}`,
      element: <GamePage type={Type.Writer} />,
    },
    // {
    //   path: `/${Type.Art}`,
    //   element: <GamePage type={Type.Art} />,
    // },
    // {
    //   path: `/${Type.Class}`,
    //   element: <GamePage type={Type.Class} />,
    // },
    {
      path: `/${Type.Music}`,
      element: <GamePage type={Type.Music} />,
    },
    {
      path: `/${Type.Politics}`,
      element: <GamePage type={Type.Politics} />,
    },
    {
      path: `/${Type.WhiteTerror}`,
      element: <GamePage type={Type.WhiteTerror} />,
    },
    {
      path: `/${Type.CPBL}`,
      element: <GamePage type={Type.CPBL} />,
    },
  ]);
  return (
    <RouterProvider router={router} />
    // <div className="App">
    //   <Header />
    //   <div className="title">
    //     <h3>請選擇要挑戰的主題</h3>
    //   </div>
    //   <div className="main">
    //     {topic.map((topic) => {
    //       return <Button title={topic.title} />;
    //     })}
    //   </div>
    // </div>
  );
}

export default App;
