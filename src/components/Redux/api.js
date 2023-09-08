export default async function getCoinData() {
    const liveRatesUrl = "http://api.coinlayer.com/live?access_key=3acf452d5eac4e3439238af97f0713ec";
    const currencyListUrl = "http://api.coinlayer.com/list?access_key=3acf452d5eac4e3439238af97f0713ec";

    try {
        const [liveRatesResponse, currencyListResponse] = await Promise.all([
            fetch(liveRatesUrl),
            fetch(currencyListUrl)
        ]);

        const liveRatesData = await liveRatesResponse.json();
        const currencyListData = await currencyListResponse.json();
        if (liveRatesData.success && currencyListData.success) {
            const coinObject = {};

            for (const currency in liveRatesData.rates) {
                if (currencyListData.crypto.hasOwnProperty(currency)) {
                    const rate = liveRatesData.rates[currency];
                    const coinInfo = currencyListData.crypto[currency];

                    coinObject[currency] = {
                        symbol: coinInfo.symbol,
                        name: coinInfo.name,
                        name_full: coinInfo.name_full,
                        max_supply: coinInfo.max_supply,
                        icon_url: coinInfo.icon_url,
                        rate: rate
                    };
                }
            }

            return coinObject;
        } else {
            throw new Error("API request failed1.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
