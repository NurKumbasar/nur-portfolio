import { useEffect, useRef, useState, type PointerEvent } from 'react'
import type { ChatService } from '../../domain/ports/ChatService'
import { MascotChat } from './MascotChat'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

// Bir hareketi "tıklama" mı "sürükleme" mi saymak için eşik (piksel) —
// bunun altındaki ufak titremeler tıklama sayılır.
const CLICK_THRESHOLD = 6

type DragState = {
  startX: number
  startY: number
  originX: number
  originY: number
  moved: boolean
  minDx: number
  maxDx: number
  minDy: number
  maxDy: number
}

// Avatar fotoğrafı yerine küçük, canlı bir maskot — tamamen SVG ile
// çizilmiş. App.tsx'te `position: fixed` ile render ediliyor, yani tek
// bir hero'ya değil tüm sayfaya ait; pointer olaylarıyla her yere
// sürüklenebiliyor. Sürüklemeden ayırt edilen bir tıklama, üstünde
// bir sohbet panelini açıp kapatıyor.
export function Mascot(props: { chatService: ChatService }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const dragState = useRef<DragState | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Sohbet açıkken sayfanın başka bir yerine tıklanınca paneli kapat.
  useEffect(() => {
    if (!chatOpen) return

    function handleOutsideClick(e: globalThis.PointerEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setChatOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)
    return () => document.removeEventListener('pointerdown', handleOutsideClick)
  }, [chatOpen])

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    const handle = e.currentTarget
    const handleRect = handle.getBoundingClientRect()

    handle.setPointerCapture(e.pointerId)
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
      moved: false,
      minDx: -handleRect.left,
      maxDx: window.innerWidth - handleRect.right,
      minDy: -handleRect.top,
      maxDy: window.innerHeight - handleRect.bottom,
    }
    setDragging(true)
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const drag = dragState.current
    if (!drag) return
    const rawDx = e.clientX - drag.startX
    const rawDy = e.clientY - drag.startY
    if (Math.abs(rawDx) + Math.abs(rawDy) > CLICK_THRESHOLD) {
      drag.moved = true
    }
    const dx = clamp(rawDx, drag.minDx, drag.maxDx)
    const dy = clamp(rawDy, drag.minDy, drag.maxDy)
    setPos({ x: drag.originX + dx, y: drag.originY + dy })
  }

  function handlePointerUp() {
    const wasClick = dragState.current ? !dragState.current.moved : false
    dragState.current = null
    setDragging(false)

    if (wasClick) {
      setChatOpen((current) => !current)
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={`mascot-drag${dragging ? ' mascot-drag-active' : ''}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {chatOpen && <MascotChat chatService={props.chatService} onClose={() => setChatOpen(false)} />}

      <svg viewBox="0 0 200 200" className="mascot" aria-hidden="true">
        <path
          className="mascot-body"
          d="M100,22 C144,22 178,50 178,92 C178,136 148,178 100,178 C52,178 22,138 22,94 C22,48 56,22 100,22 Z"
        />
        <g className="mascot-eyes">
          <circle className="mascot-eye" cx="78" cy="92" r="9" />
          <circle className="mascot-eye" cx="124" cy="92" r="9" />
        </g>
        <path className="mascot-mouth" d="M84,118 Q101,130 118,118" />
        <circle className="mascot-cheek" cx="60" cy="110" r="9" />
        <circle className="mascot-cheek" cx="142" cy="110" r="9" />
      </svg>
    </div>
  )
}
