export function generateDataPages(height, width) {
  const qMatrix = [];

  for (let row = 0; row < height; row++) {
    qMatrix.push([]);

    for (let col = 0; col < width; col++) {
      qMatrix[0].push({
        qNum: row * width + col,
      });
    }
  }

  return [{ qMatrix }];
}

export function generateLayout(nDims, nMeas, qColumnOrder = []) {
  const createField = (idx) => ({ qFallbackTitle: `title-${idx}`, cId: `id-${idx}` });
  const qDimensionInfo = [];
  const qMeasureInfo = [];

  for (let dim = 0; dim < nDims; dim++) {
    qDimensionInfo.push(createField(dim));
  }
  for (let mea = 0; mea < nMeas; mea++) {
    qMeasureInfo.push(createField(nDims + mea));
  }

  return {
    qHyperCube: {
      qDimensionInfo,
      qMeasureInfo,
      qColumnOrder,
      qSize: { qcx: nDims + nMeas },
    },
  };
}