# Backend Schema — Data Model & Auth Architecture

## Database
MySQL (raw SQL, no ORM). Connection via `mysql` package in `api/connect.js`.

## Tables

### `users`
```sql
id          INT AUTO_INCREMENT PRIMARY KEY
username    VARCHAR(45) UNIQUE NOT NULL
email       VARCHAR(100) UNIQUE NOT NULL
password    VARCHAR(200) NOT NULL   -- bcrypt hash
name        VARCHAR(100)
profilePic  VARCHAR(200)
coverPic    VARCHAR(200)
city        VARCHAR(100)
website     VARCHAR(200)
```

### `posts`
```sql
id          INT AUTO_INCREMENT PRIMARY KEY
desc        VARCHAR(500)
img         VARCHAR(200)
userId      INT NOT NULL            -- FK → users.id
createdAt   DATETIME NOT NULL
```

### `comments`
```sql
id          INT AUTO_INCREMENT PRIMARY KEY
desc        VARCHAR(200) NOT NULL
createdAt   DATETIME NOT NULL
userId      INT NOT NULL
postId      INT NOT NULL
```

### `likes`
```sql
id          INT AUTO_INCREMENT PRIMARY KEY
userId      INT NOT NULL
postId      INT NOT NULL
```

### `relationships`
```sql
id              INT AUTO_INCREMENT PRIMARY KEY
followerUserId  INT NOT NULL    -- the user who follows
followedUserId  INT NOT NULL    -- the user being followed
```

### `stories`
```sql
id          INT AUTO_INCREMENT PRIMARY KEY
img         VARCHAR(200) NOT NULL
userId      INT NOT NULL
createdAt   DATETIME NOT NULL
expiresAt   DATETIME NOT NULL   -- stories expire (typically 24h after creation)
```

## Auth Provider
Custom JWT implementation:
- **Library**: `jsonwebtoken` + `bcryptjs`
- **Token storage**: httpOnly cookie named `accessToken`
- **Secret**: hardcoded `"secretkey"` (should be moved to `process.env.JWT_SECRET`)
- **Session**: stateless (no refresh tokens — cookie lasts until browser closes)

## Row Level Security
Enforced in controller logic (not at DB level):
- Delete post: checks `userId = userInfo.id` (from JWT)
- Update user: checks authenticated user ID matches target
- Likes/relationships: userId extracted from JWT, not from request body

## User Roles
None — all authenticated users have same permissions (no admin role).

## Sensitive Fields
- `password` — bcrypt hashed; stripped from all API responses via destructuring (`const { password, ...others } = data[0]`)
- `accessToken` cookie — httpOnly, cleared on logout

## File Storage
Images uploaded via Multer to `client/public/upload/` (local filesystem). File path returned as filename string and stored in `img` columns.

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login → set cookie |
| POST | `/api/auth/logout` | Clear cookie |
| GET | `/api/users/:userId` | Get user profile |
| PUT | `/api/users` | Update own profile |
| GET | `/api/posts?userId=` | Get feed or user posts |
| POST | `/api/posts` | Create post |
| DELETE | `/api/posts/:id` | Delete own post |
| GET | `/api/comments?postId=` | Get comments |
| POST | `/api/comments` | Add comment |
| DELETE | `/api/comments/:id` | Delete own comment |
| GET | `/api/likes?postId=` | Get likes |
| POST | `/api/likes` | Like a post |
| DELETE | `/api/likes?postId=` | Unlike a post |
| GET | `/api/relationships?followedUserId=` | Get followers |
| POST | `/api/relationships` | Follow user |
| DELETE | `/api/relationships?userId=` | Unfollow user |
| GET | `/api/stories` | Get active stories |
| POST | `/api/upload` | Upload image file |
