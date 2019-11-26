//import Appointment from "components/Appointment"
// how to call the above in other files

import React from "react";

// import Header from "Header";
// import Empty from "Empty";
// import Show from "Show";

import "components/Appointment/styles.scss";
// import Button from "components/Button";



export default function Appointment(props) {
  return (
  <article className="appointment">
  {/* <Header>{props.time}</Header>
  { props.interview ? <Show /> : <Empty />} */}
  </article>
  );
}
