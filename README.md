# PBS Neophyte Portal Theme - Modern

A modern, responsive CSS theme for the Phi Beta Sigma Fraternity iMIS Neophyte Portal.

## Theme Name
**PBS-NEOPHYTE-THEME-MODERN**

## Live Sites
- **Production:** https://members.phibetasigma1914.org/iMIS15/PBSNeophyte
- **Development:** https://members.phibetasigma1914.org/iMISDEV/PBSNeophyte

## Brand Standards

| Element | Value |
|---------|-------|
| Primary Color (Royal Blue) | `#164F90` |
| Secondary Color | `#FFFFFF` |
| Accent Blue | `#6a9ac9` |
| Dark Blue | `#0d3a6a` |
| Font | Inter (Google Fonts) |

## Features

- **Blue Overlay Effect** - Gradient blue background matching production
- **Wider Content Area** - Max width 1400px for better readability
- **Modern Typography** - Inter font family throughout
- **Responsive Design** - Mobile-friendly layout
- **Brand Consistent** - Same brand standards as Member Portal theme
- **Clean CSS** - Well-organized with CSS custom properties

## Project Structure

```
pbs-neophyte-portal-theme/
├── package/                      # DEPLOY THIS FOLDER
│   ├── pbs-neophyte-theme.css   # Main CSS file
│   ├── ThemeSettings.xml        # iMIS theme manifest
│   └── images/                  # Theme images
├── baseFiles/                   # Original reference files
├── testingScreenshots/          # Test screenshots
├── test-config.js               # Test configuration
├── test-neophyte-theme.js       # Test script
├── CLAUDE.md                    # AI assistant instructions
└── README.md                    # This file
```

## Deployment

### Manual Deployment to iMIS
1. Copy contents of `package/` folder to iMIS server
2. Path: `C:\Program Files (x86)\ASI\iMIS\Net\App_Themes\PBS-NEOPHYTE-THEME-MODERN\`
3. In iMIS Staff: RiSE → Website → Theme Settings → Select "PBS-NEOPHYTE-THEME-MODERN"

## Development

### Prerequisites
- Node.js (for running test scripts)
- Puppeteer (`npm install`)

### Testing Locally
1. Copy `test-users.json.example` to `test-users.json`
2. Add your test credentials to `test-users.json`
3. Run: `node test-neophyte-theme.js`

**Note:** Never commit `test-users.json` - it's in `.gitignore`

### CSS Variables
The theme uses CSS custom properties for easy customization:

```css
:root {
    --pbs-blue: #164F90;
    --pbs-blue-dark: #0d3a6a;
    --pbs-blue-light: #2066ac;
    --pbs-blue-accent: #6a9ac9;
    --pbs-white: #FFFFFF;
    --pbs-font-family: 'Inter', sans-serif;
}
```

## Related Projects
- [PBS Member Portal Theme](https://github.com/markc1914/pbs-member-portal-theme) - Member portal theme with same brand standards

## License
Private - Phi Beta Sigma Fraternity, Inc.
