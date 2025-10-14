# Local Workshop Website - Deployment Guide

## Quick Deployment to Any Hosting

Your website is **100% ready to upload** to any regular hosting provider. No build steps, no npm install, nothing complicated!

### What You Need to Upload

All files are located in: **`website-deploy/`** folder

```
website-deploy/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── i18n.js
└── translations/
    ├── en.json
    └── ru.json
```

## Step-by-Step Deployment Instructions

### Option 1: cPanel File Manager (Most Common)

1. Log into your hosting cPanel
2. Open "File Manager"
3. Navigate to `public_html` (or `www` or your domain folder)
4. Click "Upload" at the top
5. Select ALL files from the `website-deploy` folder
6. Click "Upload"
7. Visit your domain - Done!

### Option 2: FTP Upload (FileZilla, etc.)

1. Open your FTP client (FileZilla, Cyberduck, etc.)
2. Connect to your hosting:
   - Host: Your hosting FTP address
   - Username: Your FTP username
   - Password: Your FTP password
3. Navigate to the `public_html` or root web directory
4. Drag and drop ALL files from `website-deploy` folder
5. Wait for upload to complete
6. Visit your domain - Done!

### Option 3: Netlify (Free Option)

1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Drag the `website-deploy` folder onto Netlify's dashboard
3. Your site is live instantly with a free URL
4. Optional: Add your custom domain in settings

### Option 4: GitHub Pages (Free Option)

1. Create a new GitHub repository
2. Upload all files from `website-deploy` to the repository
3. Go to repository Settings → Pages
4. Select "main" branch and "/" root folder
5. Click Save
6. Your site will be live at `https://yourusername.github.io/repository-name`

## After Upload - Essential Configuration

### 1. Update Google Maps (Required)

In `index.html`, find this line (near the bottom):

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
```

Replace `YOUR_API_KEY` with your actual Google Maps API key.

**How to get Google Maps API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Maps JavaScript API"
4. Create credentials → API Key
5. Copy and paste your key into the HTML file

**If you don't want to add Google Maps**, you can remove the script tag or leave it as is (it will show a placeholder).

### 2. Update Cloudflare Turnstile (Recommended)

In `index.html`, find this line:

```html
<div class="cf-turnstile" data-sitekey="1x00000000000000000000AA"></div>
```

Replace the sitekey with your actual Turnstile site key.

**How to get Turnstile:**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to Turnstile
3. Create a new site
4. Copy the site key
5. Replace in HTML file

**If you don't want Turnstile**, you can:
- Remove the div entirely
- Or leave it (form will still work, just without bot protection)

### 3. Update Your Business Information

Edit these details in `index.html`:

- Business address (appears in multiple places)
- Phone numbers
- Email address
- Social media links (Instagram, WhatsApp URLs)
- Operating hours
- Google Reviews link

**Also update the same info in translation files:**
- `translations/en.json`
- `translations/ru.json`

### 4. Add Real Images (Optional but Recommended)

Replace the gradient backgrounds in hero carousel with real photos:

In `index.html`, find:

```html
<div class="carousel-image" style="background: linear-gradient(135deg, #333 0%, #000 100%);"></div>
```

Replace with:

```html
<div class="carousel-image" style="background-image: url('images/hero1.jpg'); background-size: cover; background-position: center;"></div>
```

Create an `images` folder and upload your photos there.

## Hosting Recommendations

### Budget-Friendly Options:
- **Netlify** - Free tier, great for static sites
- **GitHub Pages** - Free, good for simple sites
- **Vercel** - Free tier, fast deployment

### Traditional Hosting (Paid):
- **Bluehost** - $2.95/month, includes domain
- **HostGator** - $2.75/month, easy cPanel
- **SiteGround** - $3.99/month, excellent support
- **Namecheap** - $1.88/month, budget-friendly

### Requirements:
Your hosting needs to support:
- ✅ Static HTML files (all hosting does this)
- ✅ No PHP, database, or server-side code required
- ✅ Simple HTTP server is all you need

## Checking If It Works

After uploading, visit your website and check:

1. ✅ All sections load correctly
2. ✅ Navigation links scroll to sections
3. ✅ Hero carousel auto-rotates
4. ✅ Services carousel works (drag or click arrows)
5. ✅ Language switcher changes text (EN/RU)
6. ✅ Contact form accepts input
7. ✅ Footer links work
8. ✅ Mobile responsive (test on phone)

## Troubleshooting

### Website not showing up?
- Make sure `index.html` is in the root directory (not in a subfolder)
- Check that file names are lowercase
- Verify your domain is pointing to the hosting

### CSS not loading?
- Check that `css` folder is uploaded
- Verify folder structure matches exactly

### JavaScript not working?
- Check that `js` and `translations` folders are uploaded
- Open browser console (F12) to see any errors

### Map not showing?
- Add your Google Maps API key
- Or remove the map section if not needed

## Domain Setup

If you have a custom domain:

1. Point your domain to your hosting
   - Update nameservers OR
   - Add A record pointing to hosting IP
2. Wait 24-48 hours for DNS propagation
3. Visit your domain

## SSL Certificate (HTTPS)

Most hosting providers offer free SSL certificates:

1. Log into your hosting control panel
2. Look for "SSL Certificate" or "Let's Encrypt"
3. Click "Install" or "Enable"
4. Wait a few minutes
5. Your site will be accessible via `https://`

## Support

If you need help:
- Check your hosting provider's documentation
- Contact your hosting support (they can help with uploads)
- Verify all files are uploaded correctly

---

**Remember:** This is a static website - no databases, no server-side code, just HTML, CSS, and JavaScript. It will work on literally any web hosting service!