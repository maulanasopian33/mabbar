<template>
    <div>
      <!-- Jika video adalah file langsung (MP4, WebM, dll.) -->
      <video v-if="isDirectVideo" width="600" controls>
        <source :src="videoUrl" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  
      <!-- Jika video adalah dari YouTube -->
      <iframe
        v-else-if="isYouTube"
        class="w-full h-56"
        :src="youtubeEmbedUrl"
        frameborder="0"
        allowfullscreen
      ></iframe>
  
      <!-- Jika URL tidak valid -->
      <p v-else>URL tidak valid atau tidak didukung.</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      videoUrl: {
        type: String,
        required: true,
      },
    },
    computed: {
      // Cek apakah video berasal dari YouTube
      isYouTube() {
        return /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]+)/.test(
          this.videoUrl
        );
      },
      // Cek apakah video adalah file langsung (MP4, WebM, dll.)
      isDirectVideo() {
        return /\.(mp4|webm|ogg)$/i.test(this.videoUrl);
      },
      // Konversi YouTube URL ke embed format
      youtubeEmbedUrl() {
        const match = this.videoUrl.match(
          /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]+)/
        );
        return match ? `https://www.youtube.com/embed/${match[1]}?modestbranding=1` : "";
      },
    },
  };
  </script>
  