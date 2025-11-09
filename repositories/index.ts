import { dynamoDbClient } from '../lib/aws/dynamoDb/index.ts';
import { Repository } from "./repository.ts";
import { User, UserKey } from "./types/user.ts";

export const userRepository = new Repository<UserKey, User>(dynamoDbClient, 'blog-reader-users');