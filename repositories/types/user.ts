export interface UserKey {
    email: string;
}

export interface User extends UserKey {
    clerkId: string;
    snsEndpointArn: string;
    createdAt: string;
    updatedAt: string;
}