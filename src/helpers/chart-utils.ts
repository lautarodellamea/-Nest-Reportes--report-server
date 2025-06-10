import axios from 'axios';

export const chartJsToImage = async (chartConfig: unknown) => {
  const encodedUrl = encodeURIComponent(JSON.stringify(chartConfig));

  const chartUrl = `https://quickchart.io/chart?c=${encodedUrl}`;

  const response = await axios.get(chartUrl, { responseType: 'arraybuffer' });

  return `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
};
