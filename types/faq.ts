import { BlocksContent } from "@strapi/blocks-react-renderer";

export interface Faq {
  id: number,
  Question: string,
  Answer: string,
  BlockAnswer: BlocksContent
}