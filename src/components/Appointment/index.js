//import Appointment from "components/Appointment"
// how to call the above in other files

import React from "react";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

import "components/Appointment/styles.scss";
// import Button from "components/Button";



export default function Appointment(props) {
  return (
  <article className="appointment">
    <Header time = {props.time}/>
    { props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />}
  </article>
  );
}
