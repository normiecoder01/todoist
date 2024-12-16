export interface ILoggedUser
{
    firstName   : string,
    lastName    : string,
    email       : string,
    userName    : string,
    userId      : number,
    managerId   : number,
    token       : string,
    expiration  : Date,
    role        : string

}