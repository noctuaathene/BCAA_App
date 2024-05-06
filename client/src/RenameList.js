import { useContext, useState } from "react";
import { BudgetListContext } from "./BudgetListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import BudgetCard from "./BudgetCard";
import BudgetForm from "./BudgetForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlusBoxOutline, mdiPlusBoxMultipleOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function BudgetList() {
  const { budgetList } = useContext(BudgetListContext);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  const filteredBudgetList = budgetList.filter(
    (budget) => new Date(budget.date) > new Date()
  );

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button variant="success" onClick={() => setShowBudgetForm({})}>
          <Icon path={mdiPlusBoxOutline} size={1} color={"white"} /> Nová
          událost
        </Button>
        <Button variant="success" disabled>
          <Icon path={mdiPlusBoxMultipleOutline} size={1} color={"white"} />{" "}
          Nové události
        </Button>
      </div>
      {!!showBudgetForm ? (
        <BudgetForm budget={showBudgetForm} setShowBudgetForm={setShowBudgetForm} />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          budget={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {filteredBudgetList.map((budget) => {
        return (
          <BudgetCard
            key={budget.id}
            budget={budget}
            setShowBudgetForm={setShowBudgetForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
    </Container>
  );
}

export default BudgetList;
