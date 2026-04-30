function formatDate(date, locale = 'fr-FR') {
    const d = new Date(date);

    if (isNaN(d.getTime())) {
        return "Date invalide";
    }

    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(d);
}

export { formatDate}