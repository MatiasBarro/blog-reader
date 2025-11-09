import { currentUser } from "@clerk/nextjs/server";
import { userRepository } from "../../../repositories";
import { snsClient } from "../../../lib/aws/sns";

// TODO: ADD BODY VALIDATION
export async function POST(req: Request) {
  const [body, user] = await Promise.all([req.json(), currentUser()]);

  if(!user) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if(!body.token) {
    return Response.json({ message: 'Missing token' }, { status: 400 });
  }
  
  const email = user.emailAddresses[0].emailAddress;
  const dbUser = await userRepository.get({email});

  if(!dbUser || !dbUser.snsEndpointArn) {
    // create sns endpoint
    const snsEndpointArn = await snsClient.createEndpoint(process.env.AWS_BLOG_READER_SNS_PLATFORM_APP_ARN!, body.token);

    // upsert user
    await userRepository.put({
      email,
      snsEndpointArn,
      clerkId: user.id,
      createdAt: dbUser?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    return Response.json({ message: 'Token Update Success' })
  }

  // get sns endpoint attributes
  const endpointAttributes = await snsClient.getEndpointAttributes(dbUser.snsEndpointArn);

  if(endpointAttributes?.Token === undefined || endpointAttributes?.Enabled === undefined) {
    return Response.json({ message: 'Invalid endpoint attributes' }, { status: 500 });
  }

  if(endpointAttributes.Token !== body.token || endpointAttributes.Enabled === 'false') {
    console.log('Updating token');
    // update sns endpoint token
    await snsClient.updateEndpointToken(dbUser.snsEndpointArn, body.token);
  }
  
  return Response.json({ message: 'Token Update Success' })
  
}