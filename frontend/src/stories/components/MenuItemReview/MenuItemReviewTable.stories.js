import React from "react";
import MenuItemReviewsTable from "main/components/MenuItemReview/MenuItemReviewTable";
import { menuItemReviewsFixtures } from "fixtures/MenuItemReviewsFixtures";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import { http, HttpResponse } from "msw";

export default {
  title: "components/MenuItemReview/MenuItemReviewsTable",
  component: MenuItemReviewsTable,
};

const Template = (args) => {
  return <MenuItemReviewsTable {...args} />;
};

export const Empty = Template.bind({});

Empty.args = {
  reviews: [],
};

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.args = {
  reviews: menuItemReviewsFixtures.threeReviews,
  currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsAdminUser = Template.bind({});
ThreeItemsAdminUser.args = {
  reviews: menuItemReviewsFixtures.threeReviews,
  currentUser: currentUserFixtures.adminUser,
};

ThreeItemsAdminUser.parameters = {
  msw: [
    http.delete("/api/menuitemreviews", () => {
      return HttpResponse.json({}, { status: 200 });
    }),
  ],
};
