import { useMemo, useState } from "react";
import {
  formatAssetAmount,
  formatCompactINR,
  formatINR,
  getHoverCurrencyText,
  getHoverSignedCurrencyText,
  formatSignedCompactINR,
} from "../../utils/formatters";
import { getTotalCurrentValue } from "../../utils/calculations";
import "./holdingsTable.css";

const INITIAL_ROW_LIMIT = 4;

const sortRows = (rows, sortKey, direction) => {
  if (!sortKey) return rows;

  return [...rows].sort((a, b) => {
    const aValue = sortKey === "stcg" ? a.stcg.gain : a.ltcg.gain;
    const bValue = sortKey === "stcg" ? b.stcg.gain : b.ltcg.gain;

    if (direction === "asc") return aValue - bValue;
    return bValue - aValue;
  });
};

function HoldingsTable({ holdings, selectedIds, onToggleRow, onToggleAll }) {
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const allSelected =
    holdings.length > 0 && selectedIds.size === holdings.length;
  const isLimited = holdings.length > INITIAL_ROW_LIMIT;
  const [showAll, setShowAll] = useState(false);

  const sortedRows = useMemo(
    () => sortRows(holdings, sortKey, sortDirection),
    [holdings, sortDirection, sortKey],
  );

  const visibleRows = showAll
    ? sortedRows
    : sortedRows.slice(0, INITIAL_ROW_LIMIT);

  const handleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
      return;
    }

    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const getSortLabel = (key, title) => {
    if (sortKey !== key) return `${title} ↕`;
    return `${title} ${sortDirection === "asc" ? "↑" : "↓"}`;
  };

  return (
    <section className="holdings-card">
      <h3>Holdings</h3>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>
                <label className="check-wrap">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={onToggleAll}
                  />
                  <span>Asset</span>
                </label>
              </th>
              <th>
                Holdings
                <br />
                Avg Buy Price
              </th>
              <th>Total Current Value</th>
              <th>
                <button
                  type="button"
                  className="sort-button"
                  onClick={() => handleSort("stcg")}
                >
                  {getSortLabel("stcg", "Short-term")}
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="sort-button"
                  onClick={() => handleSort("ltcg")}
                >
                  {getSortLabel("ltcg", "Long-term")}
                </button>
              </th>
              <th>Amount to Sell</th>
            </tr>
          </thead>

          <tbody>
            {visibleRows.map((holding) => {
              const isSelected = selectedIds.has(holding.id);
              const stcgClass =
                holding.stcg.gain >= 0 ? "gain-positive" : "gain-negative";
              const ltcgClass =
                holding.ltcg.gain >= 0 ? "gain-positive" : "gain-negative";
              const totalCurrentValue = getTotalCurrentValue(holding);

              return (
                <tr
                  key={holding.id}
                  className={isSelected ? "selected-row" : ""}
                >
                  <td>
                    <div className="asset-cell">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleRow(holding.id)}
                      />
                      <img src={holding.logo} alt={holding.coin} />
                      <div>
                        <p>{holding.coinName}</p>
                        <span>{holding.coin}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <p>
                      {formatAssetAmount(holding.totalHolding)} {holding.coin}
                    </p>
                    <span>{formatINR(holding.averageBuyPrice)}</span>
                  </td>

                  <td>
                    <p
                      className="hover-value"
                      title={getHoverCurrencyText(totalCurrentValue)}
                    >
                      {formatCompactINR(totalCurrentValue)}
                    </p>
                  </td>

                  <td>
                    <p
                      className={`${stcgClass} hover-value`}
                      title={getHoverSignedCurrencyText(holding.stcg.gain)}
                    >
                      {formatSignedCompactINR(holding.stcg.gain)}
                    </p>
                    <span>
                      {formatAssetAmount(holding.stcg.balance)} {holding.coin}
                    </span>
                  </td>

                  <td>
                    <p
                      className={`${ltcgClass} hover-value`}
                      title={getHoverSignedCurrencyText(holding.ltcg.gain)}
                    >
                      {formatSignedCompactINR(holding.ltcg.gain)}
                    </p>
                    <span>
                      {formatAssetAmount(holding.ltcg.balance)} {holding.coin}
                    </span>
                  </td>

                  <td>
                    <p>
                      {isSelected
                        ? `${formatAssetAmount(holding.totalHolding)} ${holding.coin}`
                        : "-"}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isLimited && (
        <button
          type="button"
          className="view-all"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show less" : "View all"}
        </button>
      )}
    </section>
  );
}

export default HoldingsTable;
