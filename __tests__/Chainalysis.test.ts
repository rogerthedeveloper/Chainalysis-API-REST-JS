import { ChainalysisApiRest } from '../src/index';

test.skip('TX', async () => {

    ChainalysisApiRest.init({
        token: "<TOKEN>"
    });

    ChainalysisApiRest.v2.Users.Transfers.registerTransfer({
        userID: "TEST_USER",
        asset: "BTC",
        transferReference: "<TX_ID>>:<WALLET_IN>",
        direction: "received",
        assetAmount: 0.01
    });

});