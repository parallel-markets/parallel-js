export type EntityKind = 'individual' | 'business'

export type IndividualProfile = {
  email: string | null
  first_name: string
  last_name: string
}

export type BusinessProfile = {
  name: string
  business_type: string
  primary_contact: IndividualProfile | null
}
