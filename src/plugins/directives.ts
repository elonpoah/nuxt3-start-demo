
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus', {
    mounted (el) {
      console.log('focus');
      el.focus()
    },
    getSSRProps (binding, vnode) {
      // you can provide SSR-specific props here
      return {}
    }
  });
  nuxtApp.vueApp.directive('lazy', {
    mounted(el, binding) {
      const defaultImg = '/_nuxt/assets/girl.png'
      if (!el.src) { el.src = defaultImg; el.classList.add('loading') }
      const observer = new IntersectionObserver(async ([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          el.onerror = () => { el.src = defaultImg; el.classList.replace('loading', 'error') }
          el.onload = () => el.classList.replace('loading', 'loaded')
          if (!binding.value) return;
          el.src = binding.value
        }
      }, {
        threshold: 0.01
      })
      observer.observe(el)
    }
  })
})