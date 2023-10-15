export interface IMeta {
    limit: number;
    page: number;
    total: number;
}

export type ResponseSuccessType = {
    data: any;
    meta?: IMeta;
}

export type ResponseErrorType = {
    statusCode?: number;
    message?: string;
    errorMessages?: IGenericErrorMessages[]
};

export interface IGenericErrorMessages {
    path: string | number;
    message: string
} 
export type IUser = {
    id: number;
    password: string;
    role: string;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    dateOfBirth: string;
    gender?: string | null;
    bloodGroup?: string | null;
    email: string;
    contactNo: string;
    emergencyContactNo?: string | null;
    presentAddress?: string | null;
    permanentAddress?: string | null;
    roleBasedPermission?: string | null;
    profileImage?: string | null;
    createAt: Date;
    updateAt: Date;
  };
  
 export type IService = {
    id: number;
    title: string;
    description: string;
    image: string;
    price: string;
    status: string;
    category: string;
    createAt: Date;
    updateAt: Date;
    rating?: string | null;
  };
  