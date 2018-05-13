<template>
  <div id="app">
    <barousel :list="setList()"
              :width="800"
              :height="280"
              :imgType="'full'"
              :mask="true"
              :arrow="true"
              :autoBegin="false"
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
