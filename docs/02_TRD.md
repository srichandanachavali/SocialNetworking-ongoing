# Technical Requirements Document (TRD)

## Architecture Overview
Monorepo with two sub-apps: `api/` (Node.js/Express REST API) and `client/` (React SPA). MySQL relational database. No ORM — raw SQL queries via `mysql`/`mysql2` drivers.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, SCSS modules, React Query |
| Backend | Node.js + Express 4 (ESM modules) |
| Database | MySQL |
| Auth | JWT (jsonwebtoken) + bcryptjs, stored in httpOnly cookie |
| File Upload | Multer — saves to `client/public/upload/` |
| API Client | Axios with `withCredentials: true` |
| Dev runner | Nodemon |

## Directory Structure
```
api/
  index.js              — Express app, CORS, multer, route mounts
  connect.js            — MySQL connection (mysql package)
  controllers/
    auth.js             — register, login, logout
    user.js             — getUser, updateUser
    post.js             — getPosts, addPost, deletePost
    comment.js          — getComments, addComment, deleteComment
    like.js             — getLikes, addLike, deleteLike
    relationship.js     — getRelationships, addRelationship, deleteRelationship
    story.js            — getStories, addStory, deleteStory
  routes/
    auth.js | users.js | posts.js | comments.js | likes.js | relationships.js | stories.js

client/
  src/
    App.js              — router + protected route + dark mode wrapper
    context/
      authContext.js    — currentUser state (localStorage)
      darkModeContext.js
    pages/
      login/ | register/ | home/ | profile/
    components/
      navbar/ | leftBar/ | rightBar/ | post/ | posts/
      share/ | comments/ | stories/ | update/
```

## API Port
- API: `PORT` env var (default 8800)
- Client dev server: Vite default 5173

## Environment Variables (api/.env)
```
DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
PORT
CORS_ORIGIN
JWT_SECRET (currently hardcoded as "secretkey" — should be moved to env)
```

## Auth Flow
1. `POST /api/auth/register` → hashes password with bcrypt, inserts user row
2. `POST /api/auth/login` → verifies password, signs JWT, sets `accessToken` httpOnly cookie
3. All protected routes: `jwt.verify(req.cookies.accessToken, "secretkey")`
4. `POST /api/auth/logout` → clears cookie

## Known Technical Debt
- JWT secret hardcoded as `"secretkey"` in all controllers
- `mysql` (v1) used in `connect.js` while `mysql2` is also installed
- Images stored as local files in `client/public/upload/` — not suitable for multi-server deploys
- No pagination on feed queries
