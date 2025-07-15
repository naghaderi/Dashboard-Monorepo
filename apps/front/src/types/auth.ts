export type TSessionUser = {
  id?: string;
  name?: string;
  avatar?: string;
};

export type TSession = {
  user: TSessionUser;
  accessToken: string;
};
