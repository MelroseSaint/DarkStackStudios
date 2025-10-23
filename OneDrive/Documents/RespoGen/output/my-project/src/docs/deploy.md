# Deployment Instructions

## Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

## Option 2: Netlify Drop

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Go to [netlify.com/drop](https://netlify.com/drop)**
3. **Drag and drop the `dist` folder**

## Option 3: GitHub Pages

1. **Push to GitHub repository**
2. **Go to repository Settings > Pages**
3. **Select source: GitHub Actions**
4. **Use the provided workflow**

## Option 4: Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder to any static hosting service:**
   - Netlify
   - Vercel
   - GitHub Pages
   - Firebase Hosting
   - AWS S3 + CloudFront

## Environment Variables

Make sure to set the following environment variables in your hosting platform:

- `VITE_GEMINI_API_KEY` - Your Gemini API key from https://aistudio.google.com/app/apikey

## Build Output

The built files are in the `dist` directory and ready for deployment.
