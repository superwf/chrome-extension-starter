function injectCustomJs(jsPath?: string): void {
  const src = jsPath || 'js/inject.js'
  const { head } = document
  const temp = document.createElement('script')
  temp.setAttribute('type', 'text/javascript')
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.src = chrome.extension.getURL(src)
  temp.onload = (): void => {
    // 放在页面不好看，执行完后移除掉
    head.removeChild(temp)
  }
  head.appendChild(temp)
}

injectCustomJs('/injected.js')
