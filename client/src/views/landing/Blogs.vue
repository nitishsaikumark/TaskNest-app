<script setup>
import { ref, watchEffect, watch } from 'vue';
import BlogCard from '@/components/Landing/BlogCard.vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '@/composables/axios';


const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
const posts = ref([]);
const page = ref(Number(route.query.page) || 1)
const getBlogPosts = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get(`/blog/posts`, {
      params: {
        limit: 9,
        page: page.value
      },
      withCredentials: true
    })
    posts.value = response.data;
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false;
  }
}
watchEffect(async () => {
  await getBlogPosts();
})

const selectPage = () => {
  window.history.replaceState(null, '', `?page=${page.value}`)
}

watch(page, () => {
  getBlogPosts();
}, { deep: true, immediate: true, })



</script>

<template>
  <div>
    <h1>
      Blog
    </h1>
    <v-row class="mt-5">
      <template v-if="isLoading">
        <v-col cols="12" md="3" v-for="i in 12">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12" md="3" v-for="post in posts.results">
          <BlogCard :post />
        </v-col>
      </template>
    </v-row>

    <v-pagination v-model="page" color="primary" @update:model-value="(page) => selectPage(page)"
      :length="posts.totalPages" rounded="large"></v-pagination>
  </div>
</template>
