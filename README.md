# Chainalysis API REST

A non-official interface for interact with Chainalysis
written by eDesigns Company and CompraDinero.com

## Installation

```bash
npm i chainalysis-api-rest
```

## Usage

```typescript
import { ChainalysisApiRest } from 'chainalysis-api-rest';

ChainalysisApiRest.init({
    token: {API_HASH_TOKEN}
});
```

## Transfers
This endpoint registers a transfer. Once you make a request for a transfer, KYT stores it and begins processing.

For transfers that are valid and KYT can process, the transfer should process within 30 seconds. 

```typescript
ChainalysisApiRest.v2.Users.Transfers.registerTransfer({
    userID: {userID},
    asset: {asset},
    transferReference: `${hash}:${address}`,
    direction: "received",
    assetAmount: 0.001 
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[ISC](https://choosealicense.com/licenses/isc/)