# Sanity Studio Quick Start Guide

## 🚀 Getting Started

### 1. Access Sanity Studio

Start your development server:

```bash
pnpm dev
```

Then visit: **http://localhost:3000/studio**

### 2. Required Data Setup

#### Step 1: Create Profile (Required First!)

The Profile is a **singleton** - only one should exist.

1. Click "Profile" in the sidebar
2. Fill in all required fields:
   - **Full Name**: Your name
   - **Tagline**: Short bio (e.g., "Software Engineer and Design Enthusiast")
   - **Location**: Your location
   - **Bio**: Longer description about yourself
   - **Profile Image**: Upload your photo
   - **Resume File**: Upload your resume PDF
   - **Social Links**: Add links to GitHub, LinkedIn, Twitter, etc.
   - **CTA Buttons**: Define your call-to-action buttons (e.g., "View Resume", "Contact Me")
   - **Contact Topics**: Array of topics for the contact form (e.g., ["Web Development", "Web Design", "Mobile Development"])

3. Click **Publish**

#### Step 2: Add Skills

Skills are categorized as either "soft" or "technology".

**Soft Skills** (displayed in the "My Skill Set" section):

1. Click "Skills" → "Create new document"
2. Fill in:
   - **Name**: Skill name (e.g., "Problem Solving", "Team Collaboration")
   - **Category**: Select "Soft Skill"
   - **Proficiency Level**: Optional (beginner/intermediate/advanced/expert)
   - **Icon**: Optional
   - **Order**: Display order (0, 1, 2, etc.)
3. Repeat for all soft skills

**Technology Skills** (displayed in the "About" section):

1. Same process, but select **Category**: "Technology"
2. Examples: "React", "Next.js", "TypeScript", "Node.js"

#### Step 3: Add Experience

1. Click "Experience" → "Create new document"
2. Fill in:
   - **Company**: Company name
   - **Role**: Your job title
   - **Start Date**: When you started
   - **End Date**: When you left (leave empty if current)
   - **Tasks**: Array of responsibilities/achievements
   - **Technologies**: Array of technologies used
   - **Order**: Display order (most recent = 0)
3. Click **Publish**
4. Repeat for all work experiences

#### Step 4: Add Projects

1. Click "Projects" → "Create new document"
2. Fill in:
   - **Title**: Project name
   - **Description**: What the project does
   - **Year**: Year completed
   - **Featured**: Toggle if this is a featured project
   - **Main Image**: Upload project screenshot
   - **GitHub Repo**: Link to GitHub repository (optional)
   - **NPM Package**: Link to NPM package (optional)
   - **Live Link**: Link to live demo (optional)
   - **Technologies**: Array of technologies used
   - **Order**: Display order (0, 1, 2, etc.)
3. Click **Publish**
4. Repeat for all projects

#### Step 5: Add Testimonials

1. Click "Testimonials" → "Create new document"
2. Fill in:
   - **Person Name**: Name of person giving testimonial
   - **Job Title**: Their job title
   - **Company**: Their company
   - **Testimonial Quote**: The testimonial text
   - **Profile Image**: Upload their photo
   - **LinkedIn/Profile URL**: Link to their profile (optional)
   - **Order**: Display order (0, 1, 2, etc.)
3. Click **Publish**
4. Repeat for all testimonials

---

## 📝 Important Notes

### Data Requirements

- **Profile**: Must create exactly ONE profile document
- **Skills**: At least 1 soft skill for the "My Skill Set" section
- **Technologies**: At least 1 technology skill for the "About" section
- If any section is empty, it will display but with no items (animations will be skipped safely)

### Content Revalidation

- The homepage revalidates every **60 seconds**
- After publishing changes in Sanity, wait up to 1 minute to see updates on the live site
- In development mode, you can refresh immediately

### Image Handling

- All images are processed through Sanity CDN
- Recommended formats: JPG, PNG, WebP
- Profile images work best as square (1:1 aspect ratio)
- Project images work best as landscape (16:9 aspect ratio)

### Ordering

- The **Order** field controls display order in each section
- Lower numbers appear first (0 = first, 1 = second, etc.)
- Use increments of 1 or 10 to make reordering easier

---

## 🔍 Testing Your Data

After adding data to Sanity:

1. Visit **http://localhost:3000**
2. Check each section:
   - ✅ Hero: Shows your name, bio, social links, CTA buttons
   - ✅ About: Shows technology skills
   - ✅ Experience: Shows work history
   - ✅ Projects: Shows your projects
   - ✅ My Skill Set: Shows soft skills
   - ✅ Testimonials: Shows recommendations
   - ✅ Contact: Shows your configured topics

3. Verify animations work correctly
4. Test all links (social media, project links, resume download)

---

## 🐛 Troubleshooting

**Problem: Changes don't appear on the site**

- Wait 60 seconds for revalidation
- Check if document is **Published** (not just saved as draft)
- Check browser console for errors

**Problem: Section is empty**

- Verify you created documents of the correct type
- Check that documents are published
- For Skills: Verify the correct category ("soft" vs "technology")

**Problem: Images not loading**

- Verify image was uploaded successfully in Sanity Studio
- Check browser console for 404 errors
- Ensure image asset has a valid URL

**Problem: Animation errors**

- This has been fixed for empty data
- If you still see animation errors, check browser console and report the specific section

---

## 🎉 You're All Set!

Once you've populated your Sanity Studio with data, your portfolio will be fully dynamic and manageable through the CMS. You can update content anytime without touching code!
