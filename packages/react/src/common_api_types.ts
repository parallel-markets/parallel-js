export type EntityKind = 'individual' | 'business'

export type Location = {
  address_one: string
  address_two: string | null
  city: string
  region: string | null
  postal_code: string
  state: string | null
  country: string
}

export type UserSession = {
  maybe_anonymizing_proxy: boolean
}

export type BusinessType =
  | 'Public Charity'
  | 'Private Foundation'
  | 'S Corporation'
  | 'C Corporation'
  | 'Irrevocable Trust'
  | 'Revocable Trust'
  | 'Partnership LLC'
  | 'Partnership LP'
  | 'Family Office'
