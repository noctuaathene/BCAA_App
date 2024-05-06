import { useContext } from "react";
import { BudgetContext } from "./BudgetContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import BudgetDateTimeBadge from "./BudgetDateTimeBadge";
import BudgetDetail from "./BudgetDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil } from "@mdi/js";

function BudgetRoute({ setShowBudgetForm }) {
  const navigate = useNavigate();
  const { budget } = useContext(BudgetContext);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {budget ? (
        <>
          <BudgetDateTimeBadge budget={budget} />
          <BudgetDetail budget={budget} />
          <div
            style={{
              display: "grid",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/budgetDetail?id=" + budget.id)}
              size={"sm"}
            >
              <Icon path={mdiEyeOutline} size={0.7} />
            </Button>
            <Button onClick={() => setShowBudgetForm(budget)} size={"sm"}>
              <Icon path={mdiPencil} size={0.7} />
            </Button>
          </div>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "max-content auto 32px",
    columnGap: "8px",
    maxWidth: "640px",
  };
}

export default BudgetRoute;
