# 🎥 RelayIt

**Professional Video Conferencing Platform** - Connect, Collaborate, and Communicate Seamlessly

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Stream](https://img.shields.io/badge/Stream-Video_SDK-FF6B35?style=for-the-badge)](https://getstream.io/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge)](https://clerk.com/)

---

## 🌟 Overview

RelayIt is a modern, feature-rich video conferencing application built with cutting-edge technologies. Designed for seamless real-time communication, it offers enterprise-grade video calling capabilities with an intuitive user interface and robust security features.

---

## ✨ Features

### 🚀 **Core Functionality**

- **Instant Meetings** - Start video calls immediately with one click
- **Scheduled Meetings** - Plan and organize future meetings with date/time selection
- **Personal Room** - Dedicated meeting space for each user
- **Join via Link** - Easy meeting access through shareable links
- **Meeting Recordings** - Record and review past meetings

### 🎛️ **Advanced Meeting Controls**

- **Multiple Layout Options**
  - Grid Layout - Equal participant view
  - Speaker Layout - Focus on active speaker
  - Flexible positioning (left/right speaker view)
- **Interactive Features**
  - Real-time participant list
  - Call statistics and performance metrics
  - Comprehensive call controls (mute, camera, screen share)
  - Meeting end/leave functionality

### 🔐 **Security & Authentication**

- **Clerk Integration** - Secure user authentication and management
- **Protected Routes** - Middleware-based route protection
- **Stream Security** - Enterprise-grade video infrastructure
- **User Permissions** - Role-based access control

### 🎨 **User Experience**

- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Dark Theme** - Modern dark UI with glassmorphism effects
- **Real-time Notifications** - Toast notifications for user feedback
- **Intuitive Navigation** - Clean sidebar and navigation structure

---

## 🛠️ Technology Stack

### **Frontend**

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 4.0 with custom theme
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React icons

### **Backend & Services**

- **Video Infrastructure**: Stream Video SDK
- **Authentication**: Clerk
- **Real-time Communication**: Stream.io
- **State Management**: React hooks and context

### **Development Tools**

- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **Build Tool**: Next.js with Turbopack
- **Styling**: PostCSS with Tailwind

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Stream.io account
- Clerk account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AlphaBeast97/RelayIt.git
   cd RelayIt/relay
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the relay directory:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Stream Video
   NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
   STREAM_SECRET_KEY=your_stream_secret_key

   # Application URL
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
relay/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── sign-in/       # Sign in page
│   │   │   └── sign-up/       # Sign up page
│   │   ├── (root)/            # Protected application routes
│   │   │   ├── (home)/        # Home dashboard
│   │   │   │   ├── personal-room/  # Personal meeting room
│   │   │   │   ├── previous/       # Past meetings
│   │   │   │   ├── recordings/     # Meeting recordings
│   │   │   │   └── upcoming/       # Scheduled meetings
│   │   │   └── meeting/       # Active meeting room
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   ├── CallList.tsx      # Meeting list component
│   │   ├── MeetingRoom.tsx   # Main meeting interface
│   │   ├── MeetingSetup.tsx  # Pre-meeting setup
│   │   └── ...               # Other components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── providers/            # Context providers
│   ├── actions/              # Server actions
│   ├── constants/            # Application constants
│   └── middleware.ts         # Route protection
├── public/                   # Static assets
│   ├── icons/               # SVG icons
│   └── images/              # Image assets
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## 🎯 Usage Guide

### **Starting a Meeting**

1. Navigate to the dashboard
2. Click "New Meeting" for instant meetings
3. Or click "Schedule Meeting" to plan future meetings
4. Configure meeting settings and invite participants

### **Joining a Meeting**

1. Click "Join Meeting" on the dashboard
2. Paste the meeting link
3. Configure your camera and microphone
4. Join the meeting room

### **Meeting Controls**

- **Layout**: Switch between grid and speaker views
- **Participants**: View and manage meeting participants
- **Settings**: Adjust audio/video preferences
- **Recording**: Start/stop meeting recordings
- **Screen Share**: Share your screen with participants

---

## 🔧 Configuration

### **Clerk Setup**

1. Create a Clerk application
2. Configure sign-in/sign-up settings
3. Set up OAuth providers (optional)
4. Add your keys to environment variables

### **Stream.io Setup**

1. Create a Stream application
2. Get your API key and secret
3. Configure video calling settings
4. Add credentials to environment variables

### **Customization**

- Modify theme colors in `globals.css`
- Update component styles in respective files
- Configure meeting layouts in `MeetingRoom.tsx`
- Customize authentication flow in Clerk dashboard

---

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint checks
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**

- Follow TypeScript best practices
- Use meaningful component and variable names
- Write responsive CSS with Tailwind
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Troubleshooting

### **Common Issues**

**Authentication Problems**

- Verify Clerk environment variables
- Check Clerk dashboard configuration
- Ensure correct redirect URLs

**Video Call Issues**

- Verify Stream.io credentials
- Check browser permissions for camera/microphone
- Test network connectivity

**Build Errors**

- Clear `.next` folder and rebuild
- Verify all dependencies are installed
- Check TypeScript configuration

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Stream.io** - For robust video infrastructure
- **Clerk** - For seamless authentication
- **Vercel** - For deployment platform
- **Tailwind CSS** - For utility-first styling

---

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

**Made with ❤️ by the RelayIt Team**

---

_Building the future of remote communication, one meeting at a time._
