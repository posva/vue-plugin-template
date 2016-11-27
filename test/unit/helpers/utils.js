import Vue from 'vue/dist/vue.js'

export function createVM (context, template) {
  return window.__karma__
    ? createKarmaTest(context, template)
    : createVisualTest(context, template)
}

export function createKarmaTest (context, template) {
  context.DOMElement = document.createElement('div')
  const render = typeof template === 'string'
          ? { template }
        : { render: template }
  return new Vue({
    el: context.DOMElement,
    name: 'Test',
    ...render
  }).$mount()
}

export function createVisualTest (context, template) {
  const render = typeof template === 'string'
          ? { template: `
<div class="test-dom-container" id="${context.DOMElement.id}">
${template}
</div>
` }
        : {
          render: h => {
            return h('div', {
              attrs: {
                class: 'test-dom-container',
                id: context.DOMElement.id
              }
            }, [h({ render: template })])
          }
        }
  return new Vue({
    el: context.DOMElement,
    name: 'Test',
    ...render
  })
}

export function register (name, component) {
  Vue.component(name, component)
}
