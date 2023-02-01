// https://developer.parallelmarkets.com/docs/server/profile-api

import { BusinessType } from './common_api_types'

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

export type ProfileApiBaseResponse = {
  id: string
  user_id: string
  user_profile: IndividualProfile
  user_providing_for: 'self' | 'controlled-business' | 'other-individual'
  access_expires_at: string | null
  access_revoked_by: 'subject' | 'partner' | 'system' | null
}

type ProfileApiIndividualResponse = ProfileApiBaseResponse & {
  type: 'individual'
  profile: IndividualProfile
}

type ProfileApiBusinessResponse = ProfileApiBaseResponse & {
  type: 'business'
  profile: BusinessProfile
}

export type ProfileApiResponse = ProfileApiIndividualResponse | ProfileApiBusinessResponse
