# PBS Neophyte Portal Theme

## AI Assistant Instructions

This document provides context for AI assistants (Claude, Codex, Gemini, etc.) working on this project.

### What This Project Is
A custom responsive CSS theme for the **Phi Beta Sigma Fraternity iMIS Neophyte Portal**. This is a CSS-only project - we cannot modify HTML or JavaScript, only CSS.

### Key Constraints
1. **CSS-only** - No access to HTML templates or JavaScript
2. **iMIS Platform** - Uses Telerik controls (RadMenu, RadTabStrip, RadGrid, RadComboBox)
3. **Must use `!important`** - To override iMIS base styles and UltraWave theme
4. **Separate from Member Portal** - This is a distinct theme for neophytes

### Live Sites
- **Production:** https://members.phibetasigma1914.org/iMIS15/PBSNeophyte
- **Dev/Test:** https://members.phibetasigma1914.org/iMISDEV/PBSNeophyte

---

## Brand Standards

| Element | Value |
|---------|-------|
| Primary Color (Royal Blue) | `#164F90` |
| Secondary Color | `#FFFFFF` |
| Accent Blue | `#6a9ac9` |
| Dark Blue | `#0d3a6a` |
| Font | Inter (Google Fonts) |

CSS Variables defined in `:root`:
```css
--pbs-blue: #164F90;
--pbs-blue-dark: #0d3a6a;
--pbs-blue-light: #2066ac;
--pbs-blue-accent: #6a9ac9;
--pbs-white: #FFFFFF;
```

**Note:** Must comply with same brand standards as the Member Portal theme.

---

## Project Structure

```
pbs-neophyte-portal-theme/
├── package/                    # DEPLOY THIS FOLDER
│   ├── pbs-neophyte-theme.css  # Main CSS file (edit this)
│   ├── ThemeSettings.xml       # iMIS theme manifest
│   └── images/                 # Theme images
├── baseFiles/                  # Original/reference theme files
│   └── PBSNeophytes/          # Base theme from iMIS
├── testingScreenshots/        # Screenshots for debugging
├── test-config.js             # Test configuration (no credentials)
├── test-users.json.example    # Credential template (copy to test-users.json)
├── CLAUDE.md                  # This file (AI instructions)
└── README.md                  # User-facing documentation
```

### Key File: `package/pbs-neophyte-theme.css`
This is the main CSS file. All edits should be made here.

---

## Testing Workflow

1. Edit `package/pbs-neophyte-theme.css`
2. Create test script to inject CSS locally
3. Test on dev site: https://members.phibetasigma1914.org/iMISDEV/PBSNeophyte
4. Take screenshots and save to `testingScreenshots/` for debugging
5. Deploy to iMIS server
6. Commit changes to git

### Credentials Setup
1. Copy `test-users.json.example` to `test-users.json`
2. Add your test credentials to `test-users.json`
3. **NEVER commit `test-users.json` to git** (it's in .gitignore)

---

## Deployment to iMIS

### Theme Name: PBS-NEOPHYTE-THEME-MODERN

### Manual Deployment
1. Copy `package/` folder contents to iMIS server
2. Path: `C:\Program Files (x86)\ASI\iMIS\Net\App_Themes\PBS-NEOPHYTE-THEME-MODERN\`
3. In iMIS Staff: RiSE → Website → Theme Settings → Select "PBS-NEOPHYTE-THEME-MODERN"

---

## Design Goals

1. **Wider Content Area** - Maximize content width
2. **Blue Overlay** - Match production's blue overlay effect
3. **Clean/Modern** - Remove legacy styling cruft
4. **Consistent with Member Portal** - Same brand standards
5. **Responsive** - Mobile-friendly layout

---

## Tips for AI Assistants

1. **Always use `!important`** when overriding iMIS/Telerik styles
2. **Test changes locally** before deployment
3. **Be careful with broad selectors** - they can break things
4. **Check screenshots** in `testingScreenshots/` to understand current state
5. **The main CSS file is `package/pbs-neophyte-theme.css`** - not baseFiles
6. **Commit frequently** - user deploys from git
7. **Never commit credentials** - use test-users.json (gitignored)
