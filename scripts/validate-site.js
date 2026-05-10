const fs = require('fs');
const path = require('path');

const root = process.cwd();
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith('.html'));
const issues = [];

for (const file of htmlFiles) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');

  checkLocalReferences(file, source);
  checkAnchors(file, source);
  checkInlineScripts(file, source);
}

if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}

console.log('Site validation passed.');

function checkLocalReferences(file, source) {
  const referencePattern = /(?:src|href)=["']([^"']+)["']/g;

  for (const match of source.matchAll(referencePattern)) {
    const reference = match[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(reference)) continue;

    const localPath = decodeURIComponent(reference.split('#')[0]);
    if (localPath && !fs.existsSync(path.join(root, localPath))) {
      issues.push(`${file}: missing local reference "${reference}"`);
    }
  }
}

function checkAnchors(file, source) {
  const ids = new Set([...source.matchAll(/id=["']([^"']+)["']/g)].map((match) => match[1]));

  for (const match of source.matchAll(/href=["']#([^"']+)["']/g)) {
    if (!ids.has(match[1])) issues.push(`${file}: broken anchor "#${match[1]}"`);
  }
}

function checkInlineScripts(file, source) {
  let index = 0;

  for (const match of source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
    index += 1;

    try {
      new Function(match[1]);
    } catch (error) {
      issues.push(`${file}: inline script ${index} has a syntax error: ${error.message}`);
    }
  }
}
