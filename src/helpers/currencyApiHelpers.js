export const setDataToLocalStorage = data => {
    const currencyDataWithTimestamp = {
        timestamp: Date.now(),
        data,
    };
    localStorage.setItem('lastCurrencyDate', JSON.stringify(currencyDataWithTimestamp));
};

export const getCurrencyDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('lastCurrencyDate');
    if (storedData) {
        const parsedStoredData = JSON.parse(storedData);
        const now = Date.now();
        const oneHourStep = 60 * 60 * 1000; // 1 saat (milisaniye cinsinden)
        if (now - parsedStoredData.timestamp < oneHourStep) {
            return parsedStoredData; // Tüm nesneyi döndür (timestamp dahil)
        }
    }
    return null;
};
