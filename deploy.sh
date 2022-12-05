echo "Stop the nft pm2 server..."
pm2 stop nft
echo "Installing NPM dependencies...."
npm install --force
echo "Creating a production build..."
npm run build
echo "Start the nft pm2 server..."
pm2 start nft