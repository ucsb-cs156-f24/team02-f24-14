import React from "react";
import UCSBDiningCommonsMenuItem from "main/components/UCSBDates/UCSBDiningCommonsMenuItem";
import { ucsbDatesFixtures } from "fixtures/ucsbDatesFixtures";

export default {
  title: "components/UCSBDates/UCSBDiningCommonsMenuItem",
  component: UCSBDiningCommonsMenuItem,
};

const Template = (args) => {
  return <UCSBDiningCommonsMenuItem {...args} />;
};

export const Create = Template.bind({});

Create.args = {
  buttonLabel: "Create",
  submitAction: (data) => {
    console.log("Submit was clicked with data: ", data);
    window.alert("Submit was clicked with data: " + JSON.stringify(data));
  },
};

export const Update = Template.bind({});

Update.args = {
  initialContents: ucsbDatesFixtures.oneDate,
  buttonLabel: "Update",
  submitAction: (data) => {
    console.log("Submit was clicked with data: ", data);
    window.alert("Submit was clicked with data: " + JSON.stringify(data));
  },
};
