import Vue from 'vue/dist/vue.js'

const isKarma = !!window.__karma__

export function createVM (context, template, opts = {}) {
  return isKarma
    ? createKarmaTest(context, template, opts)
    : createVisualTest(context, template, opts)
}

export function createKarmaTest (context, template, opts) {
  const el = document.createElement('div')
  document.getElementById('tests').appendChild(el)
  const render = typeof template === 'string'
               ? { template }
               : { render: template }
  return new Vue({
    el,
    name: 'Test',
    ...render,
    ...opts
  })
}

export function createVisualTest (context, template, opts) {
  const render = typeof template === 'string'
          ? { template: `
<div class="test-dom-container" id="${context.DOMElement.id}">
${template}
</div>
` }
        : {
          render: h => (
            <div class='test-dom-container'
                 id={context.DOMElement.id}
            >
              {
                h({
                  render: template,
                  name: 'JsxTestContainer',
                  ...opts
                })
              }
            </div>
          )
        }
  return new Vue({
    el: context.DOMElement,
    name: 'Test',
    ...render,
    ...opts
  })
}

export function register (name, component) {
  Vue.component(name, component)
}
