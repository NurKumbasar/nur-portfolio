import styles from './AuroraBackground.module.css'

// `styles` bir obje — CSS Module'ü import edince, dosyadaki her class
// ismi bu objenin bir alanı oluyor: styles.wrapper, styles.blob gibi.
// Bu sayede class isimlerini yanlış yazarsan (typo), TypeScript hemen
// haber verir — düz string ile yazsaydık bu kontrolü kaybederdik.
export function AuroraBackground() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
    </div>
  )
}
