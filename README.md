# CCTV Manager

A modern CCTV surveillance management system built with Next.js, featuring real-time incident detection, camera monitoring, and intelligent threat analysis.

## 🔮 If I Had More Time...

### Security & Authentication

Since I was out of town, I couldn’t fully dedicate myself to this project. I built it in around 4 hours while traveling on a train. Initially, I wasn’t planning to submit the assignment at all, knowing I wouldn’t make it home in time to properly complete it—but I figured something is better than nothing.

If I had more time, I would have improved the UI, made the timeline fully functional, mapped incidents to flags on the timeline, and added multi-user and admin support. I was also considering integrating Firebase authentication and building it into a full-fledged, polished platform.

I understand this might not meet the full expectations, and I may not pass, but if you'd like to see the kind of work I usually do, feel free to check out my portfolio at https://yashk194.vercel.app. I also independently built Labro.in, a real production website with a cloud database, authentication, and over 100 active users.

Thanks for taking the time to review this!

- [ ] Implement user authentication and role-based access control
- [ ] Add JWT token management and session security
- [ ] Implement camera access permissions and user groups
- [ ] Add audit logging for all user actions

### Real-time Features

- [ ] WebSocket integration for live incident notifications
- [ ] Real-time camera status monitoring
- [ ] Push notifications for critical incidents
- [ ] Live streaming integration with WebRTC

### Advanced Analytics

- [ ] Machine learning integration for automated threat detection
- [ ] Facial recognition system integration
- [ ] Movement pattern analysis and anomaly detection
- [ ] Predictive analytics for incident prevention
- [ ] Heat maps and traffic flow analysis

### Enhanced Video Management

- [ ] Video compression and optimization
- [ ] Cloud storage integration (AWS S3, Google Cloud)
- [ ] Video archiving and retention policies
- [ ] Multi-camera synchronization and timeline view
- [ ] Video export and sharing capabilities

### Mobile & Accessibility

- [ ] Progressive Web App (PWA) for mobile access
- [ ] React Native mobile application
- [ ] Offline capability and sync
- [ ] Accessibility improvements (WCAG 2.1 compliance)
- [ ] Multi-language support

### DevOps & Monitoring

- [ ] Docker containerization with multi-stage builds
- [ ] Kubernetes deployment configurations
- [ ] Application monitoring with metrics and logging
- [ ] Automated testing suite (unit, integration, e2e)
- [ ] CI/CD pipeline with GitHub Actions

### Database & Performance

- [ ] PostgreSQL migration for production scalability
- [ ] Database connection pooling
- [ ] Caching layer with Redis
- [ ] Search functionality with Elasticsearch
- [ ] Database backup and disaster recovery

### Advanced Features

- [ ] Camera configuration management
- [ ] Scheduled recording and motion detection
- [ ] Integration with external security systems
- [ ] API rate limiting and throttling
- [ ] Webhook integrations for third-party systems

## 🚀 Deployment Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- SQLite database support

### Local Development Setup

1. **Clone and navigate to the project**

   ```bash
   cd cctv-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # Seed the database (optional)
   npx prisma db seed
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Deployment

#### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

#### Option 2: Docker Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

#### Option 3: Manual Server Deployment

1. Build and export the application
2. Set up a reverse proxy (nginx)
3. Configure process manager (PM2)
4. Set up database connection for production

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## 🛠️ Tech Decisions

### Frontend Architecture

- **Next.js 15.4.3**: Latest version with App Router for modern React features and server-side rendering
- **React 19.1.0**: Latest React with concurrent features and improved performance
- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development and consistent design
- **Lucide React**: Modern icon library for consistent iconography

### Backend & Database

- **Prisma ORM**: Type-safe database client with excellent TypeScript support and migration management
- **SQLite**: Lightweight, file-based database perfect for development and small-scale deployments
- **Next.js API Routes**: Serverless functions for backend logic, keeping the application full-stack

### State Management

- **React State**: Built-in useState and useEffect for component-level state management
- **Client-side rendering**: For real-time updates and interactive dashboard components

### Video Management

- **HTML5 Video**: Native video player with custom controls
- **Public folder**: Direct video serving from Next.js public directory
- **Video metadata**: Stored in database with file references

### UI/UX Design Decisions

- **Dark Theme**: Reduces eye strain during extended monitoring sessions
- **Responsive Grid Layout**: Adapts to different screen sizes and camera counts
- **Real-time Updates**: Live status indicators and incident notifications
- **Color-coded Alerts**: Visual priority system for different incident types

### Data Models

- **Camera**: Core entity with status flags and metadata
- **Video**: File references with recording timestamps
- **Incident**: Event logging with severity levels and types
- **Enum Types**: Predefined incident types and severity levels for consistency

### Performance Optimizations

- **Lazy Loading**: Components and videos loaded on demand
- **Database Indexing**: Optimized queries with proper relations
- **Static Assets**: Videos and images served efficiently through Next.js

## 📁 Project Structure

```
cctv-manager/
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma      # Database models
│   ├── migrations/        # Database migration files
│   └── seed.js           # Database seeding script
├── public/                # Static assets
│   └── videos/           # Video files
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── components/   # React components
│   │   └── globals.css   # Global styles
│   └── lib/              # Utility libraries
└── package.json          # Dependencies and scripts
```

## 🎯 Features

- **Multi-camera Dashboard**: Monitor multiple CCTV feeds simultaneously
- **Incident Detection**: Automated detection and logging of security incidents
- **Real-time Alerts**: Visual indicators for different threat levels
- **Video Playback**: Timeline-based video review with incident markers
- **Camera Management**: Add, configure, and monitor camera status
- **Incident History**: Comprehensive logging and review of all incidents
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
