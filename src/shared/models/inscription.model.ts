export interface InscriptionResponseItem {
  address: string;
  content_length: number;
  content_type: string;
  curse_type: string | null;
  genesis_address: string;
  genesis_block_hash: string;
  genesis_block_height: number;
  genesis_fee: string;
  genesis_timestamp: number;
  genesis_tx_id: string;
  id: string;
  location: string;
  mime_type: string;
  number: number;
  offset: string;
  output: string;
  recursive: boolean;
  recursion_refs: string | null;
  sat_coinbase_height: number;
  sat_ordinal: string;
  sat_rarity: string;
  timestamp: number;
  tx_id: string;
  value: string;
}

export interface Inscription extends InscriptionResponseItem {
  addressIndex: number;
}

/**
 * Inscriptions contain arbitrary data. When retrieving an inscription, it should be
 * classified into one of the types below, indicating that the app can handle it
 * appropriately and securely. Inscriptions of types not ready to be handled by the
 * app should be classified as "other".
 */
const supportedInscriptionTypes = ['image', 'text', 'other'] as const;

type SupportedInscriptionType = (typeof supportedInscriptionTypes)[number];

interface BaseSupportedInscription extends Inscription {
  /**
   * The kind of inscription as classified by this app. Different kinds of inscriptions
   * require different treatment (e.g., images vs documents).
   */
  type: SupportedInscriptionType;
  title: string;
  infoUrl: string;
}

interface ImageInscription extends BaseSupportedInscription {
  type: 'image';
  src: string;
}

interface TextInscription extends BaseSupportedInscription {
  type: 'text';
  contentSrc: string;
}

interface OtherInscription extends BaseSupportedInscription {
  type: 'other';
}

/**
 * Information useful to the app about an inscription depending on its
 * type. Typically, API data will be used to construct this object. This is
 * *not* the result of any one API response.
 */
export type SupportedInscription = ImageInscription | TextInscription | OtherInscription;

export function whenInscriptionType<T>(
  mimeType: string,
  branches: { [k in SupportedInscriptionType]?: () => T }
) {
  if (mimeType.startsWith('image/') && branches.image) {
    return branches.image();
  }

  if (mimeType.startsWith('text') && branches.text) {
    return branches.text();
  }

  if (branches.other) return branches.other();

  throw new Error('Unhandled inscription type');
}
