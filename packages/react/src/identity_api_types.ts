// https://developer.parallelmarkets.com/docs/server/identity-api

import { BusinessType, EntityKind, Location, UserSession } from './common_api_types'
import { BusinessProfile, IndividualProfile } from './profile_api_types'

type ConsistencyLevel = 'low' | 'medium' | 'high' | 'none'
type ValidityLevel = 'valid' | 'valid_maybe_expired' | 'expired' | 'unreadable'

type IndividualIdentityDetailsConsistencySummary = {
  address_id_match: boolean | null
  address_id_value: string | null
  address_records_match_level: ConsistencyLevel
  address_submitter_match: boolean
  birth_date_id_match: boolean | null
  birth_date_id_value: string | null
  birth_date_records_match_level: ConsistencyLevel | null
  id_validity: ValidityLevel | null
  name_id_match: boolean | null
  name_id_value: string | null
  name_records_match_level: ConsistencyLevel
  name_tax_match: boolean
  name_tax_value: string
  overall_records_match_level: ConsistencyLevel
  possibly_deceased: boolean
  tin_multiple_match: boolean
  tin_records_match_level: ConsistencyLevel
}

type BusinessIdentityDetailsConsistencySummary = {
  address_records_match_level: ConsistencyLevel
  address_submitter_match: boolean
  name_records_match_level: ConsistencyLevel
  name_tax_match: boolean
  name_tax_value: string
  overall_records_match_level: ConsistencyLevel
  tin_multiple_match: boolean
  tin_records_match_level: ConsistencyLevel
}

type IdentityDocument = {
  download_url: string
  download_url_expires: number
  type: 'drivers-license' | 'state-id-card' | 'passport'
}

type IndividualRiskMonitorMatch = {
  adverse_media: boolean
  birth_date: string
  currently_sanctioned: boolean
  deceased: boolean | null
  disqualified_director: boolean | null
  financial_regulator: boolean | null
  insolvent: boolean | null
  first_name: string
  middle_name: string
  last_name: string
  law_enforcement: boolean | null
  nationality: string
  pep: boolean | null
  previously_sanctioned: boolean
  scope: number
}

type IndividualIdentityDetails = {
  birth_date: string
  citizenship_country: string
  completed_at: string
  created_by: IndividualProfile | null
  consistency_summary: IndividualIdentityDetailsConsistencySummary
  domicile_location: Location
  email: string
  expires_at: string
  first_name: string
  middle_name: string
  last_name: string
  identity_files: [IdentityDocument]
  marital_status: 'single' | 'married' | 'separated' | 'divorced'
  phone: string
  residence_location: Location
  risk_monitor_matches: [IndividualRiskMonitorMatch]
  us_tax_id: string | null
  foreign_tax_id: string | null
  user_session: UserSession
}

type BusinessIdentityDetails = {
  business_type: BusinessType
  completed_at: string
  consistency_summary: BusinessIdentityDetailsConsistencySummary
  control_persons: [ControlPerson]
  created_by: IndividualProfile
  direct_beneficial_owners: [BeneficialOwner]
  expires_at: string
  foreign_tax_id: string | null
  identity_files: [IdentityDocument]
  incorporation_country: string
  incorporation_region: string | null
  incorporation_state: string | null
  name: string
  primary_contact: IndividualProfile
  principal_location: Location
  risk_monitor_matches: [IndividualRiskMonitorMatch]
  us_tax_id: string | null
  user_session: UserSession
}

type ControlPerson = {
  id: string | null
  type: 'individual'
  title: string
  profile: IndividualProfile
}

type BeneficialOwnerBase = {
  id: string | null
  ownership_percent: number
}

type BeneficialOwnerIndividual = BeneficialOwnerBase & {
  type: 'individual'
  profile: IndividualProfile
}

type BeneficialOwnerBusiness = BeneficialOwnerBase & {
  type: 'business'
  profile: BusinessProfile
}

type BeneficialOwner = BeneficialOwnerIndividual | BeneficialOwnerBusiness

export type IdentityApiResponse = IndividualIdentityDetails | BusinessIdentityDetails
