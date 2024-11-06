import React from "react";
import helpRequestForm from "main/components/HelpRequest/HelpRequestForm";
import { helpRequestsFixtures } from "fixtures/helpRequestsFixtures";

export default {
  title: "components/helpRequest/HelpRequest",
  component: helpRequestForm,
};

const Template = (args) => {
  return <helpRequestForm {...args} />;
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
  initialContents: helpRequestsFixtures.oneRequest,
  buttonLabel: "Update",
  submitAction: (data) => {
    console.log("Submit was clicked with data: ", data);
    window.alert("Submit was clicked with data: " + JSON.stringify(data));
  },
};
