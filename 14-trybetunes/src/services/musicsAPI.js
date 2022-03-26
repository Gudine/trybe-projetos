const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
