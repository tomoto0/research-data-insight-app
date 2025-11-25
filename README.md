# Research Data Insight Generator

**AI-Powered Data Visualization and Analysis Tool**

Transform your CSV data into beautiful, professionally-designed charts with intelligent AI-powered analysis and recommendations.

**Live Demo:** [https://datainsight-n7dcbp6y.manus.space](https://datainsight-n7dcbp6y.manus.space)

---

## Overview

Research Data Insight Generator is a full-stack web application that combines powerful data visualization capabilities with advanced AI analysis. Users can upload CSV files and instantly generate publication-ready charts with AI-driven insights and styling recommendations. The application leverages Manus AI infrastructure to provide intelligent data analysis, automatic chart optimization, and research-focused writing tips.

This tool is designed for researchers, analysts, academics, and business professionals who need to create compelling data visualizations quickly without extensive manual design work.

---

## Main Screen

![Data Insight Generator Main Screen](/screenshot.jpg)

*Main Interface: Integrated CSV upload, chart configuration, and AI analysis features*

---

## Key Features

### 📊 Data Visualization
- **Multiple Chart Types:** Bar charts, line graphs, pie charts, and doughnut charts
- **Real-Time Preview:** Instant chart generation as you configure settings
- **Flexible Data Handling:** Automatic CSV parsing with support for multiple delimiters (comma, semicolon, tab, pipe)
- **Column Selection:** Choose which data columns to visualize
- **PNG Export:** Download charts in high-quality PNG format for presentations and publications

### 🤖 AI-Powered Features
- **Automatic Chart Optimization:** AI analyzes your data and recommends the optimal chart type and color scheme with a single click
- **Data Insights Generation:** AI provides comprehensive analysis including data summaries, key insights, and writing tips
- **Intelligent Data Type Detection:** Automatically identifies numeric, categorical, and date-based columns
- **Color Palette Recommendations:** AI generates professional color schemes tailored to your data

### 🎨 Customization
- **Color Schemes:** Choose from multiple palette options (Vibrant, Pastel, Professional, Cool, Warm)
- **Custom Colors:** Manually adjust base colors, canvas background, and text colors
- **Label Configuration:** Select which column serves as labels and which columns to display
- **Professional Styling:** Dark theme interface optimized for research and academic use

### 📝 Research-Focused Tools
- **AI Writing Assistance:** Get tips for writing about your data in academic or business contexts
- **Data Summaries:** AI-generated summaries of your dataset characteristics
- **Actionable Insights:** Automatic extraction of key patterns and trends
- **Chart Captions:** Generate figure captions suitable for academic papers

---

## Technology Stack

### Frontend
- **React 19** - Modern UI framework with hooks and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **TypeScript** - Type-safe JavaScript for robust code
- **Tailwind CSS 4** - Utility-first CSS framework with OKLCH color support
- **shadcn/ui** - High-quality, accessible React components
- **Chart.js** - Powerful charting library with multiple chart types
- **Lucide React** - Beautiful, consistent icon library

### Backend
- **Express 4** - Lightweight, flexible Node.js web framework
- **tRPC 11** - End-to-end typesafe APIs with automatic type inference
- **Drizzle ORM** - Type-safe SQL query builder for database operations
- **Zod** - TypeScript-first schema validation

### AI & Infrastructure
- **Manus LLM API** - Advanced language models for data analysis and insights
- **Manus OAuth** - Secure authentication system
- **MySQL/TiDB** - Reliable database for data persistence
- **S3 Storage** - Cloud-based file storage integration

---

## Architecture

### System Design

The application follows a modern full-stack architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React 19)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ DataVisualizer (Main Component)                      │   │
│  │ ├─ DataControls (CSV Upload & Configuration)         │   │
│  │ ├─ ChartCanvas (Chart Rendering)                     │   │
│  │ └─ AIInsights (AI Analysis Panel)                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↕ (tRPC)                            │
├─────────────────────────────────────────────────────────────┤
│                    Backend (Express + tRPC)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ tRPC Routers                                         │   │
│  │ ├─ ai.generateDataInsights (Data Analysis)           │   │
│  │ ├─ ai.optimizeChartStyle (Chart Optimization)        │   │
│  │ ├─ ai.generateChartCaption (Caption Generation)      │   │
│  │ └─ auth.* (Authentication)                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↕                                    │
├─────────────────────────────────────────────────────────────┤
│                   External Services                          │
│  ├─ Manus LLM API (Data Analysis & Insights)                │
│  ├─ Manus OAuth (User Authentication)                       │
│  ├─ MySQL Database (Data Persistence)                       │
│  └─ S3 Storage (File Storage)                               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **CSV Upload:** User uploads CSV file via drag-and-drop or file selection
2. **Parsing:** Frontend parses CSV with configurable delimiter detection
3. **Configuration:** User selects chart type, columns, and styling options
4. **Chart Generation:** Chart.js renders visualization in real-time
5. **AI Optimization:** Optional AI analysis recommends optimal chart type and colors
6. **AI Insights:** tRPC mutation calls backend LLM for data analysis
7. **Export:** User downloads chart as PNG or views AI-generated insights

