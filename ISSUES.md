# PBS Neophyte Portal Theme - Issues & Status

## Completed

### Issue #1: Theme Setup - Test and verify base styling ✅
**Closed: 2026-02-02**

Completed items:
- Banner displays correctly with PBS crest
- Navigation menu styled with larger text (14px, uppercase)
- Content area properly aligned (full width)
- Inter font applied throughout
- Brand colors (#164F90) applied correctly
- Buttons and forms styled
- Mobile responsive layout works
- Footer with black background, white text
- Skip-to-main-content link hidden
- Banner capped at 1080p size to prevent distortion at higher resolutions

### Issue #2: Compare with production and match blue overlay effect ✅
**Closed: 2026-02-02**

Completed:
- Header/navigation styling matches
- Footer matches production design
- Blue overlay effect compared and matched

### Issue #3: Clean up legacy CSS and remove unused styles ✅
**Closed: 2026-02-02**

Completed CSS cleanup and optimization.

---

## Open Issues

### Issue #4: Sign Out button not visible 🔴 HIGH PRIORITY
**Status: Open**

The Sign Out button is not visible on the Neophyte Portal. Users cannot sign out.

**Related:** Similar issue was fixed in Member Portal (Issue #11) - may need similar CSS fix.

---

## Recent Changes (2026-02-02)

1. **Banner display fixed** - Added explicit `background-image` CSS for `#masterHeaderImage`
2. **Nav menu text enlarged** - Increased to 14px with better padding and uppercase styling
3. **Banner size capped** - Added `max-width: 650px` and `max-height: 86px` to prevent distortion at 1440p+
4. **Skip link hidden** - Added comprehensive CSS selectors to hide "Skip to main content"
5. **Carousel width limited** - Set `max-width: 1080px` to match content text width below

---

## GitHub Issues
View all issues: https://github.com/markc1914/pbs-neophyte-portal-theme/issues
