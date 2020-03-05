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
