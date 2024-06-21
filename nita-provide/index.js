/**
 * 通过 vue2 的 provide + inject 实现状态管理，在使用时向vue实例通过 mixin 混入返回对象即可。
 * 解决状态的初始化、持久化、外部js引用问题。
 * @param options[object]
 *    global[boolean]  模块是否注入 nitaProvide 对象下，默认 false 不注入
 *    local[array]    需要缓存在 localStorage 中的状态
 *    session[array]  需要缓存在 sessionStorage 中的状态
 *    data[object]    状态属性，即使用 provide 需要声明的状态
 * @return 返回 provide 部分混入代码
 * */
const nitaProvide = (options) => {
  const global = options.global || false
  const local = options.local || []
  const session = options.session || []
  const data = options.data || {}
  const watch = {}

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
        console.log(e)
        storage.removeItem(key)
      }
    })
  }

  init(local, localStorage)
  init(session, sessionStorage)

  if (global) {
    for (let key in data) {
      nitaProvide[key] = data[key]
    }
  }

  local.forEach(key => {
    watch[key] = {
      deep: true,
      handler: (val) => {
        let o = JSON.stringify({
          v: val,
          d: Date.now(),
          t: typeof val,
        })
        localStorage.setItem(key, o)
      }
    }
  })

  session.forEach(key => {
    watch[key] = {
      deep: true,
      handler: (val) => {
        let o = JSON.stringify({
          v: val,
          d: Date.now(),
          t: typeof val,
        })
        sessionStorage.setItem(key, o)
      }
    }
  })

  return {
    data: () => data,
    provide: () => data,
    watch: watch,
    created() {
      if (global) {
        for (let key in data) {
          nitaProvide[key] = this[key]
        }
      }
    },
  }
}

const isObject = (value) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * 顺着属性链路设置对应值
 * */
const setDeepProperty = (obj, pathStr, value) => {
  const paths = pathStr.split('.')
  let current = obj

  // 遍历路径，直到倒数第二级
  for (let i = 0; i < paths.length - 1; i++) {
    const pathPart = paths[i]
    current[pathPart] = current[pathPart] || {}
    current = current[pathPart]
  }

  if (isObject(current[paths[paths.length - 1]]) && isObject(value)) {
    mergeJson(current[paths[paths.length - 1]], value)
  } else {
    current[paths[paths.length - 1]] = value
  }
}

/**
 * 合并两个json
 * */
const mergeJson = (obj1 = {}, obj2 = {}) => {
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (isObject(obj1[key]) && isObject(obj2[key])) {
        obj1[key] = mergeJson(obj1[key], obj2[key])
      } else {
        obj1[key] = obj2[key]
      }
    }
  }
  return obj1
}

export default nitaProvide
