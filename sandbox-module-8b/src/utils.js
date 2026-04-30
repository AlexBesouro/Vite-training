export function formatDate(date) {
    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(date);
}
