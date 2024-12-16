import { Role } from "../enums/role";

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
    username: string;
    password: string;
    confirmpassword: string;
    agree: boolean;
    role: Role; //true = admin, false == user
  }