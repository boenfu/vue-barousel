
# vue-barousel



### 网易云音乐同款 轮播图 组件



![http://boenfu.cn/vue-barousel/demo.gif]()

​



> demo:  http://boenfu.cn/vue-barousel/



## Install



```
npm install vue-barousel --save
```



## Use

###   1.Import  导入



```js
ES6

// 方法1.通过use挂载
import VueBarousel from 'vue-barousel
Vue.use(VueBarousel)


//  方法2.通过require 导入
var VueBarousel = require('VueBarousel')



// 方法3.或者直接导入js文件
<script src="./dist/vue-barousel.js"></script>

```



###   2.Basic Usage  基础用法 



2. 任意位置导入组件（选项数组必传，格式见配置项）

   例：

   ```vue
   <barousel :list="[{src: '图片路径', title: '图片title'}]"></barousel>
   ```




### 3.Options  配置项

|   选项名   | 是否必须 |      默认值      |                     介绍                      |
| :--------: | :------: | :--------------: | :-------------------------------------------: |
|   :list    |   true   |        无        | 选项数组{src: '图片路径', title: '图片title'} |
| @barousel  |  false   |        无        |               返回触发元素序号                |
|   :width   |  false   |       800        |                   容器宽度                    |
|  :height   |  false   |       300        |                   容器高度                    |
|   :arrow   |  false   |       true       |               是否开启前后箭头                |
|  :imgType  |  false   |       full       |                 图片显示模式                  |
| :autoBegin |  false   |       true       |                 是否自动播放                  |
|   :mask    |  false   |       true       |                 前后图片遮罩                  |
| :interval  |  false   |       5000       |                 播放间隔 (ms)                 |
|    :tab    |  false   |       true       |               是否开启底部导航                |
|   :color   |  false   | rgb(248, 85, 85) |              底部 tab 激活时颜色              |

详细介绍：

1. 数组格式如下

   ```js
   [{
         title: '这是一张图片', //可选
         src: 'xx.jpg'  //图片地址
   }]
   ```

   ​

2. imgType

   等同于 background-size

   可选项 full  cover  contain

   full 宽高皆为 100%

   cover 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。

   contain 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。

   ​

   此时 @contextmenu="\$easycm(\$event,\$root,[tag])" 需要加上 tag 的值

   如:

   ```vue
   <div @contextmenu="$easycm($event,$root,1)">
       <p @contextmenu="$easycm($event,$root,2)"></p>
   </div>
   <easy-cm :tag="1"></easy-cm>
   <easy-cm :tag="2"></easy-cm>
   ```

   这个时候 在 p 元素上会触发 tag 为 2 的菜单

   div 的其他部分会触发 tag 为 1 的菜单

   ​

3. barousel--> 回调函数

   解释：返回触发的序号，便于触发相应逻辑 

   ​

   *数值参数均无需带单位






## Demo Code



```vue
// gif 图源码
<template>
  <div id="app">
    <barousel :list="setList()"
              :width="800"
              :height="280"
              :imgType="'full'"
              @barousel="cb">
    </barousel>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    setList() {
      let list = [];
      for(let i =1 ; i<= 8;i++){
        list.push({
          title: i,
          src: 'static/img/'+i+'.jpg'
        })
      }
      return list;
    },
    cb (i) {
      alert(i);
    }
  }
}
</script>
```
