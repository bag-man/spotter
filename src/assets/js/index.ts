const copy = () => {
  const md = document.getElementsByClassName('markdown').item(0)?.innerHTML

  if (md) {
    navigator.permissions.query({ name: 'clipboard-write' as PermissionName }).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard.writeText(md)
      }
    })
  }
}

const copyBtn = document.getElementsByClassName('copy').item(0)

if (copyBtn) copyBtn.addEventListener('click', copy)
