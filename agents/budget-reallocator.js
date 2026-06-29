async function recommendReallocation(campaigns) {
  const sorted = [...campaigns].sort((a, b) => b.roas - a.roas);
  return sorted.map((c, i) => ({
    campaign: c.name,
    action: i === 0 ? 'INCREASE_BUDGET_20PCT' : i === sorted.length - 1 ? 'PAUSE' : 'MAINTAIN',
  }));
}
module.exports = { recommendReallocation };
