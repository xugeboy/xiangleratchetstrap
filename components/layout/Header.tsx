import HeaderClient from './header-client';
import { useCategories } from '@/contexts/CategoryContext';

const company = [
  { name: 'About us', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'Support', href: '#' },
  { name: 'Press', href: '#' },
  { name: 'Blog', href: '#' },
]

export default function Header() {
  // 从 Context 获取分类数据
  const { categories } = useCategories();
  // 过滤出顶级分类（没有父分类的分类）
  const topLevelCategories = categories.filter(category => !category.parent);

  return (
    <HeaderClient
      topLevelCategories={topLevelCategories}
      company={company}
    />
  );
}
