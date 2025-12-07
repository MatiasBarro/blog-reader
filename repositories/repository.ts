import { Client, ItemKey, QueryOptions, QueryOutput } from "../lib/aws/dynamoDb/client.ts";

export class Repository<K extends ItemKey, T> {
    constructor(private readonly client: Client, protected readonly tableName: string) {}

    query(options?: QueryOptions): Promise<QueryOutput<T>> {
        return this.client.query<T>(this.tableName, options);
    }

    get(key: K): Promise<T | null> {
        return this.client.getItem<T>(this.tableName, key);
    }

    put(item: T): Promise<void> {
        return this.client.putItem(this.tableName, item);
    }
}