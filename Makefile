migrate-client-web:
	cp -r blockchain/artifacts/contracts client/web/src

format:
	cd blockchain && npm run format;
	cd client/web && npm run format;

start-client-web:
	cd client/web && npm start

start-local-blockchain:
	cd blockchain && npx hardhat node

deploy-local:
	cd blockchain && npx hardhat --network localhost run scripts/deploy.ts