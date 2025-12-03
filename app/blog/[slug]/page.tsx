import Link from "@/components/Link";

// Mocked CMS structure for blog page
const pageStructure = {
  sections: [{ type: "link", count: 3 }],
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;

  // Simulate dynamic blog post generation
  const posts = [
    {
      slug: "post-1",
      title: "Understanding CSS Modules in Next.js",
      author: "John Doe",
      date: "2025-12-01",
      content:
        "CSS Modules provide a way to write modular and scoped CSS in Next.js applications.",
      tags: ["Next.js", "CSS", "Web Development"],
    },
    {
      slug: "post-2",
      title: "Getting Started with Turbopack",
      author: "Jane Smith",
      date: "2025-12-02",
      content:
        "Turbopack is the new bundler for Next.js that offers faster build times and improved performance.",
      tags: ["Turbopack", "Next.js", "Performance"],
    },
    {
      slug: "post-3",
      title: "Tailwind CSS Best Practices",
      author: "Bob Johnson",
      date: "2025-12-03",
      content:
        "Learn how to use Tailwind CSS effectively with the @apply directive and component patterns.",
      tags: ["Tailwind CSS", "CSS", "Best Practices"],
    },
  ];

  const post = posts.find((p) => p.slug === slug) || posts[0];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          ← Back to Home
        </Link>

        <div className="mt-6">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-black">{post.title}</h2>
            <div className="mb-4">
              <p className="text-sm text-black">
                By {post.author} | {post.date}
              </p>
            </div>

            <p className="text-lg mb-6 text-black">{post.content}</p>

            <h3 className="text-xl font-semibold mb-2 text-black">Tags:</h3>
            <ul className="space-y-2 pl-5 mb-4 text-black">
              {post.tags.map((tag, idx) => (
                <li key={idx}>{tag}</li>
              ))}
            </ul>

            <div className="mt-6 space-x-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Share Post
              </button>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Save for Later
              </button>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Related Posts
            </h2>
            <p className="mb-4 text-black">You might also be interested in:</p>
            <p className="text-sm text-black mb-4">
              This page uses Link component directly (NOT dynamic) - Card,
              Button, and List are NOT imported.
            </p>
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <p className="text-sm font-mono text-black">
                CMS Structure: {JSON.stringify(pageStructure.sections)}
              </p>
            </div>

            <div className="mt-4 space-y-2">
              {posts
                .filter((p) => p.slug !== slug)
                .map((p) => (
                  <div key={p.slug}>
                    <Link href={`/blog/${p.slug}`}>
                      {p.title}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
