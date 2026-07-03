# Implementation Plan

## Project Type
Full-stack web app — React SPA (client) + Node.js/Express REST API (api) + MySQL database.

## Phase 1 — Backend API (Complete)
- [x] Express server with CORS, cookie-parser, multer setup
- [x] MySQL connection via `connect.js`
- [x] Auth routes: register, login, logout (JWT + bcrypt)
- [x] Users routes: getUser, updateUser
- [x] Posts routes: getPosts (feed + profile), addPost, deletePost
- [x] Comments routes: getComments, addComment, deleteComment
- [x] Likes routes: getLikes, addLike, deleteLike
- [x] Relationships routes: getRelationships, addRelationship, deleteRelationship
- [x] Stories routes: getStories, addStory, deleteStory
- [x] File upload endpoint: `/api/upload` (Multer → `client/public/upload/`)

## Phase 2 — Frontend (Complete)
- [x] React Router v6 setup with protected routes
- [x] AuthContext with localStorage persistence
- [x] DarkModeContext with theme class toggle
- [x] Login and Register pages
- [x] Home page: Stories + Share + Posts feed
- [x] Profile page: cover/profile pic, user info, follow button, user posts
- [x] Navbar: logo, search input, dark mode toggle, user controls
- [x] LeftBar: user avatar, nav shortcuts, recent users
- [x] RightBar: stories, online friends, latest activity
- [x] Post component: like/unlike, comment toggle, delete
- [x] Share component: text + image upload + create post
- [x] Comments component: list + add comment
- [x] Update modal: edit profile fields + profile/cover pic
- [x] Stories component: horizontal scroll

## Phase 3 — Future Improvements
- [ ] Move JWT secret to `process.env.JWT_SECRET`
- [ ] Replace `mysql` v1 with `mysql2` consistently
- [ ] Add pagination to feed (cursor-based or offset)
- [ ] Add story creation UI (currently view-only on frontend)
- [ ] Cloud image storage (Cloudinary / S3) instead of local `public/upload/`
- [ ] Add WebSocket layer for real-time likes/comments
- [ ] Add search functionality
- [ ] Password reset / forgot password flow

## Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, React Query, SCSS, Axios |
| Backend | Node.js + Express 4 (ESM) |
| Database | MySQL |
| Auth | JWT (httpOnly cookie) + bcryptjs |
| File uploads | Multer |

## How to Run
```bash
# Start API
cd api && npm start   # runs on port 8800

# Start Client
cd client && npm start  # Vite dev server on port 5173
```

## Environment Setup
Create `api/.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=social
PORT=8800
CORS_ORIGIN=http://localhost:5173
```
