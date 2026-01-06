# CLAUDE.md - AI Assistant Guide

## Project Overview

**Pokemon Clock** is a Progressive Web App (PWA) that displays a Pokemon-themed always-on clock, calendar, and weather forecast. It's designed to run on iOS 12+ devices (particularly iPad Mini) as a persistent display.

### Key Features
- Real-time clock with Pokemon-themed UI
- Monthly calendar with navigation
- Weather forecast using device geolocation
- Random Pokemon sprite decorations
- Service Worker for offline functionality
- PWA installable as standalone app

## Architecture

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES5-compatible), HTML5, CSS3
- **APIs**:
  - Open-Meteo API (weather data, no API key required)
  - Nominatim OpenStreetMap (reverse geocoding)
- **Service Worker**: Cache-first strategy for offline support
- **Deployment**: GitHub Pages via GitHub Actions

### Browser Compatibility
- **Target**: iOS 12+ (Safari)
- **JavaScript**: ES5 syntax with IIFE pattern
- **CSS**: Prefixed properties (`-webkit-`) for compatibility
- **Features**: Wake Lock API, Service Worker, Geolocation API

## Project Structure

```
pokemon-clock/
├── index.html          # Main HTML structure
├── app.js              # Core application logic (ES5)
├── styles.css          # Pokemon-themed styles with iOS 12 compatibility
├── sw.js               # Service Worker for offline support
├── manifest.json       # PWA manifest
├── icons/
│   └── icon.svg        # App icon for PWA
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages deployment workflow
└── .gitlab-ci.yml      # GitLab CI configuration (legacy)
```

## File Descriptions

### `index.html` (100 lines)
- Semantic HTML5 structure
- Pokemon-themed layout with pokeball decorations
- Clock section (time display with AM/PM)
- Weather section (temperature, conditions, location)
- Calendar section (monthly grid with navigation)
- Footer with Pokemon type badges
- Viewport meta tags for mobile optimization

### `app.js` (436 lines)
- **IIFE Pattern**: Wrapped in `(function() { 'use strict'; })()` for ES5 compatibility
- **Pokemon Sprites**: Base64-encoded SVG sprites (Pikachu, Charmander, Bulbasaur, Squirtle, Eevee, Jigglypuff)
- **Clock Functions**:
  - `updateClock()`: Updates time every second (12-hour format)
  - `padZero()`: Adds leading zeros to single digits
- **Calendar Functions**:
  - `renderCalendar()`: Generates monthly grid
  - `prevMonth()` / `nextMonth()`: Month navigation
  - `getDaysInMonth()` / `getFirstDayOfMonth()`: Date calculations
- **Weather Functions**:
  - `initWeather()`: Requests geolocation and fetches weather
  - `fetchWeather()`: Calls Open-Meteo API
  - `getLocationName()`: Reverse geocodes coordinates
  - `updateWeatherIcon()`: Updates SVG weather icons
  - Weather codes mapped to WMO Weather interpretation codes (0-99)
- **Screen Management**:
  - `requestWakeLock()`: Prevents screen dimming
  - `preventDimming()`: DOM manipulation to keep display active
  - `registerServiceWorker()`: PWA offline support
- **Sprite Rotation**: Changes Pokemon sprites every 30 minutes

### `styles.css` (567 lines)
- **CSS Reset**: Universal box-sizing
- **Pokemon Theme Colors**:
  - Yellow (`#ffcb05`): Primary accent, clock text
  - Blue (`#3466af`, `#74b9ff`): Secondary accent, water type
  - Red (`#ff1a1a`, `#ff6b6b`): Fire type, high temps
  - Green (`#78c850`): Grass type, weather section
- **Layout**: Flexbox-based responsive design
- **Animations**:
  - Blinking colon (1s interval)
  - Subtle shift animation (60s, prevents burn-in)
- **Responsive Breakpoints**:
  - Desktop: max-width 1024px
  - Tablet: 768px
  - Mobile: 480px
  - Landscape mode: orientation and height-based
- **Webkit Prefixes**: All properties prefixed for iOS 12 Safari compatibility

### `sw.js` (96 lines)
- **Cache Name**: `pokemon-clock-v2`
- **Cached Resources**: HTML, CSS, JS, manifest
- **Strategies**:
  - Local assets: Cache-first
  - Weather APIs: Network-first with fallback
- **Events**:
  - `install`: Caches all assets, calls `skipWaiting()`
  - `activate`: Cleans old caches, calls `clients.claim()`
  - `fetch`: Routes requests based on hostname

### `manifest.json` (18 lines)
- **Name**: "Pokemon Clock" / "PokeClock"
- **Display**: Fullscreen mode
- **Orientation**: Any
- **Theme Colors**: Dark blue background, yellow accent
- **Icon**: SVG (scalable for all sizes)

