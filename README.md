<div align="center">
  <img src="logo/thesquarelogo.png" alt="The Square Offices Logo" width="96" height="96">

  <h1>The Square Offices Maintenance Page</h1>

  <p>A premium HTML, CSS, and JavaScript maintenance page with a cinematic background carousel for <strong>The Square Offices</strong>.</p>

  <p>
    <img alt="HTML" src="https://img.shields.io/badge/HTML-5-black?style=for-the-badge&logo=html5&logoColor=f7c934">
    <img alt="CSS" src="https://img.shields.io/badge/CSS-3-black?style=for-the-badge&logo=css&logoColor=f7c934">
    <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES6-black?style=for-the-badge&logo=javascript&logoColor=f7c934">
  </p>
</div>

## Overview
This project is a branded maintenance landing page built for The Square Offices. It combines a bold black-and-yellow visual language, a fullscreen workspace image carousel, and responsive contact information for desktop and mobile users.

## What’s Inside
- Fullscreen maintenance page with branded hero content
- Cinematic image carousel using assets in `Thesquarepictures/`
- The Square Offices logo in the page header and favicon
- Responsive layout optimized for desktop and mobile
- Contact blocks for address, email, and phone
- Keyboard-friendly carousel navigation

## Quick Start
1. Clone or download the project.
2. Open `index.html` in your browser.
3. Edit the content in `index.html`, styles in `styles.css`, and carousel behavior in `script.js`.

## Project Structure
```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- logo/
|   `-- thesquarelogo.png
|-- Thesquarepictures/
    `-- workspace images for the background carousel
```

## Preview Notes
- Main content lives in `index.html`
- Visual styling lives in `styles.css`
- Carousel logic and keyboard support live in `script.js`

<details>
<summary><strong>Customize The Text</strong></summary>

- Update the hero message inside the `h1.notice-card__title` in `index.html`
- Update the address, email, and phone inside the `.info-grid` section
- Update the footer caption label if needed

</details>

<details>
<summary><strong>Customize The Carousel</strong></summary>

- Edit the `slides` array in `script.js`
- Replace, remove, or reorder image paths from `Thesquarepictures/`
- Adjust timing with `AUTO_ROTATE_MS`
- Adjust motion intensity with each slide's `driftX`, `driftY`, and `zoomEnd`

</details>

<details>
<summary><strong>Customize The Branding</strong></summary>

- Replace `logo/thesquarelogo.png` with an updated logo if needed
- Update color values in `:root` inside `styles.css`
- Adjust card transparency, spacing, and typography in `styles.css`

</details>

## Design Direction
The current page uses:
- `#050505` for the base black background
- `#f7c934` for the primary yellow accent
- `#ffe89a` for the softer supporting text color

## Deployment
Because this is a static project, you can deploy it to:
- GitHub Pages
- Netlify
- Vercel
- Any shared hosting that serves HTML files

## Contact Content Used
- Address: `11, Otunba Yomi Oshikoya Drive, Abule Bus-stop, Off Mobolaji Bank Anthony Way, Ikeja, Lagos`
- Email: `info@thesquareoffices.com`
- Phone: `09169219591`

## License
This project is currently private/internal unless decided otherwise.
