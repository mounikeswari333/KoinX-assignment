import { formatCompactINR, getHoverCurrencyText } from "../../utils/formatters";
import { getNetGains, getRealisedGains } from "../../utils/calculations";
import "./preHarvest.css";

function PreHarvest({ gains }) {
  const stcgNet = getNetGains(gains.stcg.profits, gains.stcg.losses);
  const ltcgNet = getNetGains(gains.ltcg.profits, gains.ltcg.losses);
  const realised = getRealisedGains(gains);

  return (
    <article className="pre-card">
      <h3>Pre Harvesting</h3>

      <div className="gains-grid headings">
        <div></div>
        <div>Short-term</div>
        <div>Long-term</div>
      </div>

      <div className="gains-grid">
        <div>Profits</div>
        <div
          className="hover-value"
          title={getHoverCurrencyText(gains.stcg.profits)}
        >
          {formatCompactINR(gains.stcg.profits)}
        </div>
        <div
          className="hover-value"
          title={getHoverCurrencyText(gains.ltcg.profits)}
        >
          {formatCompactINR(gains.ltcg.profits)}
        </div>
      </div>

      <div className="gains-grid">
        <div>Losses</div>
        <div
          className="hover-value"
          title={getHoverCurrencyText(-gains.stcg.losses)}
        >
          - {formatCompactINR(gains.stcg.losses)}
        </div>
        <div
          className="hover-value"
          title={getHoverCurrencyText(-gains.ltcg.losses)}
        >
          - {formatCompactINR(gains.ltcg.losses)}
        </div>
      </div>

      <div className="gains-grid net">
        <div>Net Capital Gains</div>
        <div className="hover-value" title={getHoverCurrencyText(stcgNet)}>
          {formatCompactINR(stcgNet)}
        </div>
        <div className="hover-value" title={getHoverCurrencyText(ltcgNet)}>
          {formatCompactINR(ltcgNet)}
        </div>
      </div>

      <p className="realised-gains">
        Realised Capital Gains:{" "}
        <span className="hover-value" title={getHoverCurrencyText(realised)}>
          {formatCompactINR(realised)}
        </span>
      </p>
    </article>
  );
}

export default PreHarvest;
