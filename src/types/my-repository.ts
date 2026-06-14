export type MyRepository = {
  name: string;
  localFolder: string;
  repository: string;
};

export type MyRepositoriesList = {
  name: string;
  repositories: MyRepository[];
};
