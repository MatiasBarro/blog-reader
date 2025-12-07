import HomePage from '../pages/home';
import '../lib/aws/dynamoDb';
import { blogArticleRepository } from '@/repositories';

export default async function Home() {
  const { results } = await blogArticleRepository.getArticles();

  console.log(results, results.length);

  return <HomePage />;
}
