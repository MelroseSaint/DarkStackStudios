#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting deployment process...');

try {
  // Build the project
  console.log('📦 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check if dist folder exists
  if (!fs.existsSync('dist')) {
    throw new Error('Build failed - dist folder not found');
  }
  
  console.log('✅ Build completed successfully!');
  console.log('📁 Built files are in the dist/ directory');
  console.log('');
  console.log('🌐 Deployment Options:');
  console.log('1. Netlify Drop: https://netlify.com/drop');
  console.log('2. Vercel: npx vercel --prod');
  console.log('3. GitHub Pages: Push to GitHub and enable Pages');
  console.log('4. Firebase: firebase deploy');
  console.log('');
  console.log('⚠️  Don\'t forget to set VITE_GEMINI_API_KEY environment variable!');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
