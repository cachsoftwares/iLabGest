document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = Array.from(document.querySelectorAll('.equipment-qr-selection'))
  const selectAllButton = document.querySelector('#equipment-qr-select-all')
  const deselectAllButton = document.querySelector('#equipment-qr-deselect-all')
  const exportButton = document.querySelector('#equipment-qr-export-pdf')
  const selectionCount = document.querySelector('#equipment-qr-selection-count')
  const status = document.querySelector('#equipment-qr-export-status')
  const printSheet = document.querySelector('#equipment-qr-print-sheet')
  if (!selectAllButton || !deselectAllButton || !exportButton || !selectionCount || !status || !printSheet) {
    console.error('Equipment QR export controls are missing from the page.')
    return
  }

  let exporting = false

  const showStatus = (message, kind = 'info') => {
    status.textContent = message
    status.className = `notification is-${kind} is-light no-print${message ? '' : ' is-hidden'}`
  }

  const updateSelection = () => {
    const selectedCount = checkboxes.filter(checkbox => checkbox.checked).length
    selectionCount.textContent = `${selectedCount} selecionado${selectedCount === 1 ? '' : 's'}`
    exportButton.disabled = selectedCount === 0 || exporting
  }

  const setExporting = value => {
    exporting = value
    selectAllButton.disabled = value
    deselectAllButton.disabled = value
    checkboxes.forEach(checkbox => {
      checkbox.disabled = value
    })
    updateSelection()
  }

  selectAllButton.addEventListener('click', () => {
    checkboxes.forEach(checkbox => {
      checkbox.checked = true
    })
    updateSelection()
  })

  deselectAllButton.addEventListener('click', () => {
    checkboxes.forEach(checkbox => {
      checkbox.checked = false
    })
    updateSelection()
    printSheet.textContent = ''
  })

  checkboxes.forEach(checkbox => checkbox.addEventListener('change', updateSelection))

  exportButton.addEventListener('click', async () => {
    const selectedCheckboxes = checkboxes.filter(checkbox => checkbox.checked)
    if (selectedCheckboxes.length === 0 || exporting) return

    setExporting(true)
    showStatus('A preparar os códigos QR selecionados...', 'info')
    printSheet.textContent = ''

    const printItems = selectedCheckboxes.map(checkbox => {
      const card = checkbox.closest('[data-equipment-card]')
      if (!card) return null

      const item = document.createElement('article')
      item.className = 'equipment-qr-print-item'

      const image = document.createElement('img')
      image.src = `/employee/equipament/qr/${encodeURIComponent(card.dataset.equipmentId)}.svg`
      image.alt = `Código QR de ${card.dataset.equipmentTitle}`
      item.append(image)

      const title = document.createElement('p')
      title.textContent = card.dataset.equipmentTitle
      item.append(title)

      const category = document.createElement('p')
      category.textContent = card.dataset.equipmentCategory
      item.append(category)
      return item
    })

    if (printItems.some(item => !item)) {
      setExporting(false)
      showStatus('Não foi possível preparar a lista de equipamentos selecionados.', 'danger')
      return
    }

    printSheet.append(...printItems)
    const images = Array.from(printSheet.querySelectorAll('img'))
    const imagesLoaded = await Promise.all(images.map(image => new Promise(resolve => {
      if (image.complete) {
        resolve(image.naturalWidth > 0)
        return
      }

      image.addEventListener('load', () => resolve(true), { once: true })
      image.addEventListener('error', () => resolve(false), { once: true })
    })))

    if (imagesLoaded.some(loaded => !loaded)) {
      printSheet.textContent = ''
      setExporting(false)
      showStatus('Não foi possível carregar todos os códigos QR. Tente novamente.', 'danger')
      return
    }

    const previousTitle = document.title
    const datePart = new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date()).replace(/\//g, '-')
    document.title = `Codigos-QR-${datePart}`
    window.addEventListener('afterprint', () => {
      document.title = previousTitle
      setExporting(false)
      showStatus('', 'info')
    }, { once: true })

    showStatus('Na janela de impressão, escolha guardar como PDF.', 'success')
    window.print()
  })

  updateSelection()
})
