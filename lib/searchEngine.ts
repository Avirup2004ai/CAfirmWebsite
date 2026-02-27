import { type SearchDocument, synonyms } from "./searchData";

export const getSearchScore = (doc: SearchDocument, query: string): number => {
    let score = 0;
    const q = query.toLowerCase().trim();
    if (!q) return 0;

    const t = doc.title.toLowerCase();
    const d = doc.description.toLowerCase();

    // Check synonyms
    const expandedQueries = [q];
    for (const [key, val] of Object.entries(synonyms || {})) {
        if (q.includes(key)) expandedQueries.push(q.replace(key, val));
        if (q.includes(val)) expandedQueries.push(q.replace(val, key));
    }

    let matched = false;
    for (const eq of expandedQueries) {
        // Exact match
        if (t === eq) { score += 100; matched = true; }
        // Prefix match
        else if (t.startsWith(eq)) { score += 50; matched = true; }
        // Substring match in title
        else if (t.includes(eq)) { score += 30; matched = true; }
        // Keyword match
        else if (doc.keywords.some(k => k.toLowerCase().includes(eq))) { score += 20; matched = true; }
        // Description match
        else if (d.includes(eq)) { score += 10; matched = true; }

        // Token matching (for multi-word queries)
        const tokens = eq.split(" ");
        if (tokens.length > 1) {
            const allTokensMatch = tokens.every(tk => t.includes(tk) || d.includes(tk) || doc.keywords.some(k => k.toLowerCase().includes(tk)));
            if (allTokensMatch) { score += 15; matched = true; }
        }
    }

    if (!matched) return 0;

    // Type boosting
    if (doc.type === "Calculator") score += 5;
    if (doc.type === "Service") score += 4;
    if (doc.type === "Knowledge") score += 2;

    return score;
};

export const searchDocuments = async (query: string, maxResults = 8): Promise<SearchDocument[]> => {
    if (!query.trim()) return [];

    // Lazy load the index
    const { searchIndex } = await import("./searchData");

    const scored = searchIndex
        .map(doc => ({ doc, score: getSearchScore(doc, query) }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

    return scored.slice(0, maxResults).map(item => item.doc);
};
