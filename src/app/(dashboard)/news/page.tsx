"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { ExternalLink, RefreshCw } from "lucide-react";

interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    source: { name: string };
    publishedAt: string;
}

export default function NewsPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNews = async () => {
        setLoading(true);
        try {
            // Using saurav.tech NewsAPI (Free, no key required)
            const res = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json");
            if (res.ok) {
                const data = await res.json();
                setArticles(data.articles.slice(0, 20));
            }
        } catch (error) {
            console.error("Failed to fetch news", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="h-[calc(100vh-80px)] overflow-y-auto bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <Header title="Top Technology News" />

            <div className="flex justify-end mb-6">
                <button
                    onClick={fetchNews}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-purple-600"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-80 bg-white/50 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, idx) => (
                        <div
                            key={idx}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-white/20"
                        >
                            <div className="relative h-48 overflow-hidden">
                                {article.urlToImage ? (
                                    <img
                                        src={article.urlToImage}
                                        alt={article.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full">
                                    {article.source.name}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                                    {article.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs text-gray-400">
                                        {new Date(article.publishedAt).toLocaleDateString()}
                                    </span>
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700"
                                    >
                                        Read More <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
