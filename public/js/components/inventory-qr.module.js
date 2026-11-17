document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('#inventory-qr-scanner-modal')
  if (!modal) return

  const trigger = document.querySelector('[data-target="inventory-qr-scanner-modal"]')
  const message = document.querySelector('#inventory-qr-message')
  const form = document.querySelector('#inventory-qr-checkin-form')
  const qrValue = document.querySelector('#inventory-qr-value')
  const status = document.querySelector('#inventory-qr-status')
  const note = document.querySelector('#inventory-qr-note')
  let scanner = null
  let scannerStarting = false
  let modalOpen = false
  let submitting = false

  const showMessage = (text, kind) => {
    message.textContent = text
    message.className = `notification is-${kind} is-light`
  }

  const stopScanner = async () => {
    const activeScanner = scanner
    if (!activeScanner) return

    try {
      if (activeScanner.isScanning) await activeScanner.stop()
      await activeScanner.clear()
    } finally {
      if (scanner === activeScanner) scanner = null
    }
  }

  const startScanner = async () => {
    if (scannerStarting || (scanner && scanner.isScanning)) return
    if (!window.Html5Qrcode || !window.Html5QrcodeSupportedFormats) {
      showMessage('O leitor QR não foi carregado. Atualize a página e tente novamente.', 'danger')
      console.error('Html5Qrcode library is unavailable.')
      return
    }

    scannerStarting = true
    scanner = new window.Html5Qrcode('inventory-qr-reader', {
      formatsToSupport: [window.Html5QrcodeSupportedFormats.QR_CODE]
    })

    try {
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async decodedText => {
          const payload = decodedText.trim()
          if (!/^ILABGEST:EQUIPMENT:[a-f\d]{24}$/i.test(payload)) {
            showMessage('Este QR Code não identifica um equipamento do iLabGest.', 'warning')
            return
          }
          if (submitting) return
          if (!status.value) {
            showMessage('Selecione primeiro o estado de conservação observado.', 'warning')
            return
          }

          submitting = true
          qrValue.value = payload
          showMessage('Código lido. A registar o check-in...', 'success')
          await stopScanner()
          form.submit()
        },
        () => {}
      )

      if (!modalOpen) await stopScanner()
    } catch (error) {
      showMessage('Não foi possível iniciar a câmara. Verifique a permissão do navegador.', 'danger')
      console.error('Unable to start the inventory QR scanner:', error)
      if (scanner && !scanner.isScanning) {
        try {
          await stopScanner()
        } catch (stopError) {
          console.error('Unable to reset the inventory QR scanner:', stopError)
        }
      }
    } finally {
      scannerStarting = false
    }
  }

  trigger.addEventListener('click', () => {
    modalOpen = true
    submitting = false
    qrValue.value = ''
    status.value = ''
    note.value = ''
    showMessage('A iniciar a câmara...', 'info')
    startScanner()
  })

  const closeScanner = () => {
    modalOpen = false
    if (!scannerStarting) {
      stopScanner().catch(error => {
        showMessage('Não foi possível desligar a câmara corretamente.', 'danger')
        console.error('Unable to stop the inventory QR scanner:', error)
      })
    }
  }

  modal.querySelectorAll('.modal-background, .modal-card-head .delete, .modal-card-foot .button')
    .forEach(closeButton => {
      closeButton.addEventListener('click', closeScanner)
    })

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modalOpen) closeScanner()
  })
})
