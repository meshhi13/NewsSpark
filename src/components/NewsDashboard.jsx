import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, RefreshCw } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function NewsDashboard() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedSource, setSelectedSource] = useState(null);
  const pageSize = 12;
  const { logout } = useAuth()

  useEffect(() => {
    fetchNews(query, page);
  }, []);

  async function fetchNews(q, p = 1) {
    setLoading(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 450));
    try {
      const response = await fetch("http://127.0.0.1:3100/api/news");
      if (!response.ok){
        throw new Error(`Response status: ${response.status}`);
      }
      else {
        const result = await response.json()
        setArticles(result.articles)
        setLoading(false)
      }

    } catch (err) {   
      console.error("Failed to fetch, setting dummy data", err);
      const dummyData = {
        articles: Array.from({ length: pageSize }).map((_, i) => ({
          title: `${q} Headline ${i + 1}`,
          source: { name: "Example News" },
          url: "https://example.com/news-article",
          urlToImage: "https://www.mooreseal.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
          publishedAt: new Date().toISOString(),
          description: `This is a dummy description for ${q} headline ${i + 1}.`,
          content: `This is dummy content for ${q} headline ${i + 1}.`
        }))
      };
      setTimeout(() => {
        setArticles(dummyData.articles);
        setPage(p);
        setLoading(false);
      }, 500);
      setError("Failed to fetch news");
      setArticles([]);
      setLoading(false);
    }
  }

  function onSearch(e) {
    e.preventDefault();
    fetchNews(query, 1);
  }

  function fmtDate(iso) {
    try {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(iso));
    } catch (e) {
      return iso;
    }
  }

  const LoadingDots = () => (
    <div className="flex justify-center items-center py-20">
      {[...Array(3)].map((_, i) => (
        <motion.span
          key={i}
          className="bg-blue-500 rounded-full w-4 h-4 mx-1"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 0.45,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );

  const layoutIdForSource = (sourceName) =>
    `source-${sourceName.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-gray-800 to-white p-4 sm:p-6 md:p-12 relative">
      <header className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white">
              NewsSpark
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xs sm:max-w-full">
              Truth in every headline
            </p>
          </div>

          <form onSubmit={onSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto flex-grow">
              <input
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full sm:w-72 md:w-96 pl-10 pr-4 py-3 sm:h-14 h-12 rounded-lg border border-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Search topics, e.g. quantum computing"
                aria-label="Search topics"
                autoComplete="off"
              />
              <Search
                className="absolute left-3 top-4.5 text-slate-400"
                size={20}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="submit"
                onClick={() => fetchNews(query, page)}
                title="Search"
                className="inline-flex items-center bg-black justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-slate-400 shadow-sm transition hover:ring-2 hover:ring-sky-600"
                aria-label="Refresh news"
              >
                <Search size={24} strokeWidth={3} className="text-white-700" />
              </button>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-5 rounded-lg font-semibold shadow-md transition bg-red-800 text-white hover:ring-2 hover:ring-red-600"
              >
                Logout
              </button>

            </div>
          </form>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-6 relative z-0">
        {loading && <LoadingDots />}

        {!loading && !error && articles.length === 0 && (
          <div className="p-6 rounded-lg bg-slate-100 border border-dashed border-slate-300 text-slate-600 text-center">
            No results — try another topic.
          </div>
        )}

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a, idx) => (
            <motion.article
              key={idx}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md"
            >
              <div className="h-40 sm:h-44 md:h-48 bg-slate-100 relative">
                <img
                  src={a.urlToImage}
                  alt={a.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <a
                  onClick={() => setSelectedSource(a.source.name)}
                  aria-label={`Read more from ${a.source.name}`}
                  className="no-underline hover:underline cursor-pointer"

                >
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800 line-clamp-2">
                    {a.title}
                  </h3>
                </a>
                <p className="text-sm text-slate-500 mt-2 line-clamp-3 flex-1">
                  {a.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <div>{fmtDate(a.publishedAt)}</div>
                    <a href={a.url} target="blank">
                    <button
                      onClick={() => window.open(a.url, "_blank")}
                      className="bg-black inline-flex items-center gap-1 text-white hover:ring-1 hover:ring-sky-600 rounded"
                    >
                        Read <ExternalLink size={14} />
                    </button>
                    </a>
                </div>
              </div>
            </motion.article>
          ))}
        </section>
      </main>
      <AnimatePresence>
        {selectedSource && (
          <motion.div
            key="source-overlay"
            layoutId={layoutIdForSource(selectedSource)}
            initial={{ opacity: 0, borderRadius: 24, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
            exit={{ opacity: 0, scale: 0.8, borderRadius: 24 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto overscroll-none flex flex-col max-w-4xl mx-auto my-8 rounded-lg shadow-lg"
            style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
          >
            <header className="sticky top-0 bg-white border-b border-gray-200 z-10 flex items-center justify-between p-4">
              <h2 className="text-3xl font-bold text-gray-900">{selectedSource}</h2>
              <button
                onClick={() => setSelectedSource(null)}
                aria-label="Close article"
                className="text-white-600 bg-black hover:ring-1 hover:ring-sky-600 text-3xl font-semibold leading-none"
              >
                &times;
              </button>
            </header>

            <article className="px-6 py-8 prose prose-lg max-w-none text-gray-900 flex-grow">
              <h1 className="mb-4">{articles.find(a => a.source.name === selectedSource)?.title || "Article Title"}</h1>
              <div className="mb-6 text-sm text-gray-500">
                By <span className="italic">Author Name</span> &middot; {fmtDate(articles.find(a => a.source.name === selectedSource)?.publishedAt) || ""}
              </div>
              <img
                src={articles.find(a => a.source.name === selectedSource)?.urlToImage}
                alt="Article Main"
                className="w-full rounded-lg mb-6 object-cover max-h-96"
              />
              <p>
                {articles.find(a => a.source.name === selectedSource)?.description ||
                  "No article description available."}
              </p>
              <br></br>
              <p>
                {articles.find(a => a.source.name === selectedSource)?.content || 
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur suscipit ultrices purus, nec tempor erat convallis vitae. Suspendisse potenti. Nullam non justo ut nisl blandit aliquam. Phasellus in cursus orci. Sed hendrerit laoreet urna, ac laoreet elit."}
              </p>
            </article>

            <footer className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-start">
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
