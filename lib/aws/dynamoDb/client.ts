import { DynamoDBClient, GetItemCommand, PutItemCommand,  } from "@aws-sdk/client-dynamodb";
import { marshall, NativeAttributeValue, unmarshall } from '@aws-sdk/util-dynamodb';

export type ItemKey = Record<string, NativeAttributeValue>; 

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

    async getItem<K>(table: string, key: ItemKey): Promise<K | null> {
        const command = new GetItemCommand({
            TableName: table,
            Key: marshall(key),
        });

        const { Item } = await this.clientInstance.send(command);

        if(!Item) {
            return null;
        }

        return unmarshall(Item) as K;
    }

    async putItem<T>(table: string, item: T): Promise<void> {
        const command = new PutItemCommand({
            TableName: table,
            Item: marshall(item),
        });

        await this.clientInstance.send(command);
    }
}