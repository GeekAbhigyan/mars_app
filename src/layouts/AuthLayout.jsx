import colors from '../constants/colors';
import FactoryIllustration from '../components/illustrations/FactoryIllustration';

/**
 * Shared layout wrapper for Login and Register screens.
 * Renders the Mars brand logo, decorative SVG blobs, a hero headline
 * with the factory illustration on the left, and the form card on the right.
 *
 * @param {React.ReactNode} children - The auth form card to render on the right
 */
const AuthLayout = ({ children }) => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Top-right decorative blob */}
    <svg
      style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 180, zIndex: 0 }}
      viewBox="0 0 200 180"
    >
      <path d="M200,0 Q200,100 140,130 Q80,160 60,100 Q40,40 120,0 Z" fill="#f5d9b0" opacity="0.7" />
    </svg>

    {/* Bottom-left decorative blob */}
    <svg
      style={{ position: 'absolute', bottom: 0, left: 0, width: 100, height: 100, zIndex: 0 }}
      viewBox="0 0 100 100"
    >
      <circle cx="0" cy="100" r="70" fill="#c8c4e8" opacity="0.4" />
    </svg>

    {/* Mars brand logo */}
    <div style={{ padding: '18px 28px', position: 'relative', zIndex: 1 }}>
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontWeight: 800, fontSize: 20, color: colors.marsBlueDark, letterSpacing: 1 }}>MARS</div>
        <div style={{ fontWeight: 500, fontSize: 13, color: colors.marsOrange }}>Snacking</div>
      </div>
    </div>

    {/* Main two-column content area */}
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        padding: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 60, maxWidth: 1000, width: '100%' }}>
        {/* Left column — headline + illustration */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: colors.marsBlueDark, marginBottom: 10 }}>
            Copacking Planning Tool
          </h1>
          <p style={{ color: '#666', fontSize: 15, marginBottom: 32, maxWidth: 440 }}>
            A unified Copacking planner to streamline demand, capacity, and production decisions.
          </p>
          <FactoryIllustration />
        </div>

        {/* Right column — form card (passed as children) */}
        <div style={{ width: 360 }}>{children}</div>
      </div>
    </div>
  </div>
);

export default AuthLayout;
