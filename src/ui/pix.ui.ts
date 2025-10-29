import { contacts } from '../models/contacts.model'
import { getThemeColors } from './base.ui'
import QRCode from 'qrcode'

async function updateQRCode(canvas: HTMLCanvasElement, pixKey: string) {
  const emv = gerarPixCopiaCola({
    chave: pixKey,
    nome: 'Camila L. Oliveira - DEV',
    cidade: 'SAO PAULO',
    valor: undefined // '10.00' se quiser valor fixo
  })

  const themeColors = getThemeColors()

  await QRCode.toCanvas(canvas, emv, {
    width: 400,
    margin: 2,
    color: {
      dark: themeColors.dark || '#000000',
      light: themeColors.light || '#FFFFFF' // ⚠️ branco sólido, sem transparência
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
      const canvas = modal.querySelector('.pix-qrcode') as HTMLCanvasElement
      updateQRCode(canvas, pixItem.value)
    })

    requestAnimationFrame(() => modal.classList.add('show'))
  }

  li.appendChild(a)
  return li
}

// -------- Funções Pix --------

function gerarCRC16(payload: string): string {
  let crc = 0xFFFF
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1
      crc &= 0xFFFF
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

function gerarPixCopiaCola({
  chave,
  nome,
  cidade,
  valor,
}: {
  chave: string
  nome: string
  cidade: string
  valor?: string
}): string {
  const format = (id: string, value: string) =>
    id + value.length.toString().padStart(2, '0') + value

  const gui = format('00', 'br.gov.bcb.pix')
  const chaveField = format('01', chave)
  const merchantAccountInfo = format('26', gui + chaveField)

  const payload = [
    format('00', '01'), // Payload Format Indicator
    format('01', '11'), // QR estático
    merchantAccountInfo,
    format('52', '0000'),
    format('53', '986'),
    valor ? format('54', valor) : '',
    format('58', 'BR'),
    format('59', nome.substring(0, 25).toUpperCase()),
    format('60', cidade.substring(0, 15).toUpperCase()),
    format('62', format('05', '***')),
  ].filter(Boolean).join('')

  const full = payload + '6304'
  const crc = gerarCRC16(full)
  return full + crc
}
