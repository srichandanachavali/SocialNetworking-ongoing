# Product Requirements Document (PRD)

## Product Name
SocialNetworking-ongoing

## One-Line Summary
A full-stack Facebook-like social network where users can register, post, comment, like, follow friends, and view stories — with dark mode support.

## Problem Statement
Demonstrates a complete MERN-like social networking application (React + Node.js/Express + MySQL) with all core social features: authentication, user profiles, a social feed, interactions (likes/comments), friend relationships, and ephemeral stories.

## Target Users
- Developers learning full-stack social app architecture
- Portfolio project showcasing React + Express + MySQL integration

## Core Features
1. **Auth** — Register, Login, Logout (JWT cookie-based)
2. **Feed** — Home feed showing posts from followed users + own posts
3. **Posts** — Create text/image posts, delete own posts
4. **Comments** — Comment on any post (nested display)
5. **Likes** — Like/unlike posts
6. **Relationships** — Follow/unfollow users; friend suggestions in RightBar
7. **Stories** — View user stories in a horizontal carousel
8. **Profile** — View any user's posts and profile info; update own profile (name, city, website, profile pic, cover pic)
9. **Dark Mode** — Toggle dark/light theme persisted in context

## Out of Scope
- Real-time notifications or messaging (no WebSockets)
- Story creation (view only)
- Hashtags or search
- Media hosting service (images stored in `client/public/upload/`)

## Success Metrics
- Users can register, log in, post with image, comment, like, and follow within a single session
- Dark/light mode persists across navigation
- Profile updates reflect immediately after save
