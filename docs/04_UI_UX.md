# UI/UX Design Brief

## Aesthetic Direction
Facebook-inspired layout with a three-column feed (LeftBar / Posts / RightBar). Clean SCSS-based styling with dark mode support. No UI framework — all custom SCSS. Familiar social network patterns: avatar + name + timestamp on posts, heart icon for likes, speech bubble for comments.

## Color Palette
- Light theme: white backgrounds, light gray page background (`#f0f2f5`), dark text
- Dark theme: dark backgrounds (`#1a1a2e` / `#16213e`), light text (`#e2e8f0`)
- Accent: blue (`#4267b2` Facebook-style) for buttons and interactive elements
- Theme applied via CSS class `.theme-light` / `.theme-dark` on root wrapper

## Typography
- System font stack (no web fonts)
- Navbar: bold logo text + icon buttons
- Post content: default paragraph size
- Timestamps: small muted text

## Component Style
- **Navbar**: full-width sticky bar — logo left, search center, user controls right (dark mode toggle, notifications placeholder, profile avatar)
- **LeftBar**: fixed left panel — user avatar/name, shortcut links (Friends, Groups, Markets, Events), show more, recent activities, recent user list
- **RightBar**: fixed right panel — Stories for other users, Online Friends list, Latest Activities
- **Post**: white card with shadow — header (avatar + name + time + delete icon for own posts), body text + image, footer (like count + comment count)
- **Share box**: top of feed — avatar + "What's on your mind?" input + image upload + Post button
- **Comments**: expandable inline section under each post
- **Stories bar**: horizontal scroll of circular avatar cards with gradient overlay

## Dark / Light Mode
Toggle button in Navbar. State managed in `DarkModeContext` (in-memory, not persisted to localStorage). Applied via `theme-dark` / `theme-light` CSS class on the root div.

## Key UI Patterns
- **Protected layout shell**: Navbar always visible for authenticated users
- **React Query**: mutations + cache invalidation keep feed/likes/comments in sync without page reload
- **Inline comments**: toggle comment section within Post component
- **Update modal**: profile edit opens overlay modal, not a new page

## Mobile Responsiveness
SCSS media queries present but app is primarily desktop-focused. Three-column layout collapses partially on smaller screens but is not fully mobile-optimized.

## Accessibility
- Form inputs have placeholder text
- `<button>` elements used for interactive controls
- No ARIA labels — improvement opportunity