---

## Features in Detail

### CSV Upload & Parsing
The application supports flexible CSV handling with the following capabilities:
- **Automatic Delimiter Detection:** Intelligently detects comma, semicolon, tab, or pipe delimiters
- **Header Row Recognition:** Automatically treats first row as column headers
- **Drag & Drop Support:** Intuitive file upload with visual feedback
- **Sample Data:** Pre-loaded sample dataset for immediate exploration

### Chart Customization
Users have extensive control over chart appearance:

| Feature | Options | Description |
|---------|---------|-------------|
| Chart Type | Bar, Line, Pie, Doughnut | Multiple visualization formats |
| Label Column | Any column | Determines X-axis or pie labels |
| Data Columns | Multiple selection | Choose which columns to visualize |
| Color Scheme | 5 predefined palettes | Professional color combinations |
| Base Color | Color picker | Primary color for chart elements |
| Canvas Background | Color picker | Chart background color |
| Text Color | Color picker | Label and legend text color |

### AI Chart Optimization
The **AI Optimize** feature analyzes your dataset and provides intelligent recommendations:

1. **Data Type Detection:** Identifies numeric, categorical, and temporal data
2. **Chart Type Recommendation:** Suggests optimal visualization based on data characteristics
3. **Color Scheme Selection:** Recommends professional color palettes
4. **Automatic Application:** Applies recommendations with a single click

### AI Data Analysis
The **AI Insights** feature generates comprehensive analysis including:

- **Data Summary:** Overview of dataset structure and characteristics
- **Key Insights:** Automatically extracted patterns, trends, and anomalies
- **Writing Tips:** Research-focused guidance for discussing the data
- **Professional Formatting:** Structured output suitable for academic papers

---

## Installation & Setup

### Prerequisites
- Node.js 18+ and pnpm package manager
- MySQL 8.0+ or TiDB compatible database
- Manus platform account with API credentials

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tomoto0/research-data-insight-app.git
   cd research-data-insight-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Required environment variables:
   - `DATABASE_URL` - MySQL/TiDB connection string
   - `JWT_SECRET` - Session signing secret
   - `VITE_APP_ID` - Manus OAuth application ID
   - `OAUTH_SERVER_URL` - Manus OAuth endpoint
   - `VITE_OAUTH_PORTAL_URL` - Manus login portal
   - `BUILT_IN_FORGE_API_URL` - Manus API endpoint
   - `BUILT_IN_FORGE_API_KEY` - Manus API key
   - `VITE_APP_TITLE` - Application title
   - `VITE_APP_LOGO` - Logo image URL

4. **Initialize database:**
   ```bash
   pnpm db:push
   ```

5. **Start development server:**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

---

## Deployment on Manus Platform

### Prerequisites
- Manus platform account
- GitHub repository with this code
- Personal access token for authentication

### Deployment Steps

1. **Prepare the repository:**
   Ensure all files are committed and pushed to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Manus:**
   - Log in to Manus Management Dashboard
   - Click "Create New Project"
   - Select "Web App Template" with database and user features
   - Connect your GitHub repository

3. **Configure Environment:**
   - Set all required environment variables in Manus Settings → Secrets
   - Ensure database credentials are properly configured
   - Verify API keys for Manus LLM and OAuth services

4. **Deploy:**
   - Create a checkpoint in the development environment
   - Click "Publish" button in Management UI
   - Wait for build and deployment to complete
   - Access your live application at the provided URL

5. **Post-Deployment:**
   - Test all features including CSV upload, chart generation, and AI analysis
   - Monitor logs for any errors
   - Configure custom domain if desired in Settings → Domains

---

## Project Structure

```
research-data-insight-app/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Landing page
│   │   │   └── DataVisualizer.tsx  # Main application interface
│   │   ├── components/
│   │   │   ├── ChartCanvas.tsx     # Chart rendering component
│   │   │   ├── DataControls.tsx    # CSV upload & configuration
│   │   │   └── AIInsights.tsx      # AI analysis display
│   │   ├── lib/
│   │   │   └── trpc.ts             # tRPC client configuration
│   │   ├── App.tsx                 # Main app component & routing
│   │   ├── main.tsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── public/
│   │   └── sample-data.csv         # Sample dataset for demo
│   └── index.html                  # HTML template
├── server/                          # Backend Express application
│   ├── routers.ts                  # tRPC procedure definitions
│   ├── db.ts                       # Database query helpers
│   ├── _core/
│   │   ├── llm.ts                  # Manus LLM integration
│   │   ├── index.ts                # Express server setup
│   │   └── ...                     # Other core modules
│   └── storage.ts                  # S3 storage helpers
├── drizzle/
│   └── schema.ts                   # Database schema definitions
├── shared/
│   └── const.ts                    # Shared constants
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
└── README.md                       # This file
```

