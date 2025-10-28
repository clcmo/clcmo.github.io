import { contacts } from '../models/contacts.model'
import { getThemeColors } from './base.ui'
import QRCode from 'qrcode'

function updateQRCode(canvas: HTMLCanvasElement, pixKey: string) {
  const themeColors = getThemeColors()
  QRCode.toCanvas(canvas, pixKey, {
    width: 240,
    margin: 2,
    color: {
      dark: themeColors.dark,
      light: themeColors.light,
    },
  })
}

function createOverlay(): HTMLDivElement {
  const overlay = document.createElement('div')
  overlay.className = 'pix-overlay'
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')
  return overlay
}

function createCloseButton(): HTMLButtonElement {
  const close = document.createElement('button')
  close.className = 'pix-close'
  close.setAttribute('aria-label', 'Fechar')
  close.innerHTML = '&times;'
  return close
}

function createPixModal(pixKey: string, iconClass: string): HTMLDivElement {
  const modal = document.createElement('div')
  modal.className = 'pix-modal'

  const title = document.createElement('h2')
  title.textContent = 'Apoie com Pix'

  const qrCanvas = document.createElement('canvas')
  qrCanvas.className = 'pix-qrcode'
  updateQRCode(qrCanvas, pixKey)

  const copyButton = document.createElement('button')
  copyButton.className = 'pix-button'
  copyButton.innerHTML = `<i class="${iconClass}"></i> Copiar chave Pix`
  copyButton.onclick = () => {
    navigator.clipboard.writeText(pixKey)
    alert(`Chave Pix copiada: ${pixKey}`)
  }

  const closeButton = createCloseButton()
  closeButton.onclick = () => {
    modal.classList.remove('show')
    setTimeout(() => modal.parentElement?.remove(), 300)
  }

  // ✅ Aqui está o novo agrupamento correto
  const contentWrapper = document.createElement('div')
  contentWrapper.className = 'pix-content'
  contentWrapper.append(qrCanvas, copyButton)

  modal.append(closeButton, title, contentWrapper)
  return modal
}


export function createPixListItem(): HTMLLIElement | null {
  const pixItem = contacts.find((c) => c.type === 'pix')
  if (!pixItem) return null

  const li = document.createElement('li')
  const a = document.createElement('a')
  a.className = 'contact-link pix-trigger'
  a.innerHTML = `<i class="${pixItem.icon}"></i> ${pixItem.label}`

  a.onclick = () => {
    const overlay = createOverlay()
    const modal = createPixModal(pixItem.value, pixItem.icon)
    overlay.appendChild(modal)
    document.body.appendChild(overlay)

    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      updateQRCode(modal.querySelector('.pix-qrcode') as HTMLCanvasElement, pixItem.value)
    })

    requestAnimationFrame(() => modal.classList.add('show'))
  }

  li.appendChild(a)
  return li
}
