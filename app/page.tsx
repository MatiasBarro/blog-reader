import { Home as HomePage } from '../pages/home';
import '../lib/aws/dynamoDb';

export default async function Home() {
  return <HomePage />;
}
