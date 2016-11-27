import Vue from 'vue/dist/vue.js'

export function createVM (context, template) {
  return window.__karma__
    ? createKarmaTest(context, template)
    : createVisualTest(context, template)
}

export function createKarmaTest (context, template) {
  context.DOMElement = document.createElement('div')
  return new Vue({
    el: context.DOMElement,
    name: 'Test',
    template
  }).$mount()
}

export function createVisualTest (context, template) {
  return new Vue({
    el: context.DOMElement,
    name: 'Test',
    template: `
<div class="test-dom-container" id="${context.DOMElement.id}">
${template}
</div>
`
  })
}
