export interface CargoType {
  id: string
  name: string
  icon: string
  category: 'vehicles' | 'home' | 'construction' | 'general'
  description: string
  imageUrl?: string
}

export interface StrapRecommendation {
  quantity: number
  length: string
  wll: string
  accessories: string[]
  proTip: string
  bundleDiscount?: number
  relatedArticle?: string
  videoUrl?: string
}

export interface CargoRecommendation {
  cargoType: CargoType
  recommendation: StrapRecommendation
  additionalOptions?: {
    [key: string]: string[]
  }
}

// 预定义的货物类型
export const CARGO_TYPES: CargoType[] = [
  // 车辆类
  {
    id: 'motorcycle',
    name: 'Motorcycle',
    icon: '🏍️',
    category: 'vehicles',
    description: 'Street bikes, dirt bikes, cruisers'
  },
  {
    id: 'atv-utv',
    name: 'ATV/UTV',
    icon: '🚜',
    category: 'vehicles',
    description: 'All-terrain vehicles, side-by-sides'
  },
  {
    id: 'bicycle',
    name: 'Bicycle',
    icon: '🚲',
    category: 'vehicles',
    description: 'Road bikes, mountain bikes, e-bikes'
  },
  {
    id: 'kayak-canoe',
    name: 'Kayak/Canoe',
    icon: '🛶',
    category: 'vehicles',
    description: 'Watercraft for transport'
  },
  
  // 家居/搬家类
  {
    id: 'appliances',
    name: 'Appliances',
    icon: '🧊',
    category: 'home',
    description: 'Refrigerators, washers, dryers'
  },
  {
    id: 'furniture',
    name: 'Furniture',
    icon: '🪑',
    category: 'home',
    description: 'Sofas, tables, cabinets'
  },
  {
    id: 'boxes',
    name: 'Moving Boxes',
    icon: '📦',
    category: 'home',
    description: 'Cardboard boxes, containers'
  },
  
  // 建材/户外类
  {
    id: 'lumber',
    name: 'Lumber Stack',
    icon: '🪵',
    category: 'construction',
    description: 'Wood boards, beams, plywood'
  },
  {
    id: 'pallets',
    name: 'Standard Pallets',
    icon: '🏗️',
    category: 'construction',
    description: '48" x 40" pallets, euro pallets'
  },
  {
    id: 'tools',
    name: 'Tools & Equipment',
    icon: '🔧',
    category: 'construction',
    description: 'Power tools, hand tools, machinery'
  },
  
  // 通用类
  {
    id: 'general',
    name: 'General Cargo',
    icon: '📋',
    category: 'general',
    description: 'Other items not listed above'
  }
]

