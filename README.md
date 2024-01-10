# VueCli

npm install -g @vue/cli
npm install vue-router@4

npm run serve

# in VPS

sudo apt update && sudo apt upgrade -y

curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo npm install pm2 -g

# .env server

GOOGLE_CLIENT_ID="XXXXX"
JWT_SECRET="XXXXX"
POSTGRES_URL="postgres://default:XXXXX@ep-gentle-flower-99500171-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_PRISMA_URL="postgres://default:XXXXX@ep-gentle-flower-99500171-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:XXXXX@ep-gentle-flower-99500171-us-east-1.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_USER="default"
POSTGRES_HOST="ep-gentle-flower-99500171-pooler.us-east-1.postgres.vercel-storage.com"
POSTGRES_PASSWORD="XXXXX"
POSTGRES_DATABASE="verceldb"
GMAIL_PASS="XXXXX"
