import { DefaultValue } from 'recoil'

function state() {
  const state = {}
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    state[key] = get(key)
  }
  return state
}

function entries() {
  return Object.entries(state())
}

function get(key) {
  const value = localStorage.getItem(key)
  return value && JSON.parse(value)
}

function set(key, value) {
  if (!value) {
    return remove(key)
  }
  localStorage.setItem(key, JSON.stringify(value))
}

function remove(key) {
  localStorage.removeItem(key)
}

function clear() {
  localStorage.clear()
}

export const store = Object.freeze({
  state: state,
  entries,
  set: set,
  get: get,
  remove: remove,
  clear: clear
})

export const storeEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const stored = store.get(key)

    if (stored != null) {
      setSelf(stored)
    }

    onSet((value) => {
      if (value instanceof DefaultValue) {
        store.remove(key)
      } else {
        store.set(key, value)
      }
    })
  }

export function loggingEffect({ node, onSet }) {
  onSet((value) => {
    console.debug(node.key, '->', value)
  })
}

export function cacheId() {
  return new Date().toISOString().slice(11, 19)
}
