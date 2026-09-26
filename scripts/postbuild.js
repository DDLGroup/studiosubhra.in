import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('Running postbuild optimization for GitHub Pages SPA deployment...');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist!');
  process.exit(1);
}

const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html does not exist!');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexPath, 'utf-8');

// 1. Create 404.html as exact copy of index.html for SPA routing fallback
const fourOhFourPath = path.join(distDir, '404.html');
fs.writeFileSync(fourOhFourPath, indexContent, 'utf-8');
console.log('✓ Created dist/404.html for GitHub Pages fallback routing');

// 2. Ensure CNAME exists in dist
const cnameContent = 'www.studiosubhra.in\n';
fs.writeFileSync(path.join(distDir, 'CNAME'), cnameContent, 'utf-8');
console.log('✓ Ensured dist/CNAME (www.studiosubhra.in)');

// 3. Ensure .nojekyll exists in dist
fs.writeFileSync(path.join(distDir, '.nojekyll'), '# Bypass Jekyll for GitHub Pages\n', 'utf-8');
console.log('✓ Ensured dist/.nojekyll');

// 4. Generate static route directories with index.html for instant HTTP 200 responses & SEO
const staticRoutes = [
  'collections',
  'ready-to-wear',
  'about',
  'lookbook',
  'contact',
];

for (const route of staticRoutes) {
  const routeDir = path.join(distDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  const routeIndexPath = path.join(routeDir, 'index.html');
  fs.writeFileSync(routeIndexPath, indexContent, 'utf-8');
  console.log(`✓ Generated static route: dist/${route}/index.html`);
}

console.log('Postbuild finished successfully! Ready for GitHub Pages deployment.');
