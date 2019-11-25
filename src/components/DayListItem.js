import React from "react";

export default function DayListItem(props) {
  return (
    // the onclick below sets the whole returned item as clickable
    <li onClick={() => props.setDay(props.name)}> 
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}
