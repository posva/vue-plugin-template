<template>
  <div class="ripple-container"
       @mousedown="startRipple"
  >
    <slot></slot>
    <div class="rippleJS"></div>
  </div>
</template>

<script>
function startRipple (type, at) {
  var holder = at.target
  var cl = holder.classList
  if (!cl.contains('rippleJS')) {
    return false  // ignore
  }

  // Store the event use to generate this ripple on the holder: don't allow
  // further events of different types until we're done. Prevents double-
  // ripples from mousedown/touchstart.
  var prev = holder.getAttribute('data-event')
  if (prev && prev !== type) {
    return false
  }
  holder.setAttribute('data-event', type)

  // Create and position the ripple.
  var rect = holder.getBoundingClientRect()
  var x = at.offsetX
  var y
  if (x !== undefined) {
    y = at.offsetY
  } else {
    x = at.clientX - rect.left
    y = at.clientY - rect.top
  }
  var ripple = document.createElement('div')
  var max
  if (rect.width === rect.height) {
    max = rect.width * 1.412
  } else {
    max = Math.sqrt(rect.width * rect.width + rect.height * rect.height)
  }
  var dim = max * 2 + 'px'
  ripple.style.width = dim
  ripple.style.height = dim
  ripple.style.marginLeft = -max + x + 'px'
  ripple.style.marginTop = -max + y + 'px'

  // Activate/add the element.
  ripple.className = 'ripple'
  holder.appendChild(ripple)
  window.setTimeout(function () {
    ripple.classList.add('held')
  }, 0)

  var releaseEvent = (type === 'mousedown' ? 'mouseup' : 'touchend')
  var release = function (ev) {
    // TODO: We don't check for _our_ touch here. Releasing one finger
    // releases all ripples.
    document.removeEventListener(releaseEvent, release)
    ripple.classList.add('done')

    // larger than animation: duration in css
    window.setTimeout(function () {
      holder.removeChild(ripple)
      if (!holder.children.length) {
        cl.remove('active')
        holder.removeAttribute('data-event')
      }
    }, 650)
  }
  document.addEventListener(releaseEvent, release)
}

export default {
  methods: {
    startRipple (event) {
      if (event.button === 0) {
        startRipple(event.type, event)
      }
    }
  }
}
</script>

<style>
.ripple-container {
  position: relative;
}
/**
 * contains a ripple. Will normally grow to fixed size (200px/200px), not
 * related to the holder itself.
 */
.rippleJS {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: inherit;

  /** Forces webkit to properly contain content within border-radius. */
  -webkit-mask-image: -webkit-radial-gradient(circle, white, black);
}

/** adds default border-radius */
.rippleJS.fill::after {  /** allows webkit/blink to tap on corners */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: "";
}
.rippleJS.fill {
  border-radius: 1000000px;  /** "large" number, but not 100% */
}

.rippleJS .ripple {
  position: absolute;
  border-radius: 100%;
  background: currentColor;
  opacity: 0.2;
  width: 0;
  height: 0;

  /** only animate transform and opacity */
  -webkit-transition: -webkit-transform 0.4s ease-out, opacity 0.4s ease-out;
  transition: transform 0.4s ease-out, opacity 0.4s ease-out;

  /** initially hidden */
  -webkit-transform: scale(0);
  transform: scale(0);

  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.rippleJS .ripple.held {
  opacity: 0.4;
  -webkit-transform: scale(1);
  transform: scale(1);
}

.rippleJS .ripple.done {
  opacity: 0.0;
}
</style>
