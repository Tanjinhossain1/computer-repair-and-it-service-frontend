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
    serviceLocation?: string;
};
export type IBooked = {
    id: number;
    serviceId: number;
    userId: number;
    startDate: string;
    endDate: string;
    bookStatus: string
    service: IService
}

export type IBlogPost = {
    id: number;
    title: string;
    description: string;
    image: string;
    topShortDescription: string
}
export type IFaqs = {
    id: string
    question: string;
    ans: string
}

export type IFeedback = {

    id: number
    userId: number
    comment: string
    suggestion: string
    user: IUser
    createAt: string
    updateAt: string


}


export type IAddToCart = {
    id: number;
    userId: number;
   serviceId:number;
    user: IUser;
    service: IService
    createAt: string
    updateAt: string
}