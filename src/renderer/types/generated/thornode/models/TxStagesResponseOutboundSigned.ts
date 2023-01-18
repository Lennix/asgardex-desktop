// tslint:disable
/**
 * Thornode API
 * Thornode REST API.
 *
 * The version of the OpenAPI document: 1.103.0
 * Contact: devs@thorchain.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * @export
 * @interface TxStagesResponseOutboundSigned
 */
export interface TxStagesResponseOutboundSigned {
    /**
     * THORChain height for which the external outbound is scheduled
     * @type {number}
     * @memberof TxStagesResponseOutboundSigned
     */
    scheduled_outbound_height?: number;
    /**
     * THORChain blocks since the scheduled outbound height
     * @type {number}
     * @memberof TxStagesResponseOutboundSigned
     */
    blocks_since_scheduled?: number;
    /**
     * returns true if an external transaction has been signed and broadcast (and observed in its mempool)
     * @type {boolean}
     * @memberof TxStagesResponseOutboundSigned
     */
    completed: boolean;
}