// https://developer.parallelmarkets.com/docs/server/profile-api

import { BusinessProfile, EntityKind, IndividualProfile } from './common_api_types'

export type ProfileApi = {
  id: string
  type: EntityKind
  profile: IndividualProfile | BusinessProfile
  user_id: string
  user_profile: IndividualProfile
  user_providing_for: 'self' | 'controlled-business' | 'other-individual'
  access_expires_at: string | null
  access_revoked_by: 'subject' | 'partner' | 'system' | null
}
