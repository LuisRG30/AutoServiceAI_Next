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
    // input example :https://firmaladev.blob.core.windows.net/documents/CV_JorgePlasencia.pdf?se=2023-02-26T21%3A01%3A48Z&sp=r&sv=2021-08-06&sr=b&sig=jH0hIgEskHqYdxshr8kD2H/fT1F8HtyswIg2gonR0Io%3D

    // output example : CV_JorgePlasencia.pdf?se=2023-02-26T21%3A01%3A48Z&sp=r&sv=2021-08-06&sr=b&sig=jH0hIgEskHqYdxshr8kD2H/fT1F8HtyswIg2gonR0Io%3D
    return link.substring(firstSlashAfterDocuments + 1);
}