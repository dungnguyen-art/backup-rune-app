import { TxBroadcastResultRejected } from '@stacks/transactions';
import i18n from '@app/i18n';
export function getErrorMessage(
  reason:
    | TxBroadcastResultRejected['reason']
    | 'BadTransactionVersion'
    | 'ConflictingNonceInMempool'
    | 'EstimatorError'
    | 'TransferAmountMustBePositive'
    | 'TransferRecipientCannotEqualSender'
) {
  switch (reason) {
    case 'BadAddressVersionByte':
      return  i18n.errorMessages.badAddressVersionByte;
    case 'BadFunctionArgument':
      return i18n.errorMessages.badFunctionArgument;
    case 'BadNonce':
      return i18n.errorMessages.badNonce;
    case 'BadTransactionVersion':
      return i18n.errorMessages.badTransactionVersion;
    case 'ConflictingNonceInMempool':
      return i18n.errorMessages.conflictingNonceInMempool;
    case 'ContractAlreadyExists':
      return i18n.errorMessages.conflictingNonceInMempool;
    case 'Deserialization':
      return i18n.errorMessages.deserialization;
    case 'EstimatorError':
      return i18n.errorMessages.estimatorError;
    case 'FeeTooLow':
      return i18n.errorMessages.feeTooLow;
    case 'NoCoinbaseViaMempool':
      return i18n.errorMessages.noCoinbaseViaMempool;
    case 'NoSuchContract':
      return i18n.errorMessages.noSuchContract;
    case 'NoSuchPublicFunction':
      return i18n.errorMessages.noSuchPublicFunction;
    case 'NotEnoughFunds':
      return i18n.errorMessages.notEnoughFunds;
    case 'PoisonMicroblocksDoNotConflict':
      return i18n.errorMessages.poisonMicroblocksDoNotConflict;
    case 'PoisonMicroblockHasUnknownPubKeyHash':
      return i18n.errorMessages.poisonMicroblockHasUnknownPubKeyHash;
    case 'PoisonMicroblockIsInvalid':
      return i18n.errorMessages.poisonMicroblockIsInvalid;
    case 'Serialization':
      return i18n.errorMessages.serialization;
    case 'ServerFailureDatabase':
      return i18n.errorMessages.serverFailureDatabase;
    case 'ServerFailureNoSuchChainTip':
      return i18n.errorMessages.serverFailureNoSuchChainTip;
    case 'ServerFailureOther':
      return i18n.errorMessages.serverFailureOther;
    case 'SignatureValidation':
      return i18n.errorMessages.signatureValidation;
    case 'TransferAmountMustBePositive':
      return i18n.errorMessages.transferAmountMustBePositive;
    case 'TransferRecipientCannotEqualSender':
      return i18n.errorMessages.transferRecipientCannotEqualSender;
    default:
      return i18n.errorMessages.default;
  }
}
