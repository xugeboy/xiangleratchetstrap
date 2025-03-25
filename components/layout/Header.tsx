import { getAllProductCategories } from '@/services/api/productCategory';
import HeaderClient from './header-client';

const company = [
  { name: 'About us', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'Support', href: '#' },
  { name: 'Press', href: '#' },
  { name: 'Blog', href: '#' },
]

export default async function Header() {
  // 服务端数据获取
  const productCategories = await getAllProductCategories();
  
  // 过滤出顶级分类（没有父分类的分类）
  const topLevelCategories = productCategories.filter(category => !category.parent);

  return (
    <HeaderClient
      topLevelCategories={topLevelCategories}
      company={company}
    />
  );
}
