import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Product } from "./product";

export interface Faq {
  id: number,
  Question: string,
  TextAnswer: string,
  BlockAnswer: BlocksContent,
  title: string,
  isGlobal: boolean,
  product?: Product,
  sortOrder: number
}