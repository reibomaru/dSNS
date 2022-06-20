migrate-client-web:
	cp -r blockchain/artifacts/contracts client/web/src

format:
	cd blockchain && npm run format;
	cd client/web && npm run format;