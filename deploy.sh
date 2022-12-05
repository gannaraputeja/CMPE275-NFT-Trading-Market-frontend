echo "Stop the nft pm2 server"
pm2 stop nft
echo "Installing NPM dependencies...."
npm install --force
echo "Start the nft pm2 server"
pm2 start nft