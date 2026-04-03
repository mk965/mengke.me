export interface Supporter {
  name?: string
  amount?: number
  currency?: 'CNY' | 'USD' | 'SOL'
  date: string
  message?: string
  via: 'Ko-fi' | 'WeChat' | 'Other'
}

export const SUPPORTERS: Supporter[] = [
  { amount: 0.5, currency: 'CNY', date: '2023-08-06', via: 'WeChat' },
  {
    name: '天使酱',
    amount: 5,
    currency: 'USD',
    date: '2023-08-15',
    via: 'Ko-fi',
    message: '加油！',
  },
  {
    name: 'Jessie',
    amount: 6.66,
    currency: 'CNY',
    date: '2023-08-31',
    via: 'WeChat',
    message: '感谢你一直以来的内容和工具，真的超级实用！',
  },
  { amount: 3.33, currency: 'CNY', date: '2023-09-03', via: 'WeChat' },
  { name: '未命名用户', amount: 10, currency: 'USD', date: '2023-09-12', via: 'Ko-fi' },
  { name: '芋圆啵啵', amount: 2.5, currency: 'CNY', date: '2023-10-16', via: 'WeChat' },
  { name: '清风与猫', amount: 5.2, currency: 'CNY', date: '2023-10-21', via: 'WeChat' },
  { name: 'Eliot', amount: 6, currency: 'CNY', date: '2023-12-10', via: 'WeChat' },
  { name: 'Sherry 🍒', amount: 5, currency: 'USD', date: '2023-12-25', via: 'Ko-fi' },
  { name: 'Zoe_小行星', amount: 0.22, currency: 'CNY', date: '2024-01-20', via: 'WeChat' },
  { name: '破晓', amount: 7.7, currency: 'CNY', date: '2024-03-03', via: 'WeChat' },
  { name: 'MIKU233', amount: 3.5, currency: 'CNY', date: '2024-04-02', via: 'WeChat' },
  { name: '晚安豆腐', amount: 0.15, currency: 'CNY', date: '2024-05-25', via: 'WeChat' },
  { amount: 2.22, currency: 'CNY', date: '2024-06-02', via: 'WeChat' },
  { name: 'Hana', amount: 1.88, currency: 'CNY', date: '2024-07-08', via: 'WeChat' },
  { amount: 1.11, currency: 'CNY', date: '2024-08-01', via: 'WeChat' },
  { name: 'Dong', amount: 5, currency: 'USD', date: '2024-08-23', via: 'Ko-fi' },
  { name: 'LazyRain', amount: 0.01, currency: 'CNY', date: '2024-09-10', via: 'WeChat' },
  { name: '💤', amount: 0.3, currency: 'CNY', date: '2024-11-06', via: 'WeChat' },
  { name: '匿名喵', amount: 1.2, currency: 'CNY', date: '2024-12-12', via: 'WeChat' },
  { amount: 4, currency: 'CNY', date: '2025-01-15', via: 'WeChat' },
  {
    name: '雾里有光',
    amount: 10,
    currency: 'CNY',
    date: '2025-01-27',
    via: 'WeChat',
    message: '支持！参考了',
  },
  { name: 'loft_沉', amount: 0.88, currency: 'CNY', date: '2025-02-09', via: 'WeChat' },
  { amount: 2.5, currency: 'CNY', date: '2025-02-18', via: 'WeChat' },
  { name: '33', amount: 0.6, currency: 'CNY', date: '2025-03-05', via: 'WeChat' },
  {
    name: '空想主义者',
    amount: 0.5,
    currency: 'CNY',
    date: '2025-03-21',
    via: 'WeChat',
    message: '前端活动页那块我之前有参考过，受益良多',
  },
  { name: 'somebody', amount: 5, currency: 'USD', date: '2025-03-29', via: 'Ko-fi' },
  { name: 'Yanyan', amount: 5, currency: 'USD', date: '2025-04-13', via: 'Ko-fi' },
  { name: '北海', amount: 0.6, currency: 'CNY', date: '2025-04-19', via: 'WeChat' },
  {
    name: 'Minie',
    amount: 5,
    currency: 'USD',
    date: '2025-05-05',
    via: 'Ko-fi',
    message: 'Hope this helps you keep doing what you love!',
  },
  { name: '阿蓝', amount: 0.66, currency: 'CNY', date: '2025-05-12', via: 'WeChat' },
  { name: '默', amount: 66.66, currency: 'CNY', date: '2025-06-25', via: 'WeChat' },
  { name: 'Livid', amount: 0.001, currency: 'SOL', date: '2025-07-22', via: 'Other' },
  { name: 'Yoooungvon', amount: 0.005, currency: 'SOL', date: '2025-07-22', via: 'Other' },
  { name: '10号郭一贝', amount: 1, currency: 'CNY', date: '2026-01-02', via: 'WeChat' },
]