---

## Development Workflow

### Adding New Features

1. **Update Database Schema** (if needed):
   - Edit `drizzle/schema.ts`
   - Run `pnpm db:push` to apply migrations

2. **Add Backend Logic**:
   - Create or extend procedures in `server/routers.ts`
   - Use `invokeLLM()` for AI features
   - Return typed responses using Zod schemas

3. **Build Frontend Components**:
   - Create components in `client/src/components/`
   - Use `trpc.*.useQuery()` or `trpc.*.useMutation()` for data
   - Style with Tailwind CSS and shadcn/ui

4. **Test & Iterate**:
   - Run `pnpm dev` for hot-reload development
   - Test in browser at `http://localhost:3000`
   - Check console for errors and warnings

### Database Migrations

```bash
# Generate migration from schema changes
pnpm db:generate

# Apply pending migrations
pnpm db:push

# View migration history
pnpm db:studio
```

---

## API Reference

### tRPC Procedures

#### `ai.generateDataInsights`
Generates comprehensive AI analysis of uploaded dataset.

**Input:**
```typescript
{
  headers: string[];           // Column names
  rows: any[][];              // Data rows
  chartType: string;          // Current chart type
  selectedColumns: number[];  // Selected column indices
}
```

**Output:**
```typescript
{
  summary: string;            // 3-4 sentence data summary
  insights: string[];         // Array of key insights
  writingTips: string;        // Tips for writing about the data
}
```

#### `ai.optimizeChartStyle`
Recommends optimal chart type and color scheme based on data analysis.

**Input:**
```typescript
{
  headers: string[];                    // Column names
  rows: any[][];                       // Data rows
  dataTypes: Record<string, string>;   // Column data types
}
```

**Output:**
```typescript
{
  chartType: "bar" | "line" | "pie" | "doughnut";
  colorScheme: "vibrant" | "pastel" | "professional" | "cool" | "warm";
  explanation: string;                 // Why this recommendation
  colorPalette: string[];             // Array of 5 hex colors
}
```

#### `ai.generateChartCaption`
Generates academic-style figure captions for charts.

**Input:**
```typescript
{
  chartType: string;   // Chart type
  title: string;       // Chart title
  description: string; // Chart description
}
```

**Output:**
```typescript
{
  caption: string;     // Generated figure caption
}
```

---

## Performance Optimization

The application implements several performance best practices:

- **Code Splitting:** Lazy-loaded components reduce initial bundle size
- **Caching:** tRPC queries cache results to minimize API calls
- **Optimistic Updates:** UI updates immediately while requests process
- **Image Optimization:** Charts are rendered efficiently using Canvas
- **Database Indexing:** Optimized queries with proper database indexes

---

## Security Considerations

- **Authentication:** Manus OAuth provides secure user authentication
- **Authorization:** Protected procedures ensure only authenticated users can access features
- **Input Validation:** Zod schemas validate all API inputs
- **CORS Protection:** Configured to prevent cross-origin attacks
- **Environment Secrets:** Sensitive credentials stored securely in Manus Secrets

---

## Troubleshooting

### CSV Upload Not Working
- Ensure file is valid CSV format
- Check delimiter is correctly detected
- Verify file size is reasonable (< 10MB recommended)

### Charts Not Displaying
- Clear browser cache and reload
- Check browser console for JavaScript errors
- Verify data contains numeric values for chart axes

### AI Features Not Working
- Confirm Manus API credentials are correctly set
- Check network connectivity to Manus services
- Review server logs for API errors

### Database Connection Issues
- Verify `DATABASE_URL` is correctly configured
- Test database connectivity with `pnpm db:studio`
- Ensure database user has proper permissions

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the MIT License.

---

## Support & Feedback

For issues, feature requests, or feedback:
- Open an issue on GitHub
- Contact the development team
- Visit the Manus platform documentation

---

## Acknowledgments

This application was developed using the Manus AI platform, which provides:
- Advanced language models for data analysis
- Secure OAuth authentication
- Cloud infrastructure and deployment
- Database and storage services

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-11-16 | Initial release with core features |

---

**Last Updated:** November 16, 2024  
**Deployed At:** [https://datainsight-n7dcbp6y.manus.space](https://datainsight-n7dcbp6y.manus.space)  
**Repository:** [https://github.com/tomoto0/research-data-insight-app](https://github.com/tomoto0/research-data-insight-app)
