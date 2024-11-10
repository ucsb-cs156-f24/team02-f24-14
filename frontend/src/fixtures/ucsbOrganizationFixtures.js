const ucsbOrganizationFixtures = {
  oneOrg: {
    orgCode: "BAL",
    orgTranslationShort: "Basketball Club",
    orgTranslation: "UCSB Basketball Club",
    inactive: false,
  },
  threeOrgs: [
    {
      orgCode: "BAL",
      orgTranslationShort: "Basketball Club",
      orgTranslation: "UCSB Basketball Club",
      inactive: false,
    },
    {
      orgCode: "SOC",
      orgTranslationShort: "Soccer Club",
      orgTranslation: "UCSB Soccer Club",
      inactive: true,
    },
    {
      orgCode: "CHE",
      orgTranslationShort: "Chess Club",
      orgTranslation: "UCSB Chess Club",
      inactive: false,
    },
  ],
};

export { ucsbOrganizationFixtures };
