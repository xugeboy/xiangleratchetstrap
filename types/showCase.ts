import { Galleries, Gallery } from "./gallery";

export interface StrapiMeta {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }
  
  /**
   * 最终在应用组件中使用的、简洁的产品案例数据结构。
   * 这个类型直接匹配您自定义 Strapi 端点返回的数据格式。
   */
  export interface ShowCase {
      id: number;
      description: string;
      publishedAt: string;
      image: Gallery;
      gallery: Galleries;
  }
  
  /**
   * API 响应的完整结构，它直接包含处理好的 ShowCase 数组。
   */
  export interface ShowCaseApiResponse {
    data: ShowCase[];
    meta: StrapiMeta;
  }