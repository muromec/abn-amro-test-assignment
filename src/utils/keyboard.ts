import { ref } from 'vue'
import type { Ref } from 'vue'

interface KeyboardScrollable {
  scrollIntoView: () => void
  open: () => void
}

export function useKeyboard(items: Ref<Array<KeyboardScrollable>>) {
  const selectedIndex = ref(-1)
  function handleFocus() {
    selectedIndex.value = 0
    items.value[selectedIndex.value].scrollIntoView()
  }

  function handleBlur() {
    selectedIndex.value = -1
  }

  function handleOpen() {
    items.value[selectedIndex.value].open()
  }

  function loop(value: number, max: number) {
    if (value < 0) {
      return max
    }
    if (value > max) {
      return 0
    }
    return value
  }

  function move(offset: number) {
    selectedIndex.value = loop(selectedIndex.value + offset, items.value.length - 1)
    items.value[selectedIndex.value].scrollIntoView()
  }
  return { selectedIndex, move, handleFocus, handleBlur, handleOpen }
}
