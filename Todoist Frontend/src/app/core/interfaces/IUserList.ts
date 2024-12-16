import { Role } from "../enums/role";

export interface IUserList {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    mobileNo: string,
    userName: string,
    managerUsername: string | null,
    userRole: Role,
}