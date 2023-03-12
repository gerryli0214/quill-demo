<template>
  <div id="#app" class="full">
    <div class="local-stream-page">
      <video autoplay controls muted id="elA"></video>
      <video autoplay controls muted id="elB"></video>
      <button @click="onStart">播放</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'webRtc',
    data () {
      return {
        peerA: null,
        peerB: null,
        videoElA: null,
        videoElB: null
      }
    },
    mounted () {
      this.videoElA = document.getElementById('elA')
      this.videoElB = document.getElementById('elB')
    },
    methods: {
      async peerInit (stream) {
        // 1. 创建连接实例
        this.peerA = new RTCPeerConnection()
        this.peerB = new RTCPeerConnection()
        // 2. 添加视频流轨道
        stream.getTracks().forEach(track => {
          this.peerA.addTrack(track, stream)
        })
        // 添加 candidate
        this.peerA.onicecandidate = event => {
          if (event.candidate) {
            this.peerB.addIceCandidate(event.candidate)
          }
        }
        // 检测连接状态
        this.peerA.onconnectionstatechange = event => {
          if (this.peerA.connectionState === 'connected') {
            console.log('对等连接成功！')
          }
        }
        // 监听数据传来
        this.peerB.ontrack = async event => {
          const [remoteStream] = event.streams
          this.videoElB.srcObject = remoteStream
        }
        // 互换sdp认证
        this.transSDP()
      },
      async transSDP () {
        // 1. 创建 offer
        let offer = await this.peerA.createOffer()
        await this.peerB.setRemoteDescription(offer)
        console.log(offer)
        // 2. 创建 answer
        let answer = await this.peerB.createAnswer()
        await this.peerB.setLocalDescription(answer)
        console.log(answer)
        // 3. 发送端设置 SDP
        await this.peerA.setLocalDescription(offer)
        await this.peerA.setRemoteDescription(answer)
      },
      async onStart () {
        try {
          var stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          })
          if (this.videoElA) {
            this.videoElA.srcObject = stream // 在 video 标签上播放媒体流
          }
          this.peerInit(stream) // 初始化连接
        } catch (error) {
          console.log('error：', error)
        }
      },
      async getNewStream () {
        var stream = new MediaStream()
        let audio_stm = await navigator.mediaDevices.getUserMedia({
          audio: true
        })
        let video_stm = await navigator.mediaDevices.getDisplayMedia({
          video: true
        })
        audio_stm.getAudioTracks().map(row => stream.addTrack(row))
        video_stm.getVideoTracks().map(row => stream.addTrack(row))
        return stream
      }
    }
  }
</script>