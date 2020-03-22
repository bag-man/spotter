const copyMarkdown = () => {
  const md = document.getElementsByClassName('markdown').item(0)?.innerHTML

  if (md) {
    navigator.clipboard.writeText(md)
  }
}

const copyBtn = document.getElementsByClassName('copy').item(0)

if (copyBtn) {
  copyBtn.addEventListener('click', copyMarkdown)
}

// eslint-disable-next-line
const redirect = () => {
  const author = document.getElementsByClassName('search').item(0) as HTMLInputElement

  if (author) {
    location.href = `/${author.value}`
  }
}

if (document.URL.split('/')[4] === 'word') {
  const search = document.URL.split('/')[5]
  document.designMode = 'on'
  const sel = window.getSelection()
  sel!.collapse(document.body, 0)

  // eslint-disable-next-line
  // @ts-ignore
  while (window.find(search, false, false, false)) {
    document.execCommand('foreColor', false, '#CC0000')
    sel!.collapseToEnd()
  }
  // eslint-disable-next-line
  // @ts-ignore
  window.find(search, false, false, true)
  document.execCommand('foreColor', false, '#CC0000')
  sel!.collapseToEnd()
  document.designMode = 'off'
}
