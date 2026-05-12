import SkipLinks from '@/accessibility/skip-links';
import LiveTicker from '@/components/surface/live-ticker';
import NigeriaMap from '@/maps/nigeria/nigeria-map';
import HeroSection from '@/sections/foundational/hero/hero-section';
import MetricPanel from '@/sections/foundational/metrics/metric-panel';
import FeaturedInitiative from '@/sections/operational/initiatives/featured-initiative';
import PulseSection from '@/sections/strategic/pulse-section';
import PublicShell from '@/shells/public-shell';

export default function Home() {
  return (
    <PublicShell>
      <SkipLinks />
      <main id="main-content">
        <HeroSection />
        <LiveTicker />
        <FeaturedInitiative />
        <PulseSection />
        <MetricPanel />
        <NigeriaMap />
      </main>
    </PublicShell>
  );
}
