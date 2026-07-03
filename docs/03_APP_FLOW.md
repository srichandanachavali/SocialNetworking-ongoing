# App Flow — Navigation & User Journey Map

## Pages / Screens
| Route | Component | Auth Required |
|-------|-----------|--------------|
| `/login` | Login.jsx | No |
| `/register` | Register.jsx | No |
| `/` | Home.jsx (inside Layout) | Yes |
| `/profile/:id` | Profile.jsx (inside Layout) | Yes |

## Navigation Structure
```
/login  →  /register (link)
/login  →  / (after successful login)
/       →  /profile/:id (click on user name/avatar)
/profile/:id  →  / (navbar home link)
```

## Entry Point
`npm start` (Vite dev server) → `/login` if not authenticated, `/` if `currentUser` in localStorage.

## Auth Flow
1. Visit any protected route → `ProtectedRoute` checks `currentUser` context
2. If null → redirect to `/login`
3. `POST /api/auth/login` → server sets httpOnly `accessToken` cookie
4. `currentUser` saved to `localStorage` via `AuthContext`
5. `POST /api/auth/logout` → cookie cleared, `currentUser` set to null, redirect to `/login`

## Core User Journey 1 — New User Registration
1. Visit `/register`, fill name, username, email, password, confirm password
2. `POST /api/auth/register` → 200 → redirect to `/login`

## Core User Journey 2 — Home Feed
1. Login → redirected to `/`
2. Layout renders: Navbar (top) + LeftBar (left) + Feed (center) + RightBar (right)
3. `Posts` component fetches `GET /api/posts` with `userId=undefined` → returns feed posts (followed users + self)
4. Each `Post` shows: profile pic, name, timestamp, content, image, like count, comment count
5. Clicking like → `POST /api/likes` / `DELETE /api/likes?postId=X`
6. Clicking comments → `Comments` component loads inline, `GET /api/comments?postId=X`
7. `Share` component at top of feed → fills desc + optional image → `POST /api/posts`

## Core User Journey 3 — Profile View & Edit
1. Click on any user's name/pic → navigate to `/profile/:id`
2. Profile shows cover pic, profile pic, name, city, website, follower/following counts
3. Own profile: "Update" button → opens `Update` modal → `PUT /api/users`
4. Other user: "Follow"/"Following" button → `POST /api/relationships` / `DELETE /api/relationships`
5. Posts grid below shows only that user's posts via `GET /api/posts?userId=X`

## Empty States
- Home feed with no followed users: shows only own posts
- Profile with no posts: empty posts section
- No stories: Stories bar is empty

## Error States
- Login with wrong credentials: API returns 400, displayed as alert
- Unauthenticated API call: 401 response, user re-directed to login
