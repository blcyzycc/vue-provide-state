import { watch } from 'vue'

/**
 * 通过 vue3 的 provide + inject 实现状态管理。
 * 解决状态的初始化、持久化、外部js引用问题。
 * 使用时将 setup 声明的需要 provide 的属性按格式传入即可。
 * @param options[object]
 *    global[boolean] 模块是否注入 susiProvide 对象下，默认 false 不注入
 *    local[array]    需要缓存在 localStorage 中的状态
 *    session[array]  需要缓存在 sessionStorage 中的状态
 *    data[object]    状态属性，即使用 provide 需要声明的状态
 * */
const susiProvide = (options) => {
  const global = options.global || false
  const data = options.data || {}
  const local = options.local || []
  const session = options.session || []

  // 获取缓存的初始值
  const init = (keys, storage) => {
    keys.forEach(key => {
      try {
        if (storage.getItem(key) !== null) {
          let s = storage.getItem(key)
          let o = JSON.parse(s)
          if (o.t && o.d) {
            setDeepProperty(data, key, o.v)
          } else {
            storage.removeItem(key)
          }
        }
      } catch (e) {
        console.log(e);
        storage.removeItem(key)
      }
    })
  }

  init(local, localStorage)
  init(session, sessionStorage)

  if (global) {
    for (let key in data) {
      susiProvide[key] = data[key]
    }
  }

  local.forEach(key => {
    let va = getDeepProperty(data, key)
    if (va) {
      watch(() => va[0][va[1]], (val) => {
        let o = JSON.stringify({
          v: val,
          d: Date.now(),
          t: typeof val,
        })
        localStorage.setItem(key, o)
      }, {
        deep: true
      })
    }
  })

  session.forEach(key => {
    let va = getDeepProperty(data, key)
    if (va) {
      watch(() => va[0][va[1]], (val) => {
        let o = JSON.stringify({
          v: val,
          d: Date.now(),
          t: typeof val,
        })
        sessionStorage.setItem(key, o)
      }, {
        deep: true
      })
    }
  })
}


/**
 * 顺着属性链路获取最后一个属性
 * */
const getDeepProperty = (obj, pathStr) => {
  let pts = pathStr.split('.')
  let current = obj

  if (pts.length === 1) return [obj, pathStr]

  for (let i = 0; i < pts.length; i++) {
    current = current[pts[i]]
    if (i === pts.length - 2) {
      return [current, pts[pts.length - 1]]
    }
  }
  return false
}

/**
 * 顺着属性链路设置对应值
 * */
const setDeepProperty = (obj, pathStr, value) => {
  let pts = pathStr.split('.')
  let current = obj

  if (pts.length === 1) {
    if (typeof value === 'object') {
      for (let key in value) {
        obj[pathStr][key] = value[key]
      }
    } else {
      console.warn('[Vue warn] value cannot be made reactive: ' + typeof value);
    }
  }
  else {
    for (let i = 0; i < pts.length - 1; i++) {
      current = current[pts[i]] ? current[pts[i]] : {}
    }
    current[pts[pts.length - 1]] = value
  }
}

export default susiProvide
