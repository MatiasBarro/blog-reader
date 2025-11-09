import { Client, ItemKey } from "../lib/aws/dynamoDb/client.ts";

export class Repository<K extends ItemKey, T> {
    constructor(private readonly client: Client, private readonly tableName: string) {}

    get(key: K): Promise<T | null> {
        return this.client.getItem<T>(this.tableName, key);
    }

    put(item: T): Promise<void> {
        return this.client.putItem(this.tableName, item);
    }
}