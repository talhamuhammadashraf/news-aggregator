# News Aggregator
## Overview

News Aggregator is a React-based web application that aggregates news articles from multiple sources, providing a unified interface for browsing, searching, and filtering news. The project is built with Vite, TypeScript, and leverages modern React features for efficient state management and data fetching.

## Getting Started
### Environment Variables
Create a `.env` file in the project root with the following keys:

```env
VITE_NEWSAPI_KEY=your_newsapi_key_here
VITE_THE_GUARDIAN_KEY=your_theguardian_key_here
VITE_NEW_YORK_TIMES_KEY=your_nytimes_key_here
```
Replace the values with your actual API keys for each provider.


### Prerequisites
- Docker

### Quick Start (Docker)
1. Clone the repository:
   ```bash
   git clone https://github.com/talhamuhammadashraf/news-aggregator.git
   cd news-aggregator
   ```
2. Build and run the app using Docker:
   ```bash
   docker build -t news-aggregator .
   docker run -p 3000:3000 --name news-aggregator news-aggregator
   ```
3. Open your browser and go to `http://localhost:3000`

This will build and serve the production build automatically. No manual setup or dependency installation required.

## Technical Overview

### Main Components



- **SelectSource**: The `SelectSource` component provides the UI for selecting the news source. It uses the `useSource` hook, which interacts with the `SourceContext` to select between three sources: `nytimes |theguardian | newsapi`. This context-based approach ensures the selected source is managed globally and we can avoid prop-drilling as well.

- **Personalized News Categories**: The Tabs component enables users to navigate between personalized news categories, allowing for a tailored news browsing experience based on selected interests. The available categories are dynamically mapped and shown based on the currently selected news source, ensuring relevant options for each provider.

- **ArticleList**: Displays a list of articles, accepts category/keyword and displays list of `ArticleCard` with responsiveUI. It uses the custom hook `useArticles` to efficiently fetch and cache articles using [react-query](https://tanstack.com/query/latest). This ensures fast and optimized data loading across the app.

- **useArticles Hook**: Encapsulates the logic for fetching articles based on category/keyword from different sources (`useSource`/`SourceContext`). Utilizes react-query for caching, background updates, and request deduplication, making data fetching robust and performant.

- **SearchInput**: Provides search functionality for articles and allows to select/change source using `SelectSource` and search from textinput

- **ArticleCard**: Displays individual article details `title`, `description` `thumbnail`, `author`, `date` and redirects to web url.

- **EmptyState**: Shown when no articles are available for the selected filters or in case of error/loading.

### Data Sources
Articles are fetched from multiple sources (e.g., NewsAPI, NYTimes, The Guardian) using static JSON files in `src/data/` for demo purposes. The architecture supports easy integration with live APIs.

### Project Structure
- `src/components/`: Reusable UI components
- `src/hooks/`: Custom React hooks
- `src/context/`: Context providers
- `src/pages/`: Page-level components
- `src/data/`: Static data files
- `src/types/`: TypeScript type definitions
- `src/utils/`: Utility functions
