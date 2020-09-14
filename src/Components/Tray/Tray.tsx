import React from "react";
import { IN, OUT, CONNECTION, CUSTOM, colour } from "../../Types";
import { TrayItemWidget } from "./TrayItemWidget";
import { TrayWidget } from "./TrayWidget";

export default function tray() {
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
    </TrayWidget>
  );
}
