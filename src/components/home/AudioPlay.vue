<template>
  <div class="music-player" @mousedown="dragStart" @mousemove="dragging" @mouseup="dragEnd" @mouseleave="dragEnd">
    <audio ref="musicPlayer" :src="musicSrc"></audio>
    <div class="play-button" @click="togglePlay">
      <div :class="{ 'rotating': isPlaying }">♫</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      musicSrc: 'src/assets/songs/Novelbright - 雪の音 [Official Music Video].mp3', // 音乐文件路径
      isDragging: false,
      startX: 0,
      startY: 0,
      isPlaying: false
    };
  },
  methods: {
    dragStart(event) {
      this.isDragging = true;
      this.startX = event.clientX - this.$el.offsetLeft;
      this.startY = event.clientY - this.$el.offsetTop;
      event.preventDefault();
    },
    dragging(event) {
      if (this.isDragging) {
        this.$el.style.left = `${event.clientX - this.startX}px`;
        this.$el.style.top = `${event.clientY - this.startY}px`;
      }
    },
    dragEnd() {
      this.isDragging = false;
      // Hide the player if it's dragged to the bottom-right corner
      if (window.innerWidth - (this.$el.offsetLeft + this.$el.offsetWidth) < 50 &&
          window.innerHeight - (this.$el.offsetTop + this.$el.offsetHeight) < 50) {
      }
    },
    togglePlay() {
      const audio = this.$refs.musicPlayer;
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
    }
  }
};
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #FFC0CB;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.play-button {
  font-size: 30px;
  color: #FFF;
}

.rotating {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

audio {
  display: none;
}
</style>