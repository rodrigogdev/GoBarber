declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    file: {
      filename: string;
    };
  }
}
declare module "mongodb";
