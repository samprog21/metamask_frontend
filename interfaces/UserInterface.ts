export interface BaseUser {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
}
export interface UserRegisterForm extends BaseUser {
  password: string;
  profilePicture : FileList;
  
}

// User API Interface
export interface UserGetApi extends BaseUser {
  id: string; 
  profilePicture : string;
  role:string;
}

export interface UserLoginForm  {
  password: string;
  email: string;
}

export type userQuery={
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  id?:string;
}

export type userFilter={
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  id?:string;
}

export interface UserUpadteForm extends UserRegisterForm{
  id:string;
}