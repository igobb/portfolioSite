import { ImageResponse } from 'next/og'
import { Logo } from '@/components/Logo'
import { OWNER_NAME, ROLE_LINE } from '@/constants/profile'
import { SITE_URL } from '@/constants/site'
import { routing } from '@/i18n/routing'

// Satori can't read CSS variables, so these are the light design tokens from globals.css.
const PAPER = '#efebe0'
const INK = '#1b1b18'
const MUTED = '#5e5a50'
const ACCENT = '#c0352c'

export const alt = `${OWNER_NAME} – ${ROLE_LINE}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Image routes don't inherit the layout's params, so they list their own.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: PAPER,
        color: INK,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          paddingLeft: 72,
        }}
      >
        <div style={{ display: 'flex', fontSize: 24, color: MUTED }}>
          <span>~/tgolab</span>

          <span style={{ margin: '0 14px', color: ACCENT }}>$</span>

          <span>whoami</span>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: '-0.03em',
          }}
        >
          {OWNER_NAME}
        </div>

        <div style={{ display: 'flex', marginTop: 20, fontSize: 32 }}>
          {ROLE_LINE}
        </div>

        <div
          style={{ display: 'flex', marginTop: 56, fontSize: 22, color: MUTED }}
        >
          {new URL(SITE_URL).host}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 380,
          paddingLeft: 90,
          background: INK,
          clipPath: 'polygon(90px 0, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        <Logo width={200} height={200} style={{ color: PAPER }} />
      </div>
    </div>,
    size,
  )
}