## Development Workflows

### Local Development
```bash
# No build step required - just serve static files
python -m http.server 8000
# OR
npx serve
```

Open `http://localhost:8000` in browser.

### Testing Offline Mode
1. Open DevTools > Application > Service Workers
2. Check "Offline" checkbox
3. Reload page to test cached assets
4. Weather will show "Weather unavailable" (expected)

### Testing on iOS Device
1. Open Safari on iOS device
2. Navigate to local network IP (e.g., `http://192.168.1.x:8000`)
3. Tap Share > Add to Home Screen
4. Launch from home screen to test fullscreen PWA mode

## Deployment

### GitHub Pages (Automated)
- **Trigger**: Push to `main` or `master` branch
- **Workflow**: `.github/workflows/deploy.yml`
- **Process**:
  1. Checkout code
  2. Copy all files to `_site/` directory
  3. Upload artifact
  4. Deploy to GitHub Pages
- **URL**: `https://<username>.github.io/<repo-name>/`

### Manual Deployment
```bash
# Any static hosting service works:
# - Netlify: Drag & drop root directory
# - Vercel: Import Git repository
# - GitHub Pages: Enable in repo settings
```

## Git Workflow

### Branch Naming Convention
- Feature branches: `claude/add-feature-name-{sessionId}`
- Example: `claude/add-weather-forecast-zzhKB`

### Commit Message Style
Based on git history analysis:
- Imperative mood: "Add weather forecast feature"
- Descriptive: Include what was added/changed
- Examples:
  - "Add weather forecast feature with device location"
  - "Add GitHub pages support"
  - "Initial Pokemon clock web app"

### Current Branch
- Working on: `claude/add-claude-documentation-1NhSQ`
- Main branch: Not explicitly set (defaults to `main`)

## Key Conventions

### JavaScript Style
1. **ES5 Syntax Only**: No arrow functions, `let`/`const`, template literals
   - ✅ `var`, `function() {}`, string concatenation
   - ❌ `const`, `() => {}`, backticks
2. **IIFE Pattern**: Wrap code in `(function() { 'use strict'; })()`
3. **Vanilla JS**: No frameworks or libraries
4. **Variable Naming**: camelCase (e.g., `weatherTempEl`, `currentMonth`)
5. **DOM References**: Cache element references at top of file
6. **Feature Detection**: Always check API availability
   ```javascript
   if ('geolocation' in navigator) { /* use it */ }
   ```

### CSS Style
1. **Webkit Prefixes Required**: Always include `-webkit-` versions
   ```css
   display: -webkit-flex;
   display: flex;
   ```
2. **Color Palette**: Use Pokemon-themed colors (yellow, blue, red, green)
3. **Responsive Design**: Mobile-first with `@media` breakpoints
4. **Animations**: Keep subtle to prevent battery drain

### HTML Conventions
1. **Semantic Tags**: Use `<header>`, `<main>`, `<section>`, `<footer>`
2. **IDs for JS**: Use `id` attributes for JavaScript DOM access
3. **Classes for CSS**: Use `class` attributes for styling
4. **Meta Tags**: Include viewport and PWA meta tags

## API Integration Guidelines

### Weather API (Open-Meteo)
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **No API Key**: Free, no authentication required
- **Parameters**:
  - `latitude`, `longitude`: From geolocation
  - `current`: `temperature_2m,weather_code`
  - `daily`: `temperature_2m_max,temperature_2m_min`
  - `temperature_unit`: `fahrenheit`
  - `timezone`: `auto`
- **Weather Codes**: WMO codes (0-99) mapped in `weatherCodes` object
- **Refresh Rate**: Every 15 minutes

### Geocoding API (Nominatim)
- **Endpoint**: `https://nominatim.openstreetmap.org/reverse`
- **Headers**: Must include `User-Agent: PokemonClock/1.0`
- **Usage**: One-time on location acquisition
- **Fallback**: Show coordinates if geocoding fails

## Common Tasks

### Adding a New Pokemon Sprite
1. Create SVG sprite in `pokemonSprites` object (app.js:6-13)
2. Use base64-encoded data URI format
3. Add name to `pokemonNames` array (app.js:15)
4. Sprite will automatically rotate in random selection

### Adding a Weather Icon
1. Create SVG in `weatherIcons` object (app.js:75-84)
2. Map weather code to icon in `weatherCodes` object (app.js:43-72)
3. Icon automatically renders via `updateWeatherIcon()`

### Modifying Color Theme
1. Update CSS color variables in `styles.css`
2. Key colors:
   - Primary: `#ffcb05` (yellow)
   - Secondary: `#3466af` (blue)
   - Accent: `#ff6b6b` (red)
   - Success: `#78c850` (green)
   - Background: `#1a1a2e` (dark blue)

