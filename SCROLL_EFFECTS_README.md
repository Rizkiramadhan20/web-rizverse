# Scroll Effects dengan Lenis - Dokumentasi

Dokumentasi lengkap untuk implementasi scroll effects menggunakan Lenis di proyek Rizverse Web.

## 🚀 Fitur yang Tersedia

### 1. **ScrollProgressBar**

Progress bar yang menunjukkan kemajuan scroll halaman.

```tsx
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

<ScrollProgressBar color="#FF5555" height={3} />;
```

**Props:**

- `color`: Warna progress bar (default: "#FF5555")
- `height`: Tinggi progress bar dalam pixel (default: 3)
- `className`: Class CSS tambahan

### 2. **ParallaxElement**

Elemen yang bergerak dengan kecepatan berbeda saat scroll untuk efek parallax.

```tsx
import { ParallaxElement } from "@/components/ui/ParallaxElement";

<ParallaxElement speed={0.5} offset={0}>
  <div>Konten dengan efek parallax</div>
</ParallaxElement>;
```

**Props:**

- `speed`: Kecepatan parallax (0.1 - 1.0, default: 0.5)
- `offset`: Offset tambahan dalam pixel (default: 0)
- `className`: Class CSS tambahan

### 3. **ScrollReveal**

Elemen yang muncul dengan animasi saat masuk ke viewport.

```tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";

<ScrollReveal direction="up" distance={100} delay={200} threshold={0.1}>
  <div>Konten yang muncul dengan animasi</div>
</ScrollReveal>;
```

**Props:**

- `direction`: Arah animasi ("up", "down", "left", "right", default: "up")
- `distance`: Jarak pergerakan dalam pixel (default: 50)
- `delay`: Delay animasi dalam millisecond (default: 0)
- `threshold`: Threshold untuk trigger animasi (0.0 - 1.0, default: 0.1)
- `className`: Class CSS tambahan

## 🎯 Hooks yang Tersedia

### 1. **useScrollTo**

Hook untuk scroll smooth ke elemen tertentu.

```tsx
import { useScrollTo } from "@/lib/useLenis";

const scrollTo = useScrollTo();

// Scroll ke elemen dengan ID
scrollTo("#section1", {
  duration: 1.5,
  offset: -80,
});

// Scroll ke elemen DOM
scrollTo(elementRef.current, {
  duration: 1.0,
});
```

**Options:**

- `duration`: Durasi scroll dalam detik
- `offset`: Offset tambahan dalam pixel
- `easing`: Fungsi easing custom

### 2. **useScrollProgress**

Hook untuk mendapatkan progress scroll (0.0 - 1.0).

```tsx
import { useScrollProgress } from "@/lib/useLenis";

const progress = useScrollProgress();
// progress akan bernilai 0.0 (top) sampai 1.0 (bottom)
```

### 3. **useScrollPosition**

Hook untuk mendapatkan posisi scroll dalam pixel.

```tsx
import { useScrollPosition } from "@/lib/useLenis";

const scrollY = useScrollPosition();
// scrollY akan bernilai pixel dari top
```

### 4. **useScrollDirection**

Hook untuk mendapatkan arah scroll.

```tsx
import { useScrollDirection } from "@/lib/useLenis";

const direction = useScrollDirection();
// direction akan bernilai 'up', 'down', atau null
```

## 🔧 Setup dan Konfigurasi

### 1. **LenisProvider**

Pastikan `LenisProvider` sudah terpasang di root layout:

```tsx
// src/app/layout.tsx
import LenisProvider from "@/base/helper/LenisProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
```

### 2. **Konfigurasi Lenis**

Konfigurasi Lenis dapat diubah di `LenisProvider.tsx`:

```tsx
// src/base/helper/LenisProvider.tsx
lenisRef.current = new Lenis({
  duration: 1.2, // Durasi scroll
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
  touchMultiplier: 2, // Multiplier untuk touch devices
  infinite: false, // Infinite scroll
  smoothWheel: true, // Smooth wheel scrolling
  wheelMultiplier: 1, // Wheel multiplier
  lerp: 0.1, // Linear interpolation
});
```

## 📱 Contoh Penggunaan Lengkap

### Header dengan Progress Bar

```tsx
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

export default function Header() {
  return (
    <>
      <ScrollProgressBar color="#FF5555" height={3} />
      {/* Header content */}
    </>
  );
}
```

### Section dengan Parallax dan Reveal

```tsx
import { ParallaxElement } from "@/components/ui/ParallaxElement";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background parallax */}
      <ParallaxElement speed={0.3} className="absolute inset-0">
        <div className="bg-gradient-to-br from-blue-500 to-purple-500" />
      </ParallaxElement>

      {/* Content dengan reveal */}
      <ScrollReveal direction="up" distance={100} delay={200}>
        <div className="relative z-10 text-center">
          <h1>Judul Hero</h1>
          <p>Deskripsi hero section</p>
        </div>
      </ScrollReveal>
    </section>
  );
}
```

### Grid dengan Staggered Animation

```tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function FeatureGrid() {
  const features = [
    { title: "Feature 1", delay: 0 },
    { title: "Feature 2", delay: 200 },
    { title: "Feature 3", delay: 400 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <ScrollReveal
          key={index}
          direction="up"
          distance={80}
          delay={feature.delay}
        >
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3>{feature.title}</h3>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
```

## 🎨 Customization

### Custom Easing Functions

```tsx
// Custom easing function
const customEasing = (t: number) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

// Gunakan dalam scrollTo
scrollTo("#section", {
  duration: 1.5,
  easing: customEasing,
});
```

### Custom Threshold untuk ScrollReveal

```tsx
// Trigger animasi lebih awal
<ScrollReveal threshold={0.3}>
  <div>Muncul saat 30% dari elemen terlihat</div>
</ScrollReveal>

// Trigger animasi lebih lambat
<ScrollReveal threshold={0.8}>
  <div>Muncul saat 80% dari elemen terlihat</div>
</ScrollReveal>
```

## 🚨 Troubleshooting

### 1. **Scroll tidak smooth**

- Pastikan `LenisProvider` sudah terpasang
- Check console untuk error
- Pastikan tidak ada CSS yang mengintervensi scroll behavior

### 2. **Animasi tidak trigger**

- Check `threshold` value
- Pastikan elemen memiliki tinggi yang cukup
- Verify bahwa elemen tidak tersembunyi oleh CSS

### 3. **Performance issues**

- Kurangi jumlah elemen dengan parallax
- Gunakan `will-change: transform` untuk elemen yang sering berubah
- Optimasi easing functions

## 🔗 Referensi

- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [Framer Motion](https://www.framer.com/motion/)
- [CSS Transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

## 📝 Notes

- Semua hooks menggunakan Lenis untuk smooth scrolling
- Fallback ke native smooth scrolling jika Lenis tidak tersedia
- Optimized untuk performance dengan `useCallback` dan `useMemo` internal
- Support untuk SSR dengan proper hydration handling
