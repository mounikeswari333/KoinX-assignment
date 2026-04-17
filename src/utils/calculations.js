export const getNetGains = (profits, losses) => profits - losses;

export const getRealisedGains = (gains) => {
  // Effective capital gains is the sum of short-term and long-term net gains.
  const stcgNet = getNetGains(gains.stcg.profits, gains.stcg.losses);
  const ltcgNet = getNetGains(gains.ltcg.profits, gains.ltcg.losses);
  return stcgNet + ltcgNet;
};

const getSelectedTotals = (selectedHoldings, key) => {
  let positiveTotal = 0;
  let negativeTotal = 0;

  selectedHoldings.forEach((holding) => {
    const gain = holding[key].gain;
    if (gain >= 0) {
      positiveTotal += gain;
    } else {
      negativeTotal += Math.abs(gain);
    }
  });

  return { positiveTotal, negativeTotal };
};

export const getAfterHarvestGains = (baseGains, selectedHoldings) => {
  const stcgTotals = getSelectedTotals(selectedHoldings, "stcg");
  const ltcgTotals = getSelectedTotals(selectedHoldings, "ltcg");

  // If user selected positive/negative values, replace that side in after-harvest card.
  // If nothing selected for one side, keep the original API value for that side.
  return {
    stcg: {
      profits:
        stcgTotals.positiveTotal > 0
          ? stcgTotals.positiveTotal
          : baseGains.stcg.profits,
      losses:
        stcgTotals.negativeTotal > 0
          ? stcgTotals.negativeTotal
          : baseGains.stcg.losses,
    },
    ltcg: {
      profits:
        ltcgTotals.positiveTotal > 0
          ? ltcgTotals.positiveTotal
          : baseGains.ltcg.profits,
      losses:
        ltcgTotals.negativeTotal > 0
          ? ltcgTotals.negativeTotal
          : baseGains.ltcg.losses,
    },
  };
};

export const getTotalCurrentValue = (holding) =>
  holding.currentPrice * holding.totalHolding;
