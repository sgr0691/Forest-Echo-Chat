# Forest-Echo-Chat

![Forest Echo Chat](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/desktop-C4pSCzXXMHnJIuPrZE4TDCO25bfjU7.jpeg)

A Ghibli-inspired AI chat application that combines the whimsy of Studio Ghibli's aesthetic with modern AI capabilities. Forest Echo Chat provides both technical answers and magical, nature-themed responses in a serene, forest-inspired interface.

## ✨ Features

- **Ghibli-Inspired Design**: Soft colors, nature elements, and whimsical animations create a peaceful chat environment
- **Dual-Mode AI**: Technical questions use a RAG (Retrieval Augmented Generation) system, while Ghibli-themed questions receive special handcrafted responses
- **Web Search Integration**: Connect to external knowledge sources for up-to-date information
- **Responsive Interface**: Works beautifully on both desktop and mobile devices
- **Customizable AI Models**: Choose between different "spirits" (AI models) for varied response styles

## 📱 Mobile Experience

Forest Echo Chat is fully responsive and optimized for mobile devices:

![Mobile Interface](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/v0-EBA6UQD2uIcB8HZwT96EjwnGsXQxl7.jpeg)

The mobile interface maintains the serene Ghibli-inspired aesthetic with:
- Clean, minimalist design with soft gradient background
- Easy access to AI model selection and settings
- Convenient suggested questions for quick interactions
- Smooth chat experience optimized for smaller screens
- Full functionality of the desktop version in a mobile-friendly layout

## 🌱 Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm or npm or yarn

### Installation

1. Clone the repository:

```bash

```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm run dev
```

4. Open http://localhost:3000 in your browser.

### Environment Variables

Copy the `.env.example` file to `.env` and fill in the required values:

```bash
cp .env.example .env
```

### 🌲 Project Structure

```
forest-echo-chat/
├── app/                  # Next.js App Router files
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main chat interface
├── components/           # React components
│   ├── prompt-kit/       # Chat UI components
│   │   ├── chat-container.tsx
│   │   ├── code-block.tsx
│   │   ├── markdown.tsx
│   │   ├── message.tsx
│   │   ├── prompt-input.tsx
│   │   └── suggested-questions.tsx
│   ├── ui/               # UI components (shadcn/ui)
│   └── settings-panel.tsx # Settings interface
├── lib/                  # Utility functions and services
│   ├── browserbase-service.ts  # Web search service
│   ├── content-processor.ts    # Content processing
│   ├── db.ts                   # Database connection
│   ├── enhanced-retrieval-service.ts # Enhanced RAG system
│   ├── knowledge-base.ts       # Static knowledge base
│   ├── retrieval-middleware.ts # Query processing middleware
│   ├── retrieval-service.ts    # Basic retrieval service
│   └── types.ts                # TypeScript type definitions
├── public/               # Static assets
│   └── favicon.svg       # Application favicon
└── README.md             # This file
```

### 🌿 Usage

### Chat Interface

The main interface allows you to:

- Type questions or messages in the input field
- Select from suggested Ghibli-themed questions
- View responses with proper formatting for code, markdown, and citations
- Toggle web search capabilities on/off


### Special Ghibli Questions

The application has special handcrafted responses for these Ghibli-themed questions:

- "Tell me about the spirits of the forest"
- "What magic can I learn on my journey?"
- "How do I find balance with nature?"
- "Tell me a story about the wind"


### Settings

Access settings by clicking the "Settings" button to:

- Configure API keys for different AI providers
- Select your default AI model
- Manage tools and extensions

## 🌟 Technologies Used

- **Next.js**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable UI components
- **Lucide React**: Beautiful icons
- **RAG System**: Custom-built retrieval augmented generation for accurate answers

## 🍃 Customization

### Styling

The application uses a Ghibli-inspired color palette defined in `tailwind.config.ts`:

```typescript
colors: {
  // Ghibli-inspired colors
  ghibli: {
    sky: "#a8d8ea",
    cloud: "#f5f7dc",
    forest: "#7a9e7e",
    meadow: "#b8cd8b",
    sunset: "#f4a698",
    earth: "#d8b384",
    stone: "#a39a92",
    spirit: "#f2d0a4",
  },
}
```

You can modify these colors to create your own theme.

### Adding New Ghibli Questions

To add new special Ghibli-themed questions and responses, edit the `ghibliResponses` object in `app/page.tsx`:

```typescript
const ghibliResponses: Record<string, string> = {
  "Your new question here": "Your magical response here",
  // ... existing questions
}
```

### Extending the Knowledge Base

The static knowledge base can be extended by adding new QA pairs to the `knowledgeBase` array in `lib/knowledge-base.ts`:

```typescript
export const knowledgeBase: QAPair[] = [
  {
    id: "custom-1",
    question: "Your custom question",
    answer: "Your detailed answer",
    keywords: ["keyword1", "keyword2"],
    category: "your-category",
  },
  // ... existing QA pairs
]
```

## 🌄 Deployment

This project can be easily deployed on Vercel:

1. Create a Vercel account
2. Import the project from GitHub
3. Set up environment variables
4. Deploy

## 🌻 Credits

- Design inspired by Studio Ghibli films
- Icons from [Lucide Icons](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- RAG system inspired by modern AI research

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌿 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🌳 Future Enhancements

- Voice input and output capabilities
- More interactive animations and visual effects
- Expanded Ghibli-themed knowledge base
- User accounts and conversation history
- Theme customization options
- Integration with more AI models and providers

<i>Created with ❤️ for Studio Ghibli fans and AI enthusiasts alike</i>