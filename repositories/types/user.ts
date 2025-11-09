export interface UserKey {
    email: string;
}

export interface User extends UserKey {
    clerkId: string;
    notificationToken: string;
    createdAt: string;
    updatedAt: string;
}