// https://developer.parallelmarkets.com/docs/server/profile-api

import { BusinessType, EntityKind } from './common_api_types'

export type ProfileApiResponse = {
  id: string
  type: EntityKind
  profile: IndividualProfile | BusinessProfile
  user_id: string
  user_profile: IndividualProfile
  user_providing_for: 'self' | 'controlled-business' | 'other-individual'
  access_expires_at: string | null
  access_revoked_by: 'subject' | 'partner' | 'system' | null
}

export type IndividualProfile = {
  email: string | null
  first_name: string
  last_name: string
}

export type BusinessProfile = {
  name: string
  business_type: BusinessType
  primary_contact: IndividualProfile | null
}
