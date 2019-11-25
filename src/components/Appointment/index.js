//import Appointment from "components/Appointment"
// how to call the above in other files

import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "components/Appointment/styles.scss";
// import Button from "components/Button";



export default function Appointment(props) {
  return <article className="appointment"></article>
}
