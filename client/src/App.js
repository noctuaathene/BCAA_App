import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import BudgetList from "./BudgetList";
import UserProvider from "./UserProvider";
import BudgetListProvider from "./BudgetListProvider";
import BudgetProvider from "./BudgetProvider";
import BudgetRoute from "./BudgetRoute";

function App() {
  return (
    <div style={componentStyle()}>
      <UserProvider>
        <BudgetListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<BudgetList />} />
                <Route
                  path="budgetDetail"
                  element={
                    <BudgetProvider>
                      <BudgetRoute />
                    </BudgetProvider>
                  }
                />
                <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
        </BudgetListProvider>
      </UserProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#187bcd",
  };
}

export default App;
