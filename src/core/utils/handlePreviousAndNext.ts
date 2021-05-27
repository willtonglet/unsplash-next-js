export const handlePreviousAndNext = (
  data: ImageProps[],
  queryId: string,
): { current: string; previous: string; next: string } => {
  const currentIndex = data.findIndex((photo) => photo.id === queryId);

  return {
    current: String(data.find((photo) => photo.id === queryId)?.id),
    previous: data[currentIndex - 1]?.id,
    next: data[currentIndex + 1]?.id,
  };
};
