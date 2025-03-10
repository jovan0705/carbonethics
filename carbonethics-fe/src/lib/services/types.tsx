export type LoginFormType = {
  username: string;
  password: string;
};

export type RegisterFormType = {
  username: string;
  password: string;
  email: string;
};

export type TicketFormType = {
  title: string;
  description: string;
  client: number;
};

export type Token = {
  access: string;
  refresh: string;
};

export type TicketResponse = {
  client: number;
  solution: string;
  status: string;
  ticket_id: string;
  title: string;
};
