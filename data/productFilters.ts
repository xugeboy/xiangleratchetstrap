export const productFilters = [
  {
    id: 'material',
    name: '材质',
    options: [
      { value: 'steel', label: '钢材' },
      { value: 'alloy', label: '合金' },
      { value: 'polyester', label: '聚酯纤维' },
      { value: 'nylon', label: '尼龙' }
    ]
  },
  {
    id: 'working_load_limit',
    name: '工作负载',
    options: [
      { value: '1000-2000', label: '1,000 - 2,000 lbs' },
      { value: '2000-5000', label: '2,000 - 5,000 lbs' },
      { value: '5000-10000', label: '5,000 - 10,000 lbs' },
      { value: '10000+', label: '10,000+ lbs' }
    ]
  },
  {
    id: 'length',
    name: '长度',
    options: [
      { value: '0-10', label: '0 - 10 ft' },
      { value: '10-20', label: '10 - 20 ft' },
      { value: '20-30', label: '20 - 30 ft' },
      { value: '30+', label: '30+ ft' }
    ]
  },
  {
    id: 'grade',
    name: '等级',
    options: [
      { value: '70', label: 'Grade 70' },
      { value: '80', label: 'Grade 80' },
      { value: '100', label: 'Grade 100' },
      { value: '120', label: 'Grade 120' }
    ]
  },
  {
    id: 'finish',
    name: '表面处理',
    options: [
      { value: 'zinc', label: '镀锌' },
      { value: 'painted', label: '喷漆' },
      { value: 'powder_coated', label: '粉末涂层' },
      { value: 'plain', label: '原色' }
    ]
  }
] 