<template>
  <div class="borousel_container" ref="bc"
       :style="containerStyle"
       @mouseover="pause()"
       @mouseout="run()">
    <div class="context" :class="mask?'mask':''">
      <figure v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :class="setClass(index)"
        @click="callback(index)" :style="setBG(item.src)">
      </figure>
      <i v-show="arrow" class="iconfont icon-icon_on_the_left" @click="prevItem()"></i>
      <i v-show="arrow" class="iconfont icon-icon_on_the_right" @click="nextItem()"></i>
    </div>
    <div class="tab" v-if="tab">
      <span v-for="(item,i) in list" :key="i"
        :style="setTab(i)"
        @mouseover="current = i"></span>
    </div>
  </div>
</template>

<script>
  import '../assets/iconfont.css'
  export default {
    name: "Barousel",
    data () {
      return {
        current: 0,
        domList: null,
        timer: null
      }
    },
    props: {
      // 数据数组 [{src: '1.jpg', title: '图片'}]
      list: {
        required: true
      },
      // 容器宽度
      width: {
        default: 800
      },
      // 容器高度
      height: {
        default: 300
      },
      // 图片显示模式
      imgType: {
        default: 'full'
      },
      // 是否自动播放
      autoBegin: {
        default: true
      },
      // 遮罩
      mask: {
        default: true
      },
      // 播放间隔
      interval: {
        default: 5000
      },
      // 是否开启底部导航
      tab: {
        default: true
      },
      // 是否开启左右箭头
      arrow: {
        default: true
      },
      // 底部 tab 激活时颜色
      color: {
        default: 'rgb(248, 85, 85)'
      }
    },
    computed: {
      containerStyle () {
        return {
          width: this.width + 'px',
          height: this.height +'px',
          perspective: this.width +'px',
          backgroundSize: this.imgType == 'full' ? '100% 100%' : this.imgType
        }
      }
    },
    mounted () {
      this.domList =  this.$refs.bc.querySelectorAll('figure');
      this.run();
    },
    methods: {
      setClass (i) {
        let next = this.current === (this.list.length - 1) ? 0 : this.current + 1;
        let prev = this.current === 0 ? this.list.length - 1 : this.current - 1;
        switch (i) {
          case this.current:
            return 'now';
          case next:
            return 'next';
          case prev:
            return 'prev';
          default:
            return '';
        }
      },
      setBG (src) {
        return {
          backgroundImage: 'url('+src+')'
        }
      },
      setTab (i) {
        return i === this.current ? {
          backgroundColor: this.color
        } : {
          backgroundColor: '#ccc'
        }
      },
      run () {
        this.pause();
       if (this.autoBegin) {
         this.timer = setInterval(()=>{
           this.nextItem();
         },this.interval)
       }
      },
      pause () {
        clearInterval(this.timer);
      },
      nextItem () {
        this.current = ++this.current%this.list.length;
      },
      prevItem () {
        this.current = this.current === 0 ? this.list.length - 1 : this.current - 1;
      },
      callback (i) {
        if (i === this.current){
          this.$emit('barousel', i);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.borousel_container{
  text-align: center;
  padding: 10px 0;
  position: relative;
  .context{
    position: relative;
    width: 100%;
    height: calc(100% - 20px);
    left: 0%;
    top: 0%;
    margin: 0px;
    padding: 0px;
    background-size: inherit;
    figure {
      position: absolute;
      margin: 0;
      padding: 0;
      top: 0;
      left: 50%;
      width: 65%;
      height: 100%;
      transition: 500ms all ease-in-out;
      background: {
        color: #fff;
        repeat: no-repeat;
        position: center;
        size: inherit;
      };
      transform: translate3d(-50%,0,-80px);
      z-index: -1;
      &:before{
          position: absolute;
          content: "";
          width:100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0);
          transition-delay: 300ms!important;
          transition: all 800ms;
      }
      &.now{
         transform: translate3d(-50%,0,0);
         cursor: pointer;
         z-index: 10;
      }
      &.prev{
         transform: translate3d(-75%,0,-40px);
      }
      &.next{
         transform: translate3d(-25%,0,-40px);
      }
    }
    i{
      width: 17.5%;
      display: none;
      position: absolute;
      font-size: 24px;
      top: 50%;
      color: rgba(255, 255, 255, 0.38);
      text-shadow: 0 0 24px rgba(0,0,0,0.18);
      cursor: pointer;
      &:first-child{
        left: 0;
      }
      &:last-child{
        right: 0;
      }
      &:hover{
        color: rgba(255, 255, 255, 0.8);
      }
    }
     &:hover{
      i{
        display: block;
      }
    }
    &.mask{
      figure {
        &.prev,&.next{
          &:before{
            background-color: rgba(0, 0, 0, 0.50);
          }
        }
      }
    }
  }
  .tab {
    width: 100%;
    height: 20px;
    span{
      display: inline-block;
      width: 20px;
      height: 4px;
      margin: 1px 5px;
      background-color: #ccc;
      cursor: pointer;
    }
  }
}
</style>
