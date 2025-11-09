
import { CreatePlatformEndpointCommand, GetEndpointAttributesCommand, SetEndpointAttributesCommand, SNSClient } from '@aws-sdk/client-sns';
export class SnsClient {
    private clientInstance: SNSClient
    constructor() {
        this.clientInstance = new SNSClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
        })
    }

    public async createEndpoint(platformAppArn: string, token: string): Promise<string> {
        const request = new CreatePlatformEndpointCommand({
            PlatformApplicationArn: platformAppArn,
            Token: token
        })

        const response = await this.clientInstance.send(request)
        
        if(!response.EndpointArn) {
            throw new Error('Failed to create platform endpoint')
        }

        return response.EndpointArn;
    }

    public async getEndpointAttributes(endpointArn: string): Promise<Record<string, string> | undefined> {
        const request = new GetEndpointAttributesCommand({
            EndpointArn: endpointArn
        })

        const response = await this.clientInstance.send(request)
        
        return response.Attributes;
    }

    public async updateEndpointToken(endpointArn: string, token: string) {
        const request = new SetEndpointAttributesCommand({
            EndpointArn: endpointArn,
            Attributes: {
                Token: token,
                Enabled: 'true'
            }
        });

        await this.clientInstance.send(request);
    }
}