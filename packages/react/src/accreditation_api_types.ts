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
  expires_at: number | null
  assertion_type: AccreditationAssertionKind
  created_at: number
  certified_at: number | null
  first_name: string
  last_name: string
  documents: [AccreditationDocument]
}

// https://developer.parallelmarkets.com/docs/server/data-structures#business-accreditation
type BusinessAccreditation = {
  id: string
  status: AccreditationStatus
  expires_at: number | null
  assertion_type: AccreditationAssertionKind
  created_at: number
  certified_at: number | null
  name: string
  documents: [AccreditationDocument]
}

// https://developer.parallelmarkets.com/docs/server/accreditations-api

type AccreditationsResponseBase = {
  id: string
  user_id: string
  type: EntityKind
  indicated_unaccredited: number | null
  accreditations: [IndividualAccreditation | BusinessAccreditation]
}

type AccreditationsResponseIndividual = AccreditationsResponseBase & {
  type: 'individual'
  accreditations: [IndividualAccreditation]
}

type AccreditationsResponseBusiness = AccreditationsResponseBase & {
  type: 'business'
  accreditations: [BusinessAccreditation]
}

export type AccreditationsApiResponse = AccreditationsResponseIndividual | AccreditationsResponseBusiness
