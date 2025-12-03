import DynamicComponent from '@/components/DynamicComponent';

// Mocked CMS structure
const pageStructure = {
  sections: [
    { type: 'card', props: { title: 'Products Section' } },
    { type: 'card', props: { title: 'Blog Section' } },
    { type: 'card', props: { title: 'Component Showcase' } },
  ]
};

export default function Home() {
  const productIds = ['1', '2', '3'];
  const blogSlugs = ['post-1', 'post-2', 'post-3'];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Next.js CSS Modules Test
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <DynamicComponent type="card" title="Products Section">
            <p className="mb-4">
              Explore our dynamically generated product pages with CSS modules.
            </p>
            <ul className="space-y-2 pl-5 mb-4">
              <li>Product Alpha</li>
              <li>Product Beta</li>
              <li>Product Gamma</li>
            </ul>
            <div className="mt-6 space-y-2">
              {productIds.map(id => (
                <div key={id}>
                  <a href={`/products/${id}`} className="text-blue-600 hover:text-blue-800 underline">View Product {id}</a>
                </div>
              ))}
            </div>
          </DynamicComponent>
          
          <DynamicComponent type="card" title="Blog Section">
            <p className="mb-4">
              Read our latest blog posts with dynamically rendered content.
            </p>
            <ol className="space-y-2 pl-5 mb-4">
              <li>Understanding CSS Modules</li>
              <li>Getting Started with Turbopack</li>
              <li>Tailwind CSS Best Practices</li>
            </ol>
            <div className="mt-6 space-y-2">
              {blogSlugs.map(slug => (
                <div key={slug}>
                  <a href={`/blog/${slug}`} className="text-blue-600 hover:text-blue-800 underline">Read {slug}</a>
                </div>
              ))}
            </div>
          </DynamicComponent>
        </div>
        
        <DynamicComponent type="card" title="Component Showcase">
          <p className="mb-4">
            This page uses only the Card component via dynamic import based on mocked CMS structure.
          </p>
          <p className="mb-2">Other components (Button, Link, List) are mapped but NOT used in the structure.</p>
          <p>Check the bundle to see if their CSS modules are still loaded.</p>
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-sm font-mono">CMS Structure: {JSON.stringify(pageStructure.sections.map(s => s.type))}</p>
          </div>
        </DynamicComponent>
      </main>
    </div>
  );
}

