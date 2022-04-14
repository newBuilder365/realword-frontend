<template>
  <div class="editor-page">
    <div class="container page">
        <div class="row">

            <div class="col-md-10 offset-md-1 col-xs-12">
                <form v-loading='loading'>
                    <fieldset>
                        <fieldset class="form-group">
                            <input v-model='article.title' type="text" class="form-control form-control-lg" placeholder="Article Title">
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
                        </fieldset>
                        <fieldset class="form-group">
                            <textarea v-model="article.body" class="form-control" rows="8"
                                      placeholder="Write your article (in markdown)"></textarea>
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="article.tagList" type="text" class="form-control" placeholder="Enter tags">
                            <div class="tag-list"></div>
                        </fieldset>
                        <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="handleSubmit">
                            Publish Article
                        </button>
                    </fieldset>
                </form>
            </div>

        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { createArticle } from '@/api/article'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'CreateEditArticlePage',
  setup () {
    const article = reactive({
      title: '',
      description: '',
      body: '',
      tagList: ''
    })

    const loading = ref(false)

    const handleSubmit = async () => {
      loading.value = true
      try {
        await createArticle({
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList.split(',')
        })
        ElMessage({
          message: '发布成功',
          type: 'success'
        })
        article.title = ''
        article.description = ''
        article.body = ''
        article.tagList = ''
        loading.value = false
      } catch (error: any) {
        loading.value = false
        console.log(error.response.data)
      }
    }

    return {
      article,
      handleSubmit,
      loading
    }
  }
})
</script>
