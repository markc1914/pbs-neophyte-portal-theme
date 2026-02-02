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

---

## Open Issues

### Issue #2: Compare with production and match blue overlay effect
**Status: In Progress**

Tasks:
- [x] Header/navigation styling matches
- [x] Footer matches production design
- [ ] Compare blue overlay gradient effect (if applicable)
- [ ] Take screenshots of production for comparison

**Links:**
- Production: https://members.phibetasigma1914.org/iMIS15/PBSNeophyte
- DEV: https://members.phibetasigma1914.org/iMISDEV/PBSNeophyte

---

### Issue #3: Clean up legacy CSS and remove unused styles
**Status: Open**

Tasks:
- [ ] Remove any legacy/unused CSS from base files
- [ ] Consolidate duplicate rules
- [ ] Ensure consistent use of CSS variables
- [ ] Remove Droid Sans font references (replaced with Inter)
- [ ] Clean up any vendor prefixes that are no longer needed

**Goal:** Lean, maintainable CSS that only includes what's needed.

---

## Recent Changes (2026-02-02)

1. **Banner display fixed** - Added explicit `background-image` CSS for `#masterHeaderImage`
2. **Nav menu text enlarged** - Increased to 14px with better padding and uppercase styling
3. **Banner size capped** - Added `max-width: 650px` and `max-height: 86px` to prevent distortion at 1440p+
4. **Skip link hidden** - Added comprehensive CSS selectors to hide "Skip to main content"

---

## GitHub Issues
View all issues: https://github.com/markc1914/pbs-neophyte-portal-theme/issues
