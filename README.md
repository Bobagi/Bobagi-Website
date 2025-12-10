# Bobagi.net

## Overview
Bobagi.net is a static Vue 3 + Vuetify site that showcases personal experiments and portfolio items. The repository now contains only the client-side code required to render the site; all backend services, authentication, and database layers have been removed to keep the footprint minimal and focused on presentation.

## Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended; see `.nvmrc` for the exact version)
- [Git](https://git-scm.com/)

## Installation
Clone the repository and install the frontend dependencies:

```bash
git clone https://github.com/Bobagi/Bobagi-Website
cd Bobagi-Website
npm install
```

## Running the project
### Local development
Serve the site locally:

```bash
npm run dev
```

### Production build
Create a static production bundle in `dist/`:

```bash
npm run build
```

The generated files can be hosted by any static file server or CDN; Docker is no longer required because there is no backend or server-rendered content.

## Deploying
The GitHub Actions workflows build and deploy the static bundle automatically when changes reach `main` or when pull requests into `main` are merged. You can also trigger the workflows manually via the "Run workflow" button in GitHub.

## License
This project uses the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
If you want to contact me, you can reach me at [gustavoperin067@gmail.com](mailto:gustavoperin067@gmail.com).
