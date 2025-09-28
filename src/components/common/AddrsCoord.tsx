async function getCoordinates(address: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  );
  const data = await res.json();
  if (!data || data.length === 0){
    console.error("No coodinates found for given address")
  }
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}
export default getCoordinates;