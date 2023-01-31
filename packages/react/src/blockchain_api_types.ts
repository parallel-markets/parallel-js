// https://developer.parallelmarkets.com/docs/server/blockchain-api

import { EntityKind } from './common_api_types'

// https://developer.parallelmarkets.com/docs/server/data-structures#pid-token
type PidTrait = 'accredited' | 'reg-s-us-person' | 'reg-s-non-us-person'

type ParallelIdentityToken = {
  minted_at: string
  sanctioned_at: string | null
  token_id: number
  traits: [PidTrait]
}

// https://developer.parallelmarkets.com/docs/server/data-structures#wallet
type Wallet = {
  address: string
  type: 'ethereum'
  tokens: [ParallelIdentityToken]
}

// https://developer.parallelmarkets.com/docs/server/blockchain-api
export type BlockchainApi = {
  id: string
  type: EntityKind
  user_id: string
  user_providing_for: 'self' | 'controlled-business'
  wallets: [Wallet]
}
