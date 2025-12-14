'use client';

import type { BlogArticle } from '@/repositories/blog-article.respository';
import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
import { useInitializePushNotifications } from '../../hooks/useInitializePushNotifications.tsx';

interface Props {
  articles: BlogArticle[];
}

const Home: React.FC<Props> = ({ articles }) => {
  useInitializePushNotifications();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Latest Amazon Blog Articles
      </Typography>
      <Stack spacing={3} sx={{ mt: 2 }}>
        {articles.map((article, index) => (
          <Box key={article.id}>
            <Link
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              variant="h6"
              underline="hover"
              sx={{ display: 'block', mb: 1 }}
            >
              {article.title}
            </Link>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {article.date}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <ReactMarkdown
                components={{
                  p: ({ children, ...props }) => (
                    <Typography variant="body2" {...props}>
                      {children}
                    </Typography>
                  ),
                }}
              >
                {article.summary}
              </ReactMarkdown>
            </Box>
            {index < articles.length - 1 && <Divider />}
          </Box>
        ))}
      </Stack>
      {articles.length === 0 && (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No articles available.
        </Typography>
      )}
    </Container>
  );
};

export default Home;
