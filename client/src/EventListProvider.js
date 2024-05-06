import { useEffect, useState } from "react";
import { BudgetListContext } from "./BudgetListContext.js";

function BudgetListProvider({ children }) {
  const [budgetLoadObject, setBudgetLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setBudgetLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/budget/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setBudgetLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setBudgetLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    setBudgetLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/budget/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setBudgetLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setBudgetLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setBudgetLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/budget/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setBudgetLoadObject((current) => {
        const budgetIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[budgetIndex] = responseJson;
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setBudgetLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(dtoIn) {
    setBudgetLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/budget/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setBudgetLoadObject((current) => {
        const budgetIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data.splice(budgetIndex, 1);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setBudgetLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleAttendance(dtoIn) {
    setBudgetLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/attendance/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      await handleLoad();
    } else {
      setBudgetLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: budgetLoadObject.state,
    budgetList: budgetLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete, handleAttendance },
  };

  return (
    <BudgetListContext.Provider value={value}>
      {children}
    </BudgetListContext.Provider>
  );
}

export default BudgetListProvider;
