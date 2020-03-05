let selection: Selection | null

const select = () => {
  const md = document.getElementsByClassName('markdown').item(0)

  if (md && selection) {
    const range = document.createRange()
    range.selectNodeContents(md)
    selection.addRange(range)
  }
}

const selectBtn = document.getElementsByClassName('select').item(0)

if (selectBtn) {
  selection = window.getSelection()
  selectBtn.addEventListener('click', select)
}
