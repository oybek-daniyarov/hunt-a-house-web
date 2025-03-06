import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Import PurchaseHistory directly since it's a server component
import PurchaseHistory from './components/purchase-history';

// Use dynamic import with loading fallback for components
const ProductsList = dynamic(() => import('./components/products-list'), {
  loading: () => <div className="h-40 rounded-lg bg-muted animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Products & Credits | HuntAHouse',
  description: 'Purchase credits to access leads and grow your business',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Await searchParams and parse page parameter
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;

  return (
    <section className="my-8 px-4">
      <div className="max-w-3xl space-y-8">
        <div className="text-center sm:text-start">
          <h1 className="text-2xl font-bold md:text-3xl">Products & Credits</h1>
          <p className="text-muted-foreground">
            Purchase credits to access leads and grow your business
          </p>
        </div>

        {/* Stacked layout for all screen sizes */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Available Packages</h2>
            <ProductsList />
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Purchase History</h2>
            <PurchaseHistory page={page} />
          </div>
        </div>
      </div>
    </section>
  );
}
