import { request } from '@/utils/request'

export interface Article {
  title: string,
  description: string,
  body: string,
  tagList: string[]
}

// 创建文章
const createArticle = (data: Article) => {
  return request.post<Article>('/api/articles', data)
}

interface QueryArticlesInput {
  pageSize: number
  pageNum: number
}

// 获取所有文章
const getAllArticles = (data: QueryArticlesInput) => {
  return request.get('/api/articles', {
    params: data
  })
}

export {
  createArticle,
  getAllArticles
}
