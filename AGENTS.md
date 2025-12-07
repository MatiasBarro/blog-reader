# Agent Instructions for Blog Reader Repository

## Project Overview

This is a Next.js 16 application built with the App Router, designed as a blog reader. It integrates Material-UI (MUI) for UI components, Firebase for push notifications, AWS services (DynamoDB and SNS) for backend data and messaging, Clerk for authentication, and Tailwind CSS for styling. The app supports service workers for background messaging and uses TypeScript throughout.

## Folder Structure

- **`app/`**: Contains the Next.js App Router pages and layouts.
  - `globals.css`: Global styles.
  - `layout.tsx`: Root layout component.
  - `page.tsx`: Home page component.
  - `theme.tsx`: MUI theme configuration.
  - `api/`: API routes for the app.
    - `notification_subscribe/route.ts`: Handles notification subscriptions.
- **`hooks/`**: Custom React hooks.
  - `useInitializePushNotifications.tsx`: Hook for initializing push notifications.
- **`lib/`**: Utility libraries and configurations.
  - `theme.ts`: Theme utilities.
  - `aws/`: AWS service clients.
    - `dynamoDb/`: DynamoDB client and utilities.
    - `sns/`: SNS client and utilities.
  - `firebase/`: Firebase configurations.
    - `sw.ts`: Service worker for Firebase messaging.
- **`n8n/`**: Contains n8n workflow files (e.g., for blog scraping).
- **`pages/`**: Legacy pages directory (may contain additional pages or redirects).
- **`public/`**: Static assets.
  - `firebase-messaging-sw.js`: Built service worker for Firebase.
- **`repositories/`**: Data access layer using repository pattern.
  - `blog-article.repository.ts`: Repository for blog articles.
  - `user.repository.ts`: Repository for user data.
  - `repository.ts`: Base repository class.
  - `index.ts`: Exports for repositories.
- **`scripts/`**: Build scripts.
  - `sw-build.ts`: Script to build the service worker.

## Development Guidelines

- **Next.js Tools**: Use the available Next.js MCP tools (e.g., `mcp_next-mcp_nextjs_index`, `mcp_next-mcp_nextjs_call`) for inspecting the running dev server, checking errors, and managing the application state.
- **MUI Components**: When creating or using new MUI components, use `mui-mcp-server` tool to ensure proper integration and best practices. Search for existing MUI components in the codebase using semantic search or grep to avoid duplication. Always follow MUI's theming and accessibility guidelines.
- **TypeScript**: Maintain strict TypeScript usage. Fix any type errors promptly, especially in service worker contexts (e.g., declare `self` as `ServiceWorkerGlobalScope`).
- **Authentication**: Use Clerk for user authentication. Ensure all protected routes and API endpoints check authentication.
- **Notifications**: Firebase handles push notifications. The service worker in `lib/firebase/sw.ts` processes background messages.
- **Data Management**: Use the repository pattern in `repositories/` for data access. AWS DynamoDB for storage and SNS for messaging.
- **Styling**: Use the theme in `app/theme.tsx` for consistent MUI theming.
- **Build and Deployment**: Run `npm run dev` for development on port 4000. Use `npm run build` for production builds. The service worker is built via `npm run sw-build`.

## Best Practices

- Always check for errors using Next.js MCP tools after changes.
- Use semantic search to understand existing code before making modifications.
- Keep components modular and reusable, leveraging MUI's component library.
- Test push notifications and service worker functionality thoroughly.
- Commit changes frequently and use descriptive commit messages.