// 推荐规则数据库
const RECOMMENDATION_RULES: Record<string, StrapRecommendation> = {
  motorcycle: {
    quantity: 4,
    length: '2.5m - 4m',
    wll: '≥ 400 kg (880 lbs)',
    accessories: ['S-hooks', 'Soft loops', 'Ratchet handles'],
    proTip: 'Compress the front suspension before securing to maintain strap tension during transport.',
    bundleDiscount: 10,
    relatedArticle: '/blog/how-to-secure-motorcycle-transport',
    videoUrl: 'https://youtube.com/watch?v=motorcycle-securing'
  },
  
  'atv-utv': {
    quantity: 4,
    length: '3m - 5m',
    wll: '≥ 500 kg (1100 lbs)',
    accessories: ['S-hooks', 'Soft loops', 'Corner protectors'],
    proTip: 'Use corner protectors on sharp edges and ensure all four corners are secured.',
    bundleDiscount: 10,
    relatedArticle: '/blog/atv-utv-transport-guide'
  },
  
  bicycle: {
    quantity: 2,
    length: '2m - 3m',
    wll: '≥ 200 kg (440 lbs)',
    accessories: ['S-hooks', 'Soft loops'],
    proTip: 'Remove the front wheel and secure the frame to prevent damage to wheels and components.',
    bundleDiscount: 5,
    relatedArticle: '/blog/bicycle-transport-tips'
  },
  
  'kayak-canoe': {
    quantity: 2,
    length: '3m - 5m',
    wll: '≥ 250 kg (550 lbs)',
    accessories: ['S-hooks', 'Fabric protectors', 'Corner guards'],
    proTip: 'Avoid over-tightening to prevent hull damage. Use fabric protectors on gunwales.',
    bundleDiscount: 5,
    relatedArticle: '/blog/kayak-canoe-securing'
  },
  
  appliances: {
    quantity: 2,
    length: '4m - 6m',
    wll: '≥ 500 kg (1100 lbs)',
    accessories: ['S-hooks', 'Fabric protectors', 'Corner guards'],
    proTip: 'Use blankets or fabric protectors to prevent surface scratches and damage.',
    bundleDiscount: 8,
    relatedArticle: '/blog/appliance-transport-guide'
  },
  
  furniture: {
    quantity: 2,
    length: '3m - 5m',
    wll: '≥ 300 kg (660 lbs)',
    accessories: ['S-hooks', 'Fabric protectors', 'Corner guards'],
    proTip: 'Protect delicate surfaces with moving blankets and secure from multiple angles.',
    bundleDiscount: 8,
    relatedArticle: '/blog/furniture-moving-tips'
  },
  
  boxes: {
    quantity: 2,
    length: '2m - 4m',
    wll: '≥ 150 kg (330 lbs)',
    accessories: ['S-hooks', 'Fabric protectors'],
    proTip: 'Stack boxes evenly and secure the entire stack as one unit.',
    bundleDiscount: 5,
    relatedArticle: '/blog/moving-boxes-securing'
  },
  
  lumber: {
    quantity: 3,
    length: '4m - 6m',
    wll: '≥ 400 kg (880 lbs)',
    accessories: ['S-hooks', 'Corner protectors', 'Fabric protectors'],
    proTip: 'Use corner protectors on sharp edges and secure at multiple points along the length.',
    bundleDiscount: 8,
    relatedArticle: '/blog/lumber-transport-guide'
  },
  
  pallets: {
    quantity: 4,
    length: '3m - 5m',
    wll: '≥ 500 kg (1100 lbs)',
    accessories: ['S-hooks', 'Corner protectors'],
    proTip: 'Secure all four corners and use additional straps for longer pallets.',
    bundleDiscount: 10,
    relatedArticle: '/blog/pallet-securing-best-practices'
  },
  
  tools: {
    quantity: 2,
    length: '2m - 4m',
    wll: '≥ 300 kg (660 lbs)',
    accessories: ['S-hooks', 'Fabric protectors', 'Corner guards'],
    proTip: 'Secure heavy tools individually and use padding to prevent damage.',
    bundleDiscount: 8,
    relatedArticle: '/blog/tools-equipment-transport'
  },
  
  general: {
    quantity: 2,
    length: '3m - 5m',
    wll: '≥ 300 kg (660 lbs)',
    accessories: ['S-hooks', 'Fabric protectors'],
    proTip: 'Assess the cargo shape and weight to determine the best securing points.',
    bundleDiscount: 5,
    relatedArticle: '/blog/general-cargo-securing'
  }
}

// 获取货物推荐
export function getCargoRecommendation(cargoId: string): CargoRecommendation | null {
  const cargoType = CARGO_TYPES.find(cargo => cargo.id === cargoId)
  if (!cargoType) return null
  
  const recommendation = RECOMMENDATION_RULES[cargoId]
  if (!recommendation) return null
  
  return {
    cargoType,
    recommendation,
    additionalOptions: getAdditionalOptions(cargoId)
  }
}

// 获取额外选项
function getAdditionalOptions(cargoId: string): Record<string, string[]> | undefined {
  const options: Record<string, Record<string, string[]>> = {
    motorcycle: {
      'Motorcycle Type': ['Dirt Bike', 'Street Bike', 'Cruiser', 'Sport Bike', 'Touring Bike'],
      'Transport Distance': ['Local (< 50 miles)', 'Regional (50-200 miles)', 'Long Distance (> 200 miles)']
    },
    'atv-utv': {
      'Vehicle Size': ['Small (400cc)', 'Medium (600cc)', 'Large (800cc+)'],
      'Terrain Type': ['Trail Riding', 'Work/Utility', 'Sport/Recreation']
    },
    appliances: {
      'Appliance Type': ['Refrigerator', 'Washing Machine', 'Dryer', 'Dishwasher', 'Oven'],
      'Surface Protection': ['High (Glass/Stainless)', 'Medium (Painted)', 'Low (Basic)']
    },
    furniture: {
      'Furniture Type': ['Sofa/Loveseat', 'Dining Table', 'Bed Frame', 'Dresser', 'Bookcase'],
      'Material': ['Wood', 'Fabric', 'Leather', 'Metal', 'Mixed']
    },
    lumber: {
      'Lumber Type': ['Softwood', 'Hardwood', 'Plywood', 'Beams', 'Mixed'],
      'Stack Height': ['Low (< 2ft)', 'Medium (2-4ft)', 'High (> 4ft)']
    }
  }
  
  return options[cargoId]
}

// 获取所有货物类型
export function getAllCargoTypes(): CargoType[] {
  return CARGO_TYPES
}

// 按类别获取货物类型
export function getCargoTypesByCategory(category: string): CargoType[] {
  return CARGO_TYPES.filter(cargo => cargo.category === category)
}

// 搜索货物类型
export function searchCargoTypes(query: string): CargoType[] {
  const lowerQuery = query.toLowerCase()
  return CARGO_TYPES.filter(cargo => 
    cargo.name.toLowerCase().includes(lowerQuery) ||
    cargo.description.toLowerCase().includes(lowerQuery)
  )
}
