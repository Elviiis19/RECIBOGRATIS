# Remove ferramentas/ from App.tsx routes
sed -i 's/path="ferramentas\//path="/g' src/App.tsx

# Replace /ferramentas/ with / in Layout.tsx
sed -i 's/\/ferramentas\//\//g' src/components/Layout.tsx

# In blogPosts.ts
sed -i 's/\/ferramentas\//\//g' src/data/blogPosts.ts

# In PixGenerator.tsx
sed -i 's/\/ferramentas\//\//g' src/pages/PixGenerator.tsx

# In prerender.js
sed -i 's/\/ferramentas\//\//g' scripts/prerender.js

# In generate-sitemap.js - this might be a little trickier, let's see its contents.
