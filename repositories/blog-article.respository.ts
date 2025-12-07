import { Client, QueryOutput } from "@/lib/aws/dynamoDb/client";
import { Repository } from "./repository";
import { marshall } from "@aws-sdk/util-dynamodb";

export interface BlogArticleKey {
    blog: string;
    id: string;
}

export interface BlogArticle extends BlogArticleKey {
    title: string;
    date: string;
    link: string;
    summary: string;
}

export class BlogArticleRepository extends Repository<BlogArticleKey,BlogArticle> {
    constructor(dynamoDbClient: Client) {
        super(dynamoDbClient, 'blog-articles');
    }

    getArticles(): Promise<QueryOutput<BlogArticle>> {
        return this.query({
            IndexName: 'blog-date-index',
            KeyConditionExpression: 'blog = :blog',
            ExpressionAttributeValues: {
                ':blog': marshall('amazon')
            },
            ScanIndexForward: false     
        })
    }
}