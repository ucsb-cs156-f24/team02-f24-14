const recommendationRequestsFixtures = {
    oneRecommendationRequest: {
        id: 1,
        requesterEmail: "a",
        professorEmail: "b",
        explanation: "c",
        dateRequested: "2022-01-02T12:00:00",
        dateNeeded: "2022-01-02T12:00:00",
        done: true,
    },
    threeRecommendationRequests: [
      {
        id: 1,
        requesterEmail: "a",
        professorEmail: "b",
        explanation: "c",
        dateRequested: "2022-01-02T12:00:00",
        dateNeeded: "2022-01-02T12:00:00",
        done: true,
      },
      {
        id: 2,
        requesterEmail: "d",
        professorEmail: "e",
        explanation: "f",
        dateRequested: "2022-01-02T12:00:00",
        dateNeeded: "2022-01-02T12:00:00",
        done: true,
      },
      {
        id: 3,
        requesterEmail: "h",
        professorEmail: "i",
        explanation: "j",
        dateRequested: "2022-01-02T12:00:00",
        dateNeeded: "2022-01-02T12:00:00",
        done: true,
      },
    ],
  };
  
  export { recommendationRequestsFixtures };
  