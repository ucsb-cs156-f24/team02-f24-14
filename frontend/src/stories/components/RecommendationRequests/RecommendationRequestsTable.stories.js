import React from "react";
import RecommendationRequestsTable from "main/components/RecommendationRequest/RecommendationRequestsTable";
import { recommendationRequestsFixtures } from "fixtures/recommendationRequestsFixtures";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import { http, HttpResponse } from "msw";

export default {
  title: "components/RecommendationRequests/RecommendationRequestsTable",
  component: RecommendationRequestsTable,
};

const Template = (args) => {
  return <RecommendationRequestsTable {...args} />;
};

export const Empty = Template.bind({});

Empty.args = {
  requests: [],
};

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.args = {
  requests: recommendationRequestsFixtures.threeRecommendationRequests,
  currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsAdminUser = Template.bind({});
ThreeItemsAdminUser.args = {
  requests: recommendationRequestsFixtures.threeRecommendationRequests,
  currentUser: currentUserFixtures.adminUser,
};

ThreeItemsAdminUser.parameters = {
  msw: [
    http.delete("/api/recommendationrequests", () => {
      return HttpResponse.json({}, { status: 200 });
    }),
  ],
};
