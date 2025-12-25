import MarketplaceHero from "./components/MarketplaceHero";
import MarketplaceSearch from "./components/MarketplaceSearch";
import MarketplaceCategories from "./components/MarketplaceCategories";
import MarketplaceFeatured from "./components/MarketplaceFeatured";
import MarketplaceServices from "./components/MarketplaceServices";
import MarketplaceTrust from "./components/MarketplaceTrust";
import MarketplaceCTA from "./components/MarketplaceCTA";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <MarketplaceHero />
        <MarketplaceSearch />
        <MarketplaceCategories />
        <MarketplaceFeatured />
        <MarketplaceServices />
        <MarketplaceTrust />
        <MarketplaceCTA />
      </div>
    </div>
  );
}
