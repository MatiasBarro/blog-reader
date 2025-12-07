import { Client } from "@/lib/aws/dynamoDb/client.ts";
import { Repository } from "./repository.ts";

export interface UserKey {
    email: string;
}

export interface User extends UserKey {
    clerkId: string;
    snsEndpointArn: string;
    createdAt: string;
    updatedAt: string;
}

export class UserRepository extends Repository<UserKey, User> {
    constructor(dynamoDbClient: Client,) {
        super(dynamoDbClient, 'blog-reader-users');
    }
}