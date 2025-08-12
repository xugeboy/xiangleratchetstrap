import { BlocksContent } from "@strapi/blocks-react-renderer";

export interface Faq {
  id: number,
  Question: string,
  BlockAnswer: BlocksContent,
  title: string,
  isGlobal: boolean,
  product?: {
    id: number,
    name: string,
    slug: string
  },
  sortOrder: number
}