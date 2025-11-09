import { currentUser } from "@clerk/nextjs/server";
import { userRepository } from "../../../repositories";

// TODO: ADD BODY VALIDATION
export async function POST(req: Request) {
  const [body, user] = await Promise.all([req.json(), currentUser()]);

  if(!user) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  const email = user.emailAddresses[0].emailAddress;
  const dbUser = await userRepository.get({email});

  if(!dbUser || dbUser.notificationToken !== body.token) {
    // upsert user
    await userRepository.put({
      email,
      clerkId: user.id,
      notificationToken: body.token,
      createdAt: dbUser?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  
  return Response.json({ message: 'Token Update Success' })
}