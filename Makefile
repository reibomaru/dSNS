init:
	cd blockchain && npm install
	cd client/web && npm install

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

deploy-mumbai:
	cd blockchain && npx hardhat --network mumbai run scripts/deploy.ts

build-client-web:
	cd client/web && npm run build

deploy-client-web:
	cd client/web && npx firebase deploy --only hosting