const menuItemReviewsFixtures = {
  oneDate: {
    id: 1,
    itemId: 10,
    reviewerEmail: "r@gmail.com",
    stars: 5,
    dateReviewed: "2022-01-02T12:00:00",
    comments: "Very good food!",
  },
  threeDates: [
    {
      id: 1,
      itemId: 10,
      reviewerEmail: "r@gmail.com",
      stars: 5,
      dateReviewed: "2022-01-02T12:00:00",
      comments: "Very good food!",
    },
    {
      id: 2,
      itemId: 11,
      reviewerEmail: "v@gmail.com",
      stars: 2,
      dateReviewed: "2021-01-02T12:00:00",
      comments: "Very bad food!",
    },
    {
      id: 3,
      itemId: 12,
      reviewerEmail: "k@gmail.com",
      stars: 3,
      dateReviewed: "2020-01-02T12:00:00",
      comments: "Very mediocre food",
    },
  ],
};

export { menuItemReviewsFixtures };
