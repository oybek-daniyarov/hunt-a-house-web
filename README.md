# AI-Powered Project Requirements Generator

A modern web application that transforms natural language project descriptions into structured technical specifications.

## Features

- 🤖 AI-powered requirements analysis
- ⚡️ Real-time streaming updates
- 🎨 Modern, responsive UI with Shadcn
- 📱 Mobile-first design
- 🌗 Dark mode support
- ✨ Smooth animations with Framer Motion

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **AI Model:** DeepSeek
- **Animations:** Framer Motion

## Project Structure

```
├── app/
│   └── api/
│       └── generate-property/
│           ├── route.ts      # API endpoint
│           └── schema.ts     # Zod schema
├── components/
│   └── forms/
│       └── property-description-generator.tsx  # Main component
└── types/
    └── index.ts             # TypeScript types
```

## Key Components

1. **Project Description Input**
   - Natural language input
   - Example templates
   - Real-time validation

2. **Requirements Analysis**
   - Department & project type detection
   - Tech stack recommendations
   - Timeline analysis
   - Team requirements

3. **Generated Output**
   - Structured technical specifications
   - Feature lists
   - Tech stack breakdown
   - Team composition

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   ```env
   DEEPSEEK_API_KEY=your_api_key
   ```
4. Run the development server:
   ```bash
   pnpm dev
   ```

## Usage

1. Enter project description in natural language
2. Click "Generate" or use example templates
3. Review generated requirements
4. Edit if needed
5. Submit final specifications

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this in your own projects!
