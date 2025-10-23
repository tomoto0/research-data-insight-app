import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  ai: router({
    generateDataInsights: publicProcedure
      .input(z.object({
        headers: z.array(z.string()),
        rows: z.array(z.array(z.any())),
        chartType: z.string(),
        selectedColumns: z.array(z.number()),
      }))
      .mutation(async ({ input }) => {
        const { headers, rows, chartType, selectedColumns } = input;
        
        // Prepare data summary for AI analysis
        const dataSummary = `
Dataset Summary:
- Headers: ${headers.join(', ')}
- Total Rows: ${rows.length}
- Chart Type: ${chartType}
- Selected Columns: ${selectedColumns.map(i => headers[i]).join(', ')}

Sample Data (first 5 rows):
${rows.slice(0, 5).map(row => headers.map((h, i) => `${h}: ${row[i]}`).join(', ')).join('\n')}`;

        try {
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "You are a data analysis expert. Analyze the provided dataset and provide insights in Japanese. Return a JSON object with 'summary', 'insights', and 'writingTips' fields."
              },
              {
                role: "user",
                content: `Please analyze this dataset and provide insights:\n${dataSummary}`
              }
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "data_insights",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    summary: { type: "string", description: "3-4 sentence summary of the data" },
                    insights: { type: "array", items: { type: "string" }, description: "Key insights from the data" },
                    writingTips: { type: "string", description: "Tips for writing about this data" },
                  },
                  required: ["summary", "insights", "writingTips"],
                  additionalProperties: false,
                },
              },
            },
          });

          const content = response.choices[0]?.message?.content;
          if (typeof content === 'string') {
            return JSON.parse(content);
          }
          return { summary: '', insights: [], writingTips: '' };
        } catch (error) {
          console.error('Failed to generate insights:', error);
          throw error;
        }
      }),

    generateChartCaption: publicProcedure
      .input(z.object({
        chartType: z.string(),
        title: z.string(),
        description: z.string(),
      }))
      .mutation(async ({ input }) => {
        const { chartType, title, description } = input;

        try {
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "You are a professional technical writer. Generate a clear, concise figure caption for academic or business reports in Japanese."
              },
              {
                role: "user",
                content: `Generate a figure caption for a ${chartType} chart with the following:\nTitle: ${title}\nDescription: ${description}`
              }
            ],
          });

          const content = response.choices[0]?.message?.content;
          return { caption: typeof content === 'string' ? content : '' };
        } catch (error) {
          console.error('Failed to generate caption:', error);
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
