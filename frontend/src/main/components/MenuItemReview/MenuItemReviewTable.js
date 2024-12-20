import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";

import { useBackendMutation } from "main/utils/useBackend";
import {
  cellToAxiosParamsDelete,
  onDeleteSuccess,
} from "main/utils/MenuItemReviewUtils";
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function MenuItemReviewsTable({ reviews, currentUser }) {
  const navigate = useNavigate();

  const editCallback = (cell) => {
    navigate(`/menuitemreviews/edit/${cell.row.values.id}`);
  };

  // Stryker disable all : hard to test for query caching

  const deleteMutation = useBackendMutation(
    cellToAxiosParamsDelete,
    { onSuccess: onDeleteSuccess },
    ["/api/menuitemreviews/all"],
  );
  // Stryker restore all

  // Stryker disable next-line all
  const deleteCallback = async (cell) => {
    deleteMutation.mutate(cell);
  };

  const columns = [
    {
      Header: "id",
      accessor: "id", // accessor is the "key" in the data
    },
    {
      Header: "Item Id",
      accessor: "itemId",
    },
    {
      Header: "Reviewer Email",
      accessor: "reviewerEmail",
    },
    {
      Header: "Comments",
      accessor: "comments",
    },
    {
      Header: "Stars",
      accessor: "stars",
    },
    {
      Header: "Date Reviewed",
      accessor: "dateReviewed",
    },
  ];

  if (hasRole(currentUser, "ROLE_ADMIN")) {
    columns.push(
      ButtonColumn("Edit", "primary", editCallback, "MenuItemReviewsTable"),
    );
    columns.push(
      ButtonColumn("Delete", "danger", deleteCallback, "MenuItemReviewsTable"),
    );
  }

  return (
    <OurTable
      data={reviews}
      columns={columns}
      testid={"MenuItemReviewsTable"}
    />
  );
}
