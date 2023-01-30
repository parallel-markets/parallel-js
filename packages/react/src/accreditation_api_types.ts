import { EntityKind } from './common_api_types'

type AccreditationStatus = 'current' | 'pending' | 'submitter_pending' | 'third_party_pending' | 'expired' | 'rejected'
type AccreditationAssertionKind = 'income' | 'net-worth' | 'evaluator-assertion' | 'professional-license'

// https://developer.parallelmarkets.com/docs/server/data-structures#accreditation-document
type AccreditationDocument = {
  download_url: string
  download_url_expires: number
  type: 'certification-letter'
}

// https://developer.parallelmarkets.com/docs/server/data-structures#individual-accreditation
type IndividualAccreditation = {
  id: string
  status: AccreditationStatus
  expires_at: number
  assertion_type: AccreditationAssertionKind
  created_at: number
  first_name: string
  last_name: string
  documents: [AccreditationDocument]
}

// https://developer.parallelmarkets.com/docs/server/data-structures#business-accreditation
type BusinessAccreditation = {
  id: string
  status: AccreditationStatus
  expires_at: number
  assertion_type: AccreditationAssertionKind
  created_at: number
  name: string
  documents: [AccreditationDocument]
}

// https://developer.parallelmarkets.com/docs/server/accreditations-api

type AccreditationsApiBase = {
  id: string
  user_id: string
  type: EntityKind
  indicated_unaccredited: number | null
  accreditations: [IndividualAccreditation | BusinessAccreditation]
}
type AccreditationsApiIndividual = AccreditationsApiBase & {
  type: 'individual'
  accreditations: [IndividualAccreditation]
}
type AccreditationsApiBusiness = AccreditationsApiBase & {
  type: 'business'
  accreditations: [BusinessAccreditation]
}

export type AccreditationsApi = AccreditationsApiIndividual | AccreditationsApiBusiness
