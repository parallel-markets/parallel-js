// https://developer.parallelmarkets.com/docs/server/identity-api

import { EntityKind } from './common_api_types'

type ConsistencyLevel = 'low' | 'medium' | 'high' | 'none'

type IndividualIdentityDetailsConsistencySummary = {
  address_id_match: boolean | null
  address_id_value: string | null
  address_records_match_level: ConsistencyLevel
  address_submitter_match: boolean
  birth_date_id_match: boolean | null
  // left off here
  birth_date_id_value: any
  birth_date_records_match_level: any
  id_validity: any
  name_id_match: any
  name_id_value: any
  name_records_match_level: any
  name_tax_match: any
  name_tax_value: any
  overall_records_match_level: any
  possibly_deceased: any
  tin_multiple_match: any
  tin_records_match_level: any
}

type IndidividualIdentityDetails = {
  birth_date: string
  citizenship_country: string
  completed_at: string
  consistency_summary: any
  created_by: any
  domicile_location: any
  email: any
  expires_at: any
  first_name: any
  middle_name: any
  last_name: any
  identity_files: any
  marital_status: any
  phone: any
  residence_location: any
  risk_monitor_matches: any
  us_tax_id: any
  foreign_tax_id: any
  user_session: any
}

export type ProfileApi = {
  id: string
  type: EntityKind
  identity_details: []
  user_id: string
  user_providing_for: 'self' | 'controlled-business' | 'other-individual'
  access_expires_at: string | null
  access_revoked_by: 'subject' | null
}
