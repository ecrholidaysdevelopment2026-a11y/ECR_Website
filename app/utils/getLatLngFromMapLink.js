export const getLatLngFromMapLink = (link) => {
  if (!link || typeof link !== "string") return null;
  try {
    const url = link.startsWith("http")
      ? new URL(link)
      : new URL(link, "https://maps.google.com");
    const mlat = url.searchParams.get("mlat");
    const mlon = url.searchParams.get("mlon");

    if (mlat && mlon) {
      const lat = parseFloat(mlat);
      const lng = parseFloat(mlon);
      if (!isNaN(lat) && !isNaN(lng)) return { lat, lng };
    }

    const q = url.searchParams.get("q");
    if (q) {
      const [lat, lng] = q.split(",").map(Number);
      if (!isNaN(lat) && !isNaN(lng)) return { lat, lng };
    }

    const match = url.pathname.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      return {
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2]),
      };
    }

    return null;
  } catch (error) {
    console.warn("Invalid map link:", link);
    return null;
  }
};
