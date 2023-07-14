export function URLRemoverForDocuments(link: string): string {
    const documentsIndex = link.indexOf('/documents');
    if (documentsIndex < 0) {
        // Link doesn't contain "/documents"
        return '';
    }

    const firstSlashAfterDocuments = link.indexOf('/', documentsIndex + 1);
    if (firstSlashAfterDocuments < 0) {
        // Link doesn't contain a slash after "/documents"
        return '';
    }

    return link.substring(firstSlashAfterDocuments + 1);
}