### Adding a New Section
1. Add HTML structure to `index.html`
2. Create corresponding styles in `styles.css`
3. Add initialization logic in `app.js` `init()` function
4. Update Service Worker cache if new files added

## Testing Checklist

### Browser Testing
- [ ] Safari iOS 12+ (primary target)
- [ ] Chrome (desktop)
- [ ] Safari (desktop)
- [ ] Firefox (desktop)

### PWA Features
- [ ] Service Worker registers successfully
- [ ] Offline mode works (cached assets load)
- [ ] Add to Home Screen appears
- [ ] Fullscreen mode displays correctly
- [ ] Icon renders properly

### Functionality
- [ ] Clock updates every second
- [ ] Calendar renders correctly
- [ ] Calendar navigation works (prev/next month)
- [ ] Today's date is highlighted
- [ ] Weather fetches successfully
- [ ] Location name displays
- [ ] Pokemon sprites appear and rotate
- [ ] Wake lock prevents screen dimming

### Responsive Design
- [ ] Desktop layout (1024px+)
- [ ] Tablet layout (768px)
- [ ] Mobile layout (480px)
- [ ] Landscape orientation
- [ ] Portrait orientation

## Troubleshooting

### Weather Not Loading
- **Issue**: "Weather unavailable" message
- **Causes**:
  1. Location permission denied
  2. Network offline
  3. API rate limit (unlikely)
- **Solution**: Check browser console for geolocation errors

### Service Worker Not Updating
- **Issue**: Changes not reflecting after deployment
- **Causes**:
  1. Old cache version active
  2. Browser cache
- **Solution**:
  1. Increment `CACHE_NAME` in `sw.js` (e.g., `v2` → `v3`)
  2. Hard reload browser (Cmd+Shift+R)

### Screen Dimming on iOS
- **Issue**: Display dims after 30 seconds
- **Causes**: Wake Lock API not supported or failed
- **Solution**:
  1. Keep app in foreground
  2. Disable auto-lock in iOS settings
  3. `preventDimming()` function runs every 30s as fallback

### Pokemon Sprites Not Appearing
- **Issue**: Empty boxes where sprites should be
- **Causes**: SVG encoding error
- **Solution**: Check console for SVG parsing errors, validate SVG syntax

## Performance Considerations

### Battery Optimization
- Minimize animations (only colon blink and subtle shift)
- Use `requestAnimationFrame` for smooth animations (if needed)
- Reduce API polling (weather: 15 min, sprites: 30 min)

### Memory Management
- Cache DOM references (don't query repeatedly)
- Use event delegation where possible
- Clean up intervals on page unload (not applicable for always-on display)

### Network Optimization
- Service Worker caches all assets
- Weather API uses auto-refresh (not manual)
- Single location request per session

## Security Considerations

### API Keys
- **None required**: Open-Meteo and Nominatim are free, public APIs
- No sensitive data stored or transmitted

### Geolocation
- User permission required before access
- Coordinates only used for weather/location
- Not stored permanently

### Content Security Policy
- No inline scripts or styles (all external)
- No external dependencies (except APIs)
- SVG sprites embedded as data URIs (safe)

## Future Enhancement Ideas

### Potential Features
- [ ] Multiple timezone support
- [ ] Custom Pokemon sprite selection
- [ ] Weather alerts/notifications
- [ ] Battery percentage display
- [ ] Touch gestures for navigation
- [ ] Pomodoro timer mode
- [ ] Custom color themes
- [ ] Multiple weather locations

### Technical Improvements
- [ ] Migrate to modern ES6+ syntax (if dropping iOS 12 support)
- [ ] Add TypeScript definitions
- [ ] Implement build system (Vite/Webpack)
- [ ] Add automated testing (Jest/Playwright)
- [ ] Progressive enhancement strategy
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)

## Resources

### Documentation
- [Open-Meteo API Docs](https://open-meteo.com/en/docs)
- [WMO Weather Codes](https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

### Tools
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [SVG Encoder](https://yoksel.github.io/url-encoder/) - SVG to data URI
- [PWA Builder](https://www.pwabuilder.com/) - PWA validation

## Contact & Contribution

This project is designed for personal use as an always-on display. When contributing:

1. **Maintain iOS 12 Compatibility**: Test on older Safari versions
2. **Keep Dependencies Minimal**: Avoid adding npm packages
3. **Respect Battery Life**: Minimize CPU-intensive operations
4. **Test PWA Features**: Ensure offline mode works
5. **Follow ES5 Syntax**: No modern JavaScript features

---

**Last Updated**: 2026-01-06
**Compatible iOS Version**: 12+
**Codebase Size**: ~680 lines (HTML: 100, JS: 436, CSS: 567, SW: 96)
