export type Todo = {
  userId?: string;
  id?: string;
  title?: string;
  description?: string;
  completed?: boolean;
};

export type TodoRequestBody = {
  title: string;
  completed?: boolean;
  description?: string;
};

export type CreateResponse = {
  acknowledged: boolean;
};

export type UpdateResponse = {
  acknowledged: number;
  matchedCount: number;
  modifiedCount: number;
  upsertedCount: number;
};

export type DeleteResponse = { acknowledged: boolean; deletedCount: number };
