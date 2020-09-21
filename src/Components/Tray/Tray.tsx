import React from "react";
import { IN, OUT, CONNECTION, CUSTOM, colour, START, END } from "../../Types";
import { TrayItemWidget } from "./TrayItemWidget";
import { TrayWidget } from "./TrayWidget";

export default () => {
  return (
    <TrayWidget>
      <TrayItemWidget model={{ type: IN }} name="In Node" color={colour.in} />
      <TrayItemWidget
        model={{ type: OUT }}
        name="Out Node"
        color={colour.out}
      />
      <TrayItemWidget
        model={{ type: CONNECTION }}
        name="Connection Node"
        color={colour.connection}
      />
      <TrayItemWidget
        model={{ type: CUSTOM }}
        name="Custom Node"
        color={colour.custom}
      />
      <TrayItemWidget
        model={{ type: START }}
        name="Start Node"
        color={colour.start}
      />
      <TrayItemWidget
        model={{ type: END }}
        name="End Node"
        color={colour.end}
      />
    </TrayWidget>
  );
};
