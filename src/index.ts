import axios from 'axios';

namespace ChainalysisApiRest {
  const API_BASE_URL = 'https://api.chainalysis.com/api';
  let initOpts: ChainalysisInitOptsType;

  /**
   * Before start read the KYT Chainalysis [Documentation](https://docs.chainalysis.com/api/kyt/)
   */
  export function init(opts: ChainalysisInitOptsType) {
    initOpts = opts;
  }

  export namespace v1 {
    export namespace Users {}
  }

  export namespace v2 {
    export namespace Users {
      export namespace Transfers {
        /**
         * @param data of type {@link TransferRequest}.
         * 
         * This endpoint registers a transfer.
         *  
         * Once you make a request for a transfer, KYT stores it and begins processing.
         * For transfers that are valid and KYT can process, the transfer should process within 30 seconds.
         * This endpoint returns the below response:
         *
         * - [202]: Indicates KYT has accepted your transfer and will process your request.
         */
        export function registerTransfer(data: TransferRequest) {
          return axios.request<TransferResponse>({
            baseURL: API_BASE_URL,
            method: 'POST',
            data: data,
            url: `/kyt/v2/users/${data.userID}/transfers`,
            headers: {
              Token: initOpts.token,
            },
          });
        }
      }
    }
  }
}

type ChainalysisInitOptsType = {
  /**
   * A hash for get authenticated with the API
   */
  token: string;
};

export type TransferRequest = {

  /**
   * A unique string that identifies your user.
   *   
   * If creating a transfer for an existing user, use their existing userId.
   */
  userID: string;

  /**
   * The cryptocurrency or token used in this transfer. 
   * 
   * The value must be the asset's symbol, e.g., BTC for Bitcoin, ETH for Ether, UNI for Uniswap etc.
   */
  asset: 'BTC' | 'ETH' | 'USDT' | 'LTC' | string;

  /**
   * A combination of the transaction hash and output address or index of the transaction, seperated with a colon. For example, {transaction_hash}:{output_address} or {transaction_hash}:{output_index}.
   */
  transferReference: string;

  /**
   * This value defines whether the transfer is sent or received. This value is case insensitive.
   */
  direction: 'sent' | 'received';

  /**
   * The timestamp when the transfer occured, in the UTC ISO 8601 format. This timestamp should correspond to the timestamp of the block that included the transaction.
   */
  transferTimestamp?: string;

  /**
   * The amount of cryptocurrency funds used in this transfer.
   */
  assetAmount?: number;

  /**
   * The destination address for funds within the transaction.
   */
  outputAddress?: string;

  /**
   *  	A list of input addresses of the transfer. Note: This property is available only for CDN assets.
   */
  inputAddresses?: [];

  /**
   * The converstion of the assetAmount into a US Dollar price at the time of the transfer.
   */
  assetPrice?: number;

  /**
   * The denomination of the assetPrice property. Available only as USD.
   */
  assetDenomination?: string;

};

export type TransferResponse = {
  /**
   * The timestamp when the transfer was last updated, in the UTC ISO 8601 format. 
   * 
   * From your POST request, this value will be null.
   */
  updatedAt: string | null;
  asset: string;
  transferReference: string;
  tx: string | null;
  idx: string | null;
  usdAmount: number | null;
  assetAmount: number | null;
  timestamp: string | null;
  outputAddress: string | null;
  externalId: string;
};

export { 
  ChainalysisApiRest
}
