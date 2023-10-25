export type TLoginData = {
  username: string;
  password: string;
};

export type TRows = {
  id?: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};

export type TTable = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TRows[];
};

export type TMessage = {
  message: string;
};

export type TStore = {
  tableReducer: TTable;
  loginReducer: TMessage;
};

export type TSetModal = {
  setModal: (bool: boolean) => void;
  currentRow: TRows | null;
};

export type TAction = {
  type: string | undefined;
  payload: any;
};
