export async function handler(event) {
	try {
		const { timestamp, coinId = "bitcoin" } = event.queryStringParameters || {};
		if (!timestamp) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					error: "timestamp query parameter is required",
				}),
			};
		}

		const apiKey = process.env.COINSTATS_API_KEY;
		if (!apiKey) {
			return {
				statusCode: 500,
				body: JSON.stringify({
					error: "Missing COINSTATS_API_KEY environment variable",
				}),
			};
		}

		const url = `https://openapiv1.coinstats.app/coins/price/avg?coinId=${encodeURIComponent(
			coinId,
		)}&timestamp=${encodeURIComponent(timestamp)}`;

		const res = await fetch(url, {
			method: "GET",
			headers: {
				accept: "application/json",
				"X-API-KEY": apiKey,
			},
		});

		if (!res.ok) {
			const text = await res.text().catch(() => "");
			return {
				statusCode: res.status,
				body: text || JSON.stringify({ error: "Upstream error" }),
			};
		}

		const data = await res.json();
		return {
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: err.message || "Internal Server Error" }),
		};
	}
}
