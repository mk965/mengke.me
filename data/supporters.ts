export interface Supporter {
  name: string
  amount?: number
  currency?: 'CNY' | 'USD'
  date: string
  message?: string
  via: 'Ko-fi' | 'WeChat' | 'Other'
}

export const SUPPORTERS: Supporter[] = []
