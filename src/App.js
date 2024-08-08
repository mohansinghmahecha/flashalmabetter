import "./App.css";
import CreateFlashcard from "./components/create-flash/CreateFlashcard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyFlash from "./components/my-flash/MyFlash";
import Default from "./components/default/Default";
import FullDetailsPage from "./components/full-detailPage/FullDetailsPage";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/redux/store"; //  store file
import { Provider, useSelector } from "react-redux";
import MenuBatr from "./components/Menu/MenuBar";

function App() {
  const isLoggedIn = useSelector((state) => state);
  console.log("from App.js", isLoggedIn);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div
          className="h-screen overflow-hidden"
          style={{ backgroundColor: "#F8F4EF", width: "100%" }}
        >
          <BrowserRouter>
            {/* menubar is  here */}
            <MenuBatr />

            {/* two component routing  1.CreateFlashcard(default) and 2.Mycard(view the card)  */}
            <Default />

            {/* multple routes */}
            <Routes>
              <Route path="/" element={<CreateFlashcard />} />
              <Route path="/mycards" element={<MyFlash />} />
              {/* dynamic routing */}
              <Route path="/fullDetailPage/:id" element={<FullDetailsPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
