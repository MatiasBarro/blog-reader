import { DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand, QueryInput } from "@aws-sdk/client-dynamodb";
import { marshall, NativeAttributeValue, unmarshall } from '@aws-sdk/util-dynamodb';

export type ItemKey = Record<string, NativeAttributeValue>; 
export type QueryOptions = Omit<QueryInput, 'TableName'> 
export type QueryOutput<T> = {
    results: T[],
    lastEvaluatedKey?: T
}

export class Client {
    private clientInstance: DynamoDBClient;

    constructor() {
        this.clientInstance = new DynamoDBClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
        });
    }

    async query<T>(table: string, options?: QueryOptions): Promise<QueryOutput<T>> {
        const command = new QueryCommand({
            TableName: table,
            ...options
        });

        const { Items, LastEvaluatedKey } = await this.clientInstance.send(command);

        if(!Items) {
            return {
                results: [],
                lastEvaluatedKey: LastEvaluatedKey && unmarshall(LastEvaluatedKey) as T
            };
        }
        
        return {
            results: Items.map((item) => {
                return unmarshall(item) as T
            }),
            lastEvaluatedKey: LastEvaluatedKey && unmarshall(LastEvaluatedKey) as T
        }
    }

    async getItem<T>(table: string, key: ItemKey): Promise<T | null> {
        const command = new GetItemCommand({
            TableName: table,
            Key: marshall(key),
        });

        const { Item } = await this.clientInstance.send(command);

        if(!Item) {
            return null;
        }

        return unmarshall(Item) as T;
    }

    async putItem<T>(table: string, item: T): Promise<void> {
        const command = new PutItemCommand({
            TableName: table,
            Item: marshall(item),
        });

        await this.clientInstance.send(command);
    }
}

export type { QueryInput} from '@aws-sdk/client-dynamodb';