import { dynamoDbClient } from '../lib/aws/dynamoDb/index.ts';
import { BlogArticleRepository } from './blog-article.respository.ts';
import { UserRepository } from './user.repository.ts';

export const userRepository = new UserRepository(dynamoDbClient);
export const blogArticleRepository = new BlogArticleRepository(dynamoDbClient);