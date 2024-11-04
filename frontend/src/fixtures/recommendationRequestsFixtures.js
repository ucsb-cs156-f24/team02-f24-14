const recommendationRequestsFixtures = {
  oneRecommendationRequest: {
    id: 1,
    requesterEmail: "requester@gmail.com",
    professorEmail: "professor@gmail.com",
    explanation: "requester needs a recommendation from professor",
    dateRequested: "2022-01-02T12:00:00",
    dateNeeded: "2022-01-02T12:00:00",
    done: true,
  },
  threeRecommendationRequests: [
    {
      id: 1,
      requesterEmail: "requester@gmail.com",
      professorEmail: "professor@gmail.com",
      explanation: "requester needs a recommendation from professor",
      dateRequested: "2022-01-02T12:00:00",
      dateNeeded: "2022-01-02T12:00:00",
      done: true,
    },
    {
      id: 2,
      requesterEmail: "requester@gmail.com",
      professorEmail: "professor@gmail.com",
      explanation: "requester needs a second recommendation from professor",
      dateRequested: "2022-01-02T12:00:00",
      dateNeeded: "2022-01-02T12:00:00",
      done: true,
    },
    {
      id: 3,
      requesterEmail: "requester@gmail.com",
      professorEmail: "professor@gmail.com",
      explanation: "requester needs a third recommendation from professor",
      dateRequested: "2022-01-02T12:00:00",
      dateNeeded: "2022-01-02T12:00:00",
      done: true,
    },
  ],
};

export { recommendationRequestsFixtures };
