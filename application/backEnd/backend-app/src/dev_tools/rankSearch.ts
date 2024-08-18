// BASED ON A GENERAL APPROACH FOR COSINE SIMILARITY BASED SEARCH
function rankedSearch(query: string, data: string[]) {
    const rankedData = data.map((item) => {
        return {
            item,
            score: similarity(query, item)
        }
    });

    rankedData.sort((a, b) => {
        return b.score - a.score;
    });
    return rankedData;
} 

function tokenize(text: string): string[] {
    return text.split('').filter(Boolean);
}

function termFrequency(text: string): Map<string, number> {
    const tokens = tokenize(text);
    const termFreq = new Map<string, number>();

    tokens.forEach((token) => {
        termFreq.set(token, (termFreq.get(token) || 0) + 1);
    });
    return termFreq;
}

function dotProduct(a: Map<string, number>, b: Map<string, number>): number {
    let result = 0;
    a.forEach((value, key) => {
        result += value * (b.get(key) || 0);
    });
    return result;
}

function magnitude(a: Map<string, number>): number {
    let result = 0;
    a.forEach((value) => {
        result += value * value;
    });
    return Math.sqrt(result);
}

function similarity(a: string, b: string): number {
    const termFreqA = termFrequency(a);
    const termFreqB = termFrequency(b);
    const dotProd = dotProduct(termFreqA, termFreqB);
    const magA = magnitude(termFreqA);
    const magB = magnitude(termFreqB);
    return dotProd / (magA * magB);
}

export default rankedSearch;