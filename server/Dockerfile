FROM node:20

# Sæt arbejdsmappe i containeren
WORKDIR /app

# Installer Directus CLI globalt
RUN npm install -g directus

# Eksponer den port Directus bruger
EXPOSE 8055

# Start Directus
CMD ["directus", "start"]
