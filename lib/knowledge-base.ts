export interface QAPair {
  id: string
  question: string
  answer: string
  keywords: string[]
  category: string
}

// Expanded knowledge base with pre-defined Q&A pairs across various topics
export const knowledgeBase: QAPair[] = [
  // AI & Machine Learning
  {
    id: "ai-1",
    question: "What is RAG?",
    answer:
      "RAG (Retrieval-Augmented Generation) is an AI framework that combines retrieval of relevant information from a knowledge base with generative AI to produce more accurate and contextual responses. It helps ground AI responses in factual information and reduces hallucinations.",
    keywords: ["rag", "retrieval", "augmented", "generation", "framework", "ai"],
    category: "ai-concepts",
  },
  {
    id: "ai-2",
    question: "What's the difference between AI, ML, and Deep Learning?",
    answer:
      "Artificial Intelligence (AI) is the broad concept of machines being able to carry out tasks in a way that we would consider 'smart'. Machine Learning (ML) is a subset of AI where machines learn from data without being explicitly programmed. Deep Learning is a further subset of ML that uses neural networks with many layers (hence 'deep') to analyze various factors of data. Think of it as concentric circles: Deep Learning is a subset of Machine Learning, which is a subset of AI.",
    keywords: ["ai", "ml", "deep learning", "machine learning", "neural networks", "difference"],
    category: "ai-concepts",
  },
  {
    id: "ai-3",
    question: "How do large language models work?",
    answer:
      "Large Language Models (LLMs) like GPT-4 work by using transformer neural networks trained on vast amounts of text data. They learn patterns and relationships between words and concepts through a process called unsupervised learning. During training, they predict the next word in a sequence, which helps them understand language structure. When you prompt an LLM, it uses this learned knowledge to generate text that statistically follows from your input. The model doesn't truly 'understand' content like humans do, but rather predicts what text should come next based on patterns it has observed in its training data.",
    keywords: ["llm", "large language model", "gpt", "transformer", "neural network", "nlp"],
    category: "ai-concepts",
  },
  {
    id: "ai-4",
    question: "What are AI hallucinations?",
    answer:
      "AI hallucinations are instances where AI models (particularly large language models) generate information that sounds plausible but is factually incorrect or completely fabricated. These occur because the models are predicting what text should come next based on patterns in their training data, not because they understand truth or facts. Hallucinations can include made-up references, non-existent facts, or false attributions. They're particularly problematic in contexts requiring factual accuracy. Techniques like RAG (Retrieval-Augmented Generation) help reduce hallucinations by grounding responses in verified information sources.",
    keywords: ["hallucination", "fabrication", "incorrect", "false", "made-up", "confabulation"],
    category: "ai-concepts",
  },
  {
    id: "ai-5",
    question: "What is prompt engineering?",
    answer:
      "Prompt engineering is the practice of designing and refining inputs to AI systems (particularly large language models) to get more accurate, relevant, and useful outputs. It involves crafting prompts with specific instructions, context, examples, and constraints to guide the AI's responses. Effective prompt engineering can dramatically improve an AI's performance on tasks without changing the underlying model. Techniques include few-shot prompting (providing examples), chain-of-thought prompting (asking the AI to explain its reasoning step-by-step), and role prompting (assigning the AI a specific persona or role). As AI systems evolve, prompt engineering has become a valuable skill for developers and users alike.",
    keywords: ["prompt", "engineering", "prompt design", "instruction", "context", "few-shot"],
    category: "ai-concepts",
  },

  // Web Development - Next.js
  {
    id: "nextjs-1",
    question: "How do I connect to a database in Next.js?",
    answer:
      "To connect to a database in Next.js, you can use libraries like Prisma, Drizzle, or direct database clients. For Neon PostgreSQL specifically, use the @neondatabase/serverless package and create a connection with `const sql = neon(process.env.DATABASE_URL)`. Make sure your DATABASE_URL is properly set in your environment variables. For Prisma, you would set up a schema.prisma file, define your models, and use PrismaClient to interact with your database. Remember that in the App Router, database connections should typically be made in Server Components or Route Handlers for security.",
    keywords: ["database", "connect", "neon", "postgresql", "prisma", "drizzle"],
    category: "nextjs",
  },
  {
    id: "nextjs-2",
    question: "What are the best practices for API routes in Next.js?",
    answer:
      "Best practices for Next.js API routes include: 1) Use the App Router's Route Handlers for better performance, 2) Implement proper error handling with try/catch blocks, 3) Validate input data before processing, 4) Use appropriate HTTP methods and status codes, 5) Implement rate limiting for public APIs, 6) Keep handlers focused on a single responsibility, 7) Use middleware for cross-cutting concerns like authentication, 8) Cache responses when appropriate using the Next.js cache or Response objects, 9) Structure routes logically in your file system, and 10) Use TypeScript for better type safety and developer experience.",
    keywords: ["api", "routes", "best practices", "nextjs", "route handlers", "app router"],
    category: "nextjs",
  },
  {
    id: "nextjs-3",
    question: "How do I implement authentication in Next.js?",
    answer:
      "For authentication in Next.js, you can use NextAuth.js (now Auth.js), which supports various providers like OAuth, email/password, and magic links. Install it with `npm install next-auth`, set up your providers in an auth config file, and implement the session provider in your layout. For API routes, you can protect them using the `getServerSession` function. With the App Router, you'll need to set up a route.ts file in app/api/auth/[...nextauth] and configure your providers. You can then access the session in Server Components with `getServerSession()` and in Client Components with the useSession hook. For custom authentication, you can also implement JWT-based auth using cookies or localStorage, but Auth.js handles most of the complexity for you.",
    keywords: ["authentication", "auth", "nextauth", "login", "oauth", "session"],
    category: "nextjs",
  },
  {
    id: "nextjs-4",
    question: "What is server-side rendering in Next.js?",
    answer:
      "Server-Side Rendering (SSR) is a rendering method where the HTML is generated on the server for each request. In Next.js, you can implement SSR by using Server Components (default in App Router) or by using getServerSideProps in the Pages Router. SSR improves SEO, provides faster First Contentful Paint, and works better for dynamic content that changes with each request. In the App Router, all components are Server Components by default, which means they render on the server unless explicitly marked with 'use client'. SSR is particularly useful for pages that need fresh data on each request or require access to server-only resources like databases or API keys. It differs from Static Site Generation (SSG), which pre-renders pages at build time.",
    keywords: ["ssr", "server-side rendering", "rendering", "server components", "getserversideprops"],
    category: "nextjs",
  },
  {
    id: "nextjs-5",
    question: "How do I optimize images in Next.js?",
    answer:
      "To optimize images in Next.js, use the built-in Image component from 'next/image'. This component automatically optimizes images by: 1) Serving WebP or AVIF formats when supported, 2) Resizing images to the appropriate size for each device, 3) Lazy loading images that are outside the viewport, and 4) Preventing layout shift with proper sizing. Use it like: `<Image src=\"/image.jpg\" alt=\"Description\" width={500} height={300} />`. For responsive images, you can use the 'fill' property with a parent container that has 'position: relative'. You can also configure image optimization in next.config.js, including domains for remote images, formats, and quality settings. For further optimization, consider using a CDN like Vercel's Image Optimization or Cloudinary.",
    keywords: ["image", "optimization", "next/image", "webp", "lazy loading", "responsive"],
    category: "nextjs",
  },

  // JavaScript & TypeScript
  {
    id: "js-1",
    question: "What are the differences between var, let, and const in JavaScript?",
    answer:
      "In JavaScript, `var`, `let`, and `const` are used for variable declarations but have important differences: `var` is function-scoped, hoisted to the top of its scope, can be redeclared and updated. It's considered outdated in modern JavaScript. `let` is block-scoped, not hoisted in the same way as var, can be updated but not redeclared in the same scope. `const` is block-scoped, not hoisted, cannot be updated or redeclared. The value is immutable, but for objects and arrays, the properties/elements can still be modified. Best practice is to use `const` by default, and only use `let` when you need to reassign a variable. Avoid `var` in modern code.",
    keywords: ["var", "let", "const", "variables", "scope", "hoisting", "javascript"],
    category: "javascript",
  },
  {
    id: "js-2",
    question: "How do Promises work in JavaScript?",
    answer:
      "Promises in JavaScript are objects representing the eventual completion or failure of an asynchronous operation. They have three states: pending, fulfilled, or rejected. Create a Promise with `new Promise((resolve, reject) => {...})` where you call resolve() with a result or reject() with an error. Use .then() to handle successful results, .catch() for errors, and .finally() for cleanup. Promises can be chained with multiple .then() calls, each returning a new Promise. For handling multiple Promises, use Promise.all() (waits for all to succeed), Promise.race() (waits for the first to settle), Promise.any() (waits for the first to succeed), or Promise.allSettled() (waits for all to settle regardless of success/failure). Async/await is syntactic sugar over Promises, making asynchronous code look more like synchronous code.",
    keywords: ["promise", "async", "await", "asynchronous", "then", "catch", "javascript"],
    category: "javascript",
  },
  {
    id: "js-3",
    question: "What are the benefits of using TypeScript over JavaScript?",
    answer:
      "TypeScript offers several benefits over JavaScript: 1) Static Type Checking: Catches type-related errors during development rather than at runtime, 2) Enhanced IDE Support: Better autocompletion, navigation, and refactoring tools, 3) Improved Code Documentation: Types serve as built-in documentation, 4) Safer Refactoring: The compiler catches errors when changing code, 5) Better Team Collaboration: Explicit interfaces make code intentions clearer, 6) Gradual Adoption: Can be added incrementally to JavaScript projects, 7) Modern JavaScript Features: Access to newer features that compile down to older JavaScript versions, 8) Enhanced Object-Oriented Programming: Classes, interfaces, and access modifiers, 9) Reduced Bugs: Studies show TypeScript can prevent ~15% of common bugs. TypeScript is a superset of JavaScript, so all valid JavaScript is also valid TypeScript.",
    keywords: ["typescript", "javascript", "types", "static typing", "interfaces", "benefits"],
    category: "typescript",
  },
  {
    id: "js-4",
    question: "How do I handle errors in async/await functions?",
    answer:
      "To handle errors in async/await functions, use try/catch blocks. For example: ```javascript\nasync function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetching data failed:', error);\n    // Handle the error appropriately\n    throw error; // Re-throw if you want calling code to handle it\n  } finally {\n    // Cleanup code that runs regardless of success/failure\n  }\n}``` Alternatively, you can handle errors at the call site: ```javascript\nfetchData().catch(error => {\n  console.error('Error caught at call site:', error);\n});``` For multiple async operations, you might want to use Promise.allSettled() to continue even if some operations fail.",
    keywords: ["async", "await", "error handling", "try catch", "promise", "exception"],
    category: "javascript",
  },
  {
    id: "js-5",
    question: "What are React hooks and how do they work?",
    answer:
      "React hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 to eliminate the need for class components. Core hooks include: useState (adds state to functional components), useEffect (handles side effects like data fetching, subscriptions, or DOM manipulation), useContext (accesses context without nesting), useReducer (manages complex state logic), useCallback (returns a memoized callback function), useMemo (returns a memoized value), and useRef (creates a mutable reference that persists across renders). Hooks must be called at the top level of components (not inside loops, conditions, or nested functions) and only from React function components or custom hooks. Custom hooks are functions that use other hooks and allow you to extract and reuse component logic.",
    keywords: ["react", "hooks", "usestate", "useeffect", "functional components", "custom hooks"],
    category: "react",
  },

  // CSS & Styling
  {
    id: "css-1",
    question: "What is the difference between Flexbox and Grid in CSS?",
    answer:
      "Flexbox and Grid are CSS layout systems with different strengths: Flexbox (one-dimensional) is best for laying out items in a single row or column, excellent for distributing space and aligning items, focuses on content flow and distribution, great for navigation bars, card layouts, centering items, and works from the content out. Grid (two-dimensional) is designed for two-dimensional layouts (rows AND columns), excellent for defining complex grid-based layouts, focuses on layout first, then placing items, perfect for overall page layouts, complex dashboard designs, and works from the layout in. They can be used together: Grid for the overall layout, and Flexbox for components within the grid. Both support responsive design through different approaches.",
    keywords: ["flexbox", "grid", "css", "layout", "responsive", "difference"],
    category: "css",
  },
  {
    id: "css-2",
    question: "How do CSS media queries work?",
    answer:
      "CSS media queries allow you to apply different styles based on device characteristics like screen size, resolution, or orientation. They use the @media rule followed by a condition. Common features to query include: width/height (min-width, max-width), orientation (portrait/landscape), resolution (for high-DPI screens), hover capability (hover: hover/none), and preferred color scheme (dark/light). You can combine conditions with 'and', 'not', and 'only'. For responsive design, use media queries with relative units (%, em, rem) and mobile-first approach (start with styles for small screens, then add media queries for larger screens).",
    keywords: ["media queries", "responsive", "css", "breakpoints", "mobile-first", "@media"],
    category: "css",
  },
  {
    id: "css-3",
    question: "What are the benefits of using Tailwind CSS?",
    answer:
      "Tailwind CSS offers several benefits: 1) Productivity: Write CSS directly in your HTML/JSX with utility classes, 2) Consistency: Predefined design system with spacing, colors, typography scales, 3) Responsive Design: Built-in responsive utilities (sm:, md:, lg: prefixes), 4) Customization: Highly configurable through tailwind.config.js, 5) Performance: Only generates CSS for classes you actually use (with PurgeCSS), 6) Dark Mode: Built-in dark mode support, 7) Developer Experience: Intellisense plugins for most editors, 8) Component Extraction: Use @apply to extract repeated utility patterns, 9) Design System Integration: Works well with design tokens and systems, 10) No Context Switching: Stay in your HTML/JSX files instead of switching to CSS. The main trade-off is HTML verbosity, but the productivity gains often outweigh this concern.",
    keywords: ["tailwind", "css", "utility classes", "responsive", "design system", "benefits"],
    category: "css",
  },
  {
    id: "css-4",
    question: "How do CSS animations and transitions differ?",
    answer:
      "CSS transitions and animations differ in complexity and control: Transitions are simple, from state A to state B only, triggered by state changes (hover, focus, class changes), defined with transition property, limited to start and end states, have simpler syntax, example: `transition: opacity 0.3s ease;`. Animations are complex, can have multiple keyframes, run automatically or on triggers, defined with @keyframes and animation property, can loop, alternate, and have multiple steps, have more powerful but complex syntax, example: `animation: fadeIn 1s ease forwards;`. Use transitions for simple state changes (hover effects, showing/hiding elements) and animations for more complex, multi-step animations or animations that need to run automatically.",
    keywords: ["animation", "transition", "keyframes", "css", "effects", "difference"],
    category: "css",
  },
  {
    id: "css-5",
    question: "What are CSS variables and how do you use them?",
    answer:
      "CSS variables (officially called custom properties) allow you to store and reuse values throughout your stylesheet. They're defined with a double-dash prefix and accessed with the var() function. Benefits include: 1) Centralized values for easier updates, 2) Scope to specific elements or globally in :root, 3) Can be modified with JavaScript, 4) Can be changed in media queries, 5) Can reference other variables. They cascade and inherit like other CSS properties. For browser support, you can provide fallbacks: `var(--primary-color, #default)`.",
    keywords: ["css variables", "custom properties", "var()", ":root", "theming", "dynamic css"],
    category: "css",
  },

  // Databases & Backend
  {
    id: "db-1",
    question: "What's the difference between SQL and NoSQL databases?",
    answer:
      "SQL and NoSQL databases differ in several key ways: SQL Databases are structured data in tables with predefined schemas, have relationships between tables (foreign keys), support ACID transactions (Atomicity, Consistency, Isolation, Durability), use vertical scaling (more powerful hardware), examples include PostgreSQL, MySQL, SQLite, and are best for complex queries, transactions, data integrity. NoSQL Databases have flexible schemas (document, key-value, column-family, graph), are typically schema-less or schema-flexible, use horizontal scaling (distributed across servers), are eventually consistent (though many now offer ACID), examples include MongoDB, Redis, Cassandra, Neo4j, and are best for rapid development, large scale, unstructured data. The choice depends on your data structure, scaling needs, consistency requirements, and development speed priorities.",
    keywords: ["sql", "nosql", "database", "relational", "document", "difference"],
    category: "databases",
  },
  {
    id: "db-2",
    question: "How do database indexes work and when should you use them?",
    answer:
      "Database indexes are data structures that improve the speed of data retrieval operations by creating efficient lookup paths to data. They work similarly to a book's index, allowing the database to find data without scanning the entire table. How they work: Store a sorted copy of selected columns, use B-tree, hash, or other data structures, trade faster reads for slower writes. When to use indexes: Columns frequently used in WHERE clauses, columns used in JOIN operations, columns used in ORDER BY or GROUP BY, unique constraints and primary keys. When to avoid indexes: Small tables where full scans are fast, columns with low cardinality (few unique values), tables with frequent large batch updates/inserts, columns rarely used in queries. Best practices include indexing only what's necessary, considering composite indexes for multi-column queries, and regularly analyzing query performance.",
    keywords: ["index", "database", "performance", "query", "b-tree", "optimization"],
    category: "databases",
  },
  {
    id: "db-3",
    question: "What are database transactions and ACID properties?",
    answer:
      "Database transactions are units of work that are executed as a single, indivisible operation. They ensure data integrity by following ACID properties: A - Atomicity: A transaction is all or nothing. If any part fails, the entire transaction is rolled back. C - Consistency: A transaction brings the database from one valid state to another, maintaining all predefined rules and constraints. I - Isolation: Concurrent transactions execute as if they were sequential, preventing interference between transactions. D - Durability: Once a transaction is committed, it remains so even in case of system failure. Transactions are implemented using BEGIN, COMMIT, and ROLLBACK statements. Isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) control the trade-off between consistency and performance. Proper transaction management is crucial for applications with concurrent users or complex data operations.",
    keywords: ["transaction", "acid", "atomicity", "consistency", "isolation", "durability"],
    category: "databases",
  },
  {
    id: "db-4",
    question: "What is an ORM and what are its advantages and disadvantages?",
    answer:
      "An Object-Relational Mapper (ORM) is a programming technique that converts data between incompatible type systems in object-oriented programming languages and relational databases. Advantages: Productivity (write database operations in your programming language), abstraction (hide SQL complexity and database-specific code), type safety (use language's type system for database interactions), migration tools (manage schema changes and versioning), security (protection against SQL injection), cross-database support (switch database providers with minimal code changes). Disadvantages: Performance overhead (generated SQL may not be optimized), learning curve (understanding ORM-specific concepts and APIs), complex queries (difficult to express very complex queries), abstraction leakage (database concepts still leak through abstraction), over-fetching (may retrieve more data than needed). Popular ORMs include Prisma and Drizzle for Node.js, Hibernate for Java, SQLAlchemy for Python, and ActiveRecord for Ruby. The choice to use an ORM depends on project complexity, performance requirements, and team expertise.",
    keywords: ["orm", "object-relational mapper", "database", "prisma", "drizzle", "abstraction"],
    category: "databases",
  },
  {
    id: "db-5",
    question: "What is database normalization and when should you denormalize?",
    answer:
      "Database normalization is the process of structuring a relational database to reduce data redundancy and improve data integrity. It involves dividing large tables into smaller ones and defining relationships between them. Normalization Forms: 1) 1NF: Eliminate duplicative columns, create separate tables for related data, 2) 2NF: Meet 1NF requirements and remove partial dependencies, 3) 3NF: Meet 2NF requirements and remove transitive dependencies, 4) BCNF/4NF/5NF: Further refinements for specific cases. Benefits of normalization: Reduced data redundancy, improved data integrity, smaller table sizes, more flexible database design. Denormalization is the process of adding redundant data to improve read performance. Consider denormalizing when: Read performance is critical, queries frequently join many tables, the application is read-heavy with few updates, calculated values are frequently needed. Modern approaches often use a mix: normalized core tables with denormalized views or materialized views for specific read patterns.",
    keywords: ["normalization", "denormalization", "database design", "redundancy", "data integrity", "performance"],
    category: "databases",
  },

  // Security
  {
    id: "sec-1",
    question: "What are common web security vulnerabilities and how do you prevent them?",
    answer:
      "Common web security vulnerabilities and their preventions include: 1) Cross-Site Scripting (XSS) - Prevention: Escape/encode output, use Content-Security-Policy, sanitize inputs. 2) SQL Injection - Prevention: Use parameterized queries, ORMs, input validation. 3) Cross-Site Request Forgery (CSRF) - Prevention: CSRF tokens, SameSite cookies, verify origin headers. 4) Broken Authentication - Prevention: Strong password policies, MFA, secure session management. 5) Sensitive Data Exposure - Prevention: Encrypt sensitive data, proper HTTPS implementation, secure headers. 6) XML External Entities (XXE) - Prevention: Disable external entities in XML parsers. 7) Broken Access Control - Prevention: Principle of least privilege, robust authorization checks. 8) Security Misconfiguration - Prevention: Hardened configurations, security headers, remove defaults. 9) Insecure Deserialization - Prevention: Validate serialized data, prefer safer formats like JSON. 10) Using Components with Known Vulnerabilities - Prevention: Regular dependency updates, vulnerability scanning. Implement security headers, keep dependencies updated, conduct security audits, and follow the OWASP Top 10 guidelines.",
    keywords: ["security", "vulnerability", "xss", "sql injection", "csrf", "owasp"],
    category: "security",
  },
  {
    id: "sec-2",
    question: "How does HTTPS work and why is it important?",
    answer:
      "HTTPS (HTTP Secure) works by encrypting HTTP communications using TLS (Transport Layer Security) or its predecessor SSL. The process works as follows: 1) Handshake: Client and server establish a secure connection - Server presents its SSL/TLS certificate, Client verifies the certificate with a Certificate Authority, They negotiate encryption algorithms and exchange keys. 2) Encrypted Communication: All data is encrypted before transmission - Uses symmetric encryption for data (faster), Uses asymmetric encryption for key exchange (more secure). HTTPS is important because it provides: Confidentiality (prevents eavesdropping on sensitive data), Integrity (ensures data hasn't been modified in transit), Authentication (verifies you're connected to the legitimate website), SEO Benefits (Google favors HTTPS sites in rankings), Browser Trust (modern browsers mark HTTP sites as 'Not Secure'), and Features (some modern web features only work with HTTPS). Implement HTTPS with a valid certificate (often free via Let's Encrypt), proper configuration, and HSTS headers for additional security.",
    keywords: ["https", "ssl", "tls", "encryption", "certificate", "security"],
    category: "security",
  },
  {
    id: "sec-3",
    question: "What is JWT authentication and how does it work?",
    answer:
      "JWT (JSON Web Token) authentication is a stateless authentication mechanism that works by creating encoded tokens containing user information and signatures. How it works: 1) User logs in with credentials, 2) Server validates credentials and creates a JWT containing: Header (token type and signing algorithm), Payload (user data and metadata/claims), and Signature (cryptographically signed with a secret key), 3) Server sends JWT to client, 4) Client stores JWT (localStorage, cookies, etc.), 5) Client sends JWT with subsequent requests, 6) Server validates the signature and processes the request. Advantages: Stateless (no session storage needed on server), Scalable (works well with distributed systems), Cross-domain (can be used across different domains), Rich in information (can contain user roles, permissions). Considerations: Store sensitive JWTs in HttpOnly cookies to prevent XSS, keep tokens short-lived and implement refresh token rotation, don't store sensitive data in payload (it's base64 encoded, not encrypted), implement proper token invalidation strategy, and use strong signing keys and algorithms (like RS256). JWT is widely used in modern web applications, especially SPAs and microservices.",
    keywords: ["jwt", "authentication", "token", "stateless", "json web token", "authorization"],
    category: "security",
  },
  {
    id: "sec-4",
    question: "What is CORS and how does it work?",
    answer:
      "Cross-Origin Resource Sharing (CORS) is a security feature implemented by browsers that restricts web pages from making requests to a different domain than the one that served the original page. How CORS works: 1) Browser makes a request to a different origin, 2) Browser automatically adds Origin header with the requesting site's origin, 3) Server checks if the Origin is allowed to access the resource, 4) Server responds with Access-Control-Allow-Origin header, 5) Browser allows or blocks the response based on this header. For non-simple requests (like PUT/DELETE or with custom headers), browsers send a preflight OPTIONS request first to check permissions. CORS headers include: Access-Control-Allow-Origin (which origins can access), Access-Control-Allow-Methods (allowed HTTP methods), Access-Control-Allow-Headers (allowed request headers), Access-Control-Allow-Credentials (whether cookies can be included), and Access-Control-Max-Age (how long preflight results can be cached). CORS is configured on the server side. In Next.js, you can configure CORS in API routes using middleware or the cors npm package. CORS doesn't protect your server from attacks; it protects users from malicious sites accessing your API with their credentials.",
    keywords: ["cors", "cross-origin", "same-origin policy", "preflight", "access-control", "security"],
    category: "security",
  },
  {
    id: "sec-5",
    question: "What are best practices for storing passwords?",
    answer:
      "Best practices for storing passwords include: 1) Never store passwords in plaintext, 2) Use strong, slow hashing algorithms specifically designed for passwords: Argon2 (preferred, winner of the Password Hashing Competition), bcrypt (widely used, automatically handles salting), PBKDF2 (FIPS-compliant environments), 3) Include unique salts for each password hash to prevent rainbow table attacks, 4) Use sufficient work factors/iterations to make brute force attacks computationally expensive: adjust work factors as hardware improves, balance security with login performance, 5) Implement additional security measures: rate limiting login attempts, multi-factor authentication (MFA), account lockout policies, monitoring for suspicious login patterns, 6) Consider using a trusted authentication library or service rather than implementing password storage yourself, 7) Have a secure password reset process that doesn't expose or email passwords, 8) Validate passwords against common password lists and enforce strong password policies. When implementing password hashing in Node.js, use the built-in crypto module for PBKDF2 or libraries like bcrypt, argon2, or scrypt-kdf. Always keep your hashing implementation up to date with current security standards.",
    keywords: ["password", "hashing", "salt", "bcrypt", "argon2", "security", "authentication"],
    category: "security",
  },

  // Performance & Optimization
  {
    id: "perf-1",
    question: "How can I optimize website loading performance?",
    answer:
      "To optimize website loading performance: 1) Minimize HTTP requests: Bundle CSS/JS files, use CSS sprites or icon fonts, implement lazy loading for images and components. 2) Optimize assets: Compress images (WebP, AVIF formats), minify CSS, JavaScript, and HTML, use proper image dimensions and responsive images. 3) Leverage browser caching: Set appropriate cache headers, use versioned file names for cache busting. 4) Optimize delivery: Enable GZIP/Brotli compression, use a CDN for static assets, implement HTTP/2 or HTTP/3. 5) Critical rendering path: Inline critical CSS, defer non-critical JavaScript, eliminate render-blocking resources. 6) Code optimization: Use code splitting and tree shaking, implement virtualization for long lists, optimize JavaScript execution. 7) Server optimization: Implement server-side caching, use edge functions for dynamic content, optimize database queries. Measure performance using tools like Lighthouse, WebPageTest, or Chrome DevTools, and focus on Core Web Vitals (LCP, FID/INP, CLS) for the best user experience.",
    keywords: ["performance", "optimization", "loading", "speed", "web vitals", "lighthouse"],
    category: "performance",
  },
  {
    id: "perf-2",
    question: "What are Core Web Vitals and why are they important?",
    answer:
      "Core Web Vitals are a set of specific metrics that Google considers important for user experience: 1) Largest Contentful Paint (LCP): Measures loading performance - Good: ≤ 2.5 seconds, Needs Improvement: 2.5-4 seconds, Poor: > 4 seconds, Optimize with: Image optimization, server response times, render-blocking resources. 2) First Input Delay (FID) / Interaction to Next Paint (INP): Measures interactivity and responsiveness - FID Good: ≤ 100ms (being replaced by INP), INP Good: ≤ 200ms, Optimize with: Breaking up long tasks, reducing JavaScript execution time. 3) Cumulative Layout Shift (CLS): Measures visual stability - Good: ≤ 0.1, Needs Improvement: 0.1-0.25, Poor: > 0.25, Optimize with: Setting size attributes on images/videos, avoiding dynamic content insertion above existing content. Core Web Vitals are important because: They directly impact user experience, they're used as ranking factors in Google Search, they provide standardized metrics for performance, they focus on real-user experience rather than technical metrics. Measure Core Web Vitals using tools like Lighthouse, PageSpeed Insights, Chrome UX Report, or the web-vitals JavaScript library.",
    keywords: ["core web vitals", "lcp", "fid", "inp", "cls", "performance", "seo"],
    category: "performance",
  },
  {
    id: "perf-3",
    question: "What is code splitting and how does it improve performance?",
    answer:
      "Code splitting is a technique that breaks your JavaScript bundle into smaller chunks that can be loaded on demand, rather than loading the entire application code upfront. How it works: 1) Identifies code that isn't needed immediately, 2) Splits it into separate bundles, 3) Loads these bundles only when required. Implementation methods: Route-based splitting (load code for each route separately), component-based splitting (load components on demand), library-based splitting (separate vendor code from application code). In React/Next.js, implement with: dynamic imports (`import('./Component')`), React.lazy() and Suspense, Next.js automatic code splitting by pages/routes. Benefits: Reduced initial load time and bundle size, faster time to interactive, better caching (unchanged chunks remain cached), improved performance on low-end devices and slow networks, more efficient resource utilization. Considerations: Add loading states for dynamically imported components, balance between too many small chunks (HTTP request overhead) and too few large chunks, preload critical chunks that will be needed soon. Code splitting is particularly valuable for large applications where users typically only use a subset of features per session.",
    keywords: ["code splitting", "lazy loading", "dynamic import", "bundle size", "performance", "webpack"],
    category: "performance",
  },
  {
    id: "perf-4",
    question: "How do you optimize React application performance?",
    answer:
      "To optimize React application performance: 1) Component rendering optimization: Use React.memo for functional components, implement shouldComponentUpdate for class components, use PureComponent for simple prop comparisons, avoid anonymous functions in renders. 2) State management: Keep state as local as possible, use appropriate state management (Context, Redux, Zustand), normalize complex state structures. 3) Rendering strategies: Implement virtualization for long lists (react-window, react-virtualized), use pagination instead of rendering large datasets, implement infinite scrolling for large lists. 4) Code optimization: Code splitting with React.lazy and Suspense, tree shaking to eliminate dead code, optimize images and assets. 5) Hooks optimization: Use useCallback for function references, use useMemo for expensive calculations, optimize dependency arrays. 6) Development practices: Use React DevTools Profiler to identify performance issues, implement performance monitoring in production, set up bundle analysis. 7) Server-side considerations: Implement server-side rendering or static generation, use edge functions for dynamic content, optimize API responses. Focus on measuring real user metrics and optimizing the critical rendering path. Remember that premature optimization can lead to more complex code, so profile first to identify actual bottlenecks.",
    keywords: ["react", "performance", "optimization", "memo", "useMemo", "code splitting", "rendering"],
    category: "performance",
  },
  {
    id: "perf-5",
    question: "What are service workers and how do they improve performance?",
    answer:
      "Service workers are JavaScript files that run in the background, separate from the web page, enabling features that don't need a web page or user interaction. How they improve performance: 1) Offline capabilities: Cache assets and API responses, provide offline fallback content, enable full offline functionality. 2) Network strategies: Cache-first (load from cache, update in background), network-first (try network, fall back to cache), stale-while-revalidate (serve cached version, update in background). 3) Performance benefits: Faster subsequent page loads, reduced server load, lower bandwidth usage, improved reliability on flaky connections. 4) Advanced features: Background sync for deferred actions, push notifications, content prefetching. Implementation approaches: Manual registration and cache management, using Workbox library (recommended), PWA frameworks and tools. Considerations: Service workers only work on HTTPS (except localhost), complex lifecycle management, debugging can be challenging, need update strategies to avoid serving stale content. Service workers are fundamental to Progressive Web Apps (PWAs) and can significantly improve perceived performance and reliability, especially on mobile devices or unreliable networks.",
    keywords: ["service worker", "pwa", "offline", "caching", "workbox", "performance"],
    category: "performance",
  },
]

