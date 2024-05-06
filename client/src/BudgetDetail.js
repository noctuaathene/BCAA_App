import WillAttendBadge from "./WillAttendBadge";
import AttendeeDecision from "./AttendeeDecision";

function BudgetDetail({ budget }) {
  let willAttendCount = 0;
  if (budget.userMap) {
    Object.entries(budget.userMap).forEach(([key, value]) => {
      if (value.attendance === "yes") willAttendCount++;
      if (value.guests) willAttendCount += value.guests;
    });
  }

  return (
    <div style={{ display: "grid", rowGap: "4px" }}>
      <div style={{ fontSize: "22px" }}>{budget.name}</div>
      <div className="row" style={{ margin: "0" }}>
        <div className="col-12 col-sm-6" style={{ padding: "0" }}>
          <WillAttendBadge count={willAttendCount} />
        </div>
        <div className="col-12 col-md-6" style={decisionColumnStyle()}>
          <AttendeeDecision budget={budget} />
        </div>
      </div>
    </div>
  );
}

function decisionColumnStyle() {
  return { display: "flex", justifyContent: "right", padding: "0" };
}

export default BudgetDetail;
