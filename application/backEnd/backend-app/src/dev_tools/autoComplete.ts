// GENERIC TRIE DATA STRUCTURE FOR AUTOCOMPLETE FUNCTIONALITY
class TrieTreeNode {
    children: { [key: string]: TrieTreeNode };
    isEndOfWord: boolean;
    originalWords: string[];

    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.originalWords = [];
    }
}

class Trie {
    root: TrieTreeNode;

    constructor() {
        this.root = new TrieTreeNode();
    }

    insert(word: string): void {
        let node = this.root;
        const lowerCaseWord = word.toLowerCase();
        console.log(`Inserting word: ${lowerCaseWord}`);
        for (const char of lowerCaseWord) {
            if (!node.children[char]) {
                node.children[char] = new TrieTreeNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.originalWords.push(word);
        console.log(`Word ${lowerCaseWord} inserted`);
    }

    search(prefix: string): string[] {
        let node = this.root;
        const lowerCasePrefix = prefix.toLowerCase();
        console.log(`Searching for prefix: ${lowerCasePrefix}`);
        for (const char of lowerCasePrefix) {
            if (!node.children[char]) {
                console.log(`Prefix ${lowerCasePrefix} not found`);
                return [];
            }
            node = node.children[char];
        }
        console.log(`Prefix ${lowerCasePrefix} found, starting autocomplete`);
        return this.autocomplete(node, lowerCasePrefix, prefix);
    }

    private autocomplete(node: TrieTreeNode, prefix: string, originalPrefix: string): string[] {
        const results: string[] = [];
        if (node.isEndOfWord) {
            results.push(...node.originalWords);
        }

        for (const char in node.children) {
            results.push(...this.autocomplete(node.children[char], prefix + char, originalPrefix));
        }

        return this.sortResults(results, originalPrefix);
    }

    private sortResults(results: string[], originalPrefix: string): string[] {
        return results.sort((a, b) => {
            const lowerA = a.toLowerCase();
            const lowerB = b.toLowerCase();
            const prefixLower = originalPrefix.toLowerCase();
            const startsWithA = lowerA.startsWith(prefixLower);
            const startsWithB = lowerB.startsWith(prefixLower);

            if (startsWithA && !startsWithB) {
                return -1;
            } else if (!startsWithA && startsWithB) {
                return 1;
            } else if (startsWithA && startsWithB) {
                if (a.startsWith(originalPrefix) && !b.startsWith(originalPrefix)) {
                    return -1;
                } else if (!a.startsWith(originalPrefix) && b.startsWith(originalPrefix)) {
                    return 1;
                }
            }

            return a.localeCompare(b);
        });
    }
}

export { Trie };