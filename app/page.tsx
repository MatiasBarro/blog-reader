import HomePage from '../components/pages/home';
import { blogArticleRepository } from '@/repositories';

export default async function Home() {
  const { results } = await blogArticleRepository.getArticles();

  return <HomePage articles={results} />;
}
