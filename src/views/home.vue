<template>
  <div class="home-page">
    <div class="banner">
        <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
        </div>
    </div>

    <div class="container page">
        <div class="row">

            <div class="col-md-9">
                <div class="feed-toggle">
                    <ul class="nav nav-pills outline-active">
                        <li class="nav-item" v-show='$store.state.user'>
                            <a class="nav-link" href="">Your Feed</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="">Global Feed</a>
                        </li>
                    </ul>
                </div>

                <div class="article-preview" v-for="article in articles.articles" :key="article._id">
                    <div class="article-meta">
                        <router-link :to='{
                                name: "profile",
                                params: {
                                    username: article.author.username
                                }
                            }'><img :src='article.author.image || "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"'/></router-link>
                        <div class="info">
                            <router-link :to='{
                                name: "profile",
                                params: {
                                    username: article.author.username
                                }
                            }' class="author">{{ article.author.username}}</router-link>
                            <span class="date">{{ this.$moment(article.createdAt).format("YYYY-MM-DD") }}</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm pull-xs-right">
                            <i class="ion-heart"></i> {{ article.favoritesCount }}
                        </button>
                    </div>
                    <a href="" class="preview-link">
                        <h1>{{ article.description }}</h1>
                        <p>This is the description for the post.</p>
                        <span>Read more...</span>
                    </a>
                </div>
                <hr />
                <el-pagination
                  background layout="sizes, prev, pager, next"
                  :page-sizes="[3, 5, 10, 20, 50]"
                  :total="articles.articlesCount"
                  v-model:currentPage="pageNum"
                  v-model:page-size="pageSize"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
            </div>

            <div class="col-md-3">
                <div class="sidebar">
                    <p>Popular Tags</p>

                    <div class="tag-list">
                        <a href="" class="tag-pill tag-default">programming</a>
                        <a href="" class="tag-pill tag-default">javascript</a>
                        <a href="" class="tag-pill tag-default">emberjs</a>
                        <a href="" class="tag-pill tag-default">angularjs</a>
                        <a href="" class="tag-pill tag-default">react</a>
                        <a href="" class="tag-pill tag-default">mean</a>
                        <a href="" class="tag-pill tag-default">node</a>
                        <a href="" class="tag-pill tag-default">rails</a>
                    </div>
                </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getAllArticles } from '@/api/article'

export default defineComponent({
  name: 'HomePage',
  setup () {
    const pageSize = ref(3)
    const pageNum = ref(1)
    const articles = ref([])
    onMounted(async () => {
      try {
        const { data } = await getAllArticles({ pageSize: pageSize.value, pageNum: pageNum.value })
        articles.value = data
      } catch (error: any) {
        console.log(error.response.data)
      }
    })

    const handleSizeChange = async (val: number) => {
      try {
        const { data } = await getAllArticles({ pageSize: val, pageNum: pageNum.value })
        articles.value = data
      } catch (error: any) {
        console.log(error.response.data)
      }
    }

    const handleCurrentChange = async (val: number) => {
      try {
        const { data } = await getAllArticles({ pageSize: pageSize.value, pageNum: val })
        articles.value = data
      } catch (error: any) {
        console.log(error.response.data)
      }
    }
    return {
      articles,
      pageSize,
      pageNum,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
