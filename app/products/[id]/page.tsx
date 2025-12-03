import DynamicComponent from "@/components/DynamicComponent";
import Link from "next/link";

// Mocked CMS structure for product page
const pageStructure = {
  sections: [{ type: "button", count: 2 }],
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  // Simulate dynamic data generation
  const products = [
    {
      id: "1",
      name: "Product Alpha",
      description: "High-quality product with advanced features",
      price: 99.99,
    },
    {
      id: "2",
      name: "Product Beta",
      description: "Affordable solution for everyday use",
      price: 49.99,
    },
    {
      id: "3",
      name: "Product Gamma",
      description: "Premium product with exceptional performance",
      price: 149.99,
    },
  ];

  const product = products.find((p) => p.id === id) || products[0];

  const features = [
    "Feature 1: High durability",
    "Feature 2: Energy efficient",
    "Feature 3: Easy to use",
    "Feature 4: 2-year warranty",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
          ← Back to Home
        </Link>

        <div className="mt-6">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-black">
              {product.name}
            </h2>
            <p className="mb-4 text-black">{product.description}</p>
            <p className="text-3xl font-bold text-green-600 mb-4">
              ${product.price}
            </p>

            <h3 className="text-xl font-semibold mb-2 text-black">Product Features:</h3>
            <ul className="space-y-2 pl-5 mb-4 text-black">
              {features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>

            <div className="mt-6 space-x-4">
              <DynamicComponent type="button" variant="primary">
                Add to Cart
              </DynamicComponent>
              <DynamicComponent type="button" variant="secondary">
                View Details
              </DynamicComponent>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Related Products
            </h2>
            <p className="mb-4 text-black">Check out our other amazing products:</p>
            <p className="mt-4 text-sm text-black">
              This page uses only Button component via dynamic import - Card,
              Link, and List are NOT used.
            </p>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-sm font-mono text-black">
                CMS Structure: {JSON.stringify(pageStructure.sections)}
              </p>
            </div>
            <div className="mt-4 space-y-2">
              {products
                .filter((p) => p.id !== id)
                .map((p) => (
                  <div key={p.id}>
                    <a
                      href={`/products/${p.id}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {p.name}
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
