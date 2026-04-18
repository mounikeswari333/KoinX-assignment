import { useEffect, useMemo, useRef, useState } from "react";
import HeaderBar from "../../components/headerBar/headerBar";
import NotesDisclaimer from "../../components/notesDisclaimer/notesDisclaimer";
import HowItWorks from "../../components/howItWorks/howItWorks";
import PreHarvest from "../../components/preHarvest/preHarvest";
import PostHarvest from "../../components/postHarvest/postHarvest";
import HoldingsTable from "../../components/holdingsTable/holdingsTable";
import { fetchCapitalGains, fetchHoldings } from "../../api/taxHarvestApi";
import {
  getAfterHarvestGains,
  getRealisedGains,
  getTotalCurrentValue,
} from "../../utils/calculations";
import "./taxHarvest.css";

const HOW_PANEL_BREAKPOINT = 940;

function TaxHarvestSkeleton() {
  return (
    <div className="tax-page">
      <HeaderBar />
      <main className="tax-container">
        <section className="title-row skeleton-title-row">
          <div className="skeleton-block skeleton-title" />
          <div className="skeleton-block skeleton-link" />
        </section>

        <section className="skeleton-notes skeleton-block" />

        <section className="cards-grid">
          <article className="skeleton-card skeleton-block" />
          <article className="skeleton-card skeleton-block" />
        </section>

        <section className="skeleton-table skeleton-block">
          <div className="skeleton-table-head skeleton-block" />
          <div className="skeleton-row skeleton-block" />
          <div className="skeleton-row skeleton-block" />
          <div className="skeleton-row skeleton-block" />
          <div className="skeleton-row skeleton-block" />
        </section>
      </main>
    </div>
  );
}

function TaxHarvestPage() {
  const [capitalGains, setCapitalGains] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isHowOpen, setIsHowOpen] = useState(false);
  const howTriggerRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [gainsData, holdingsData] = await Promise.all([
          fetchCapitalGains(),
          fetchHoldings(),
        ]);

        const sortedHoldings = holdingsData
          .map((item, index) => ({
            ...item,
            id: `${item.coin}-${index}`,
          }))
          .sort((a, b) => getTotalCurrentValue(b) - getTotalCurrentValue(a));

        setCapitalGains(gainsData);
        setHoldings(sortedHoldings);
      } catch {
        setError("Unable to load data. Please refresh and try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const handleOutsidePress = (event) => {
      if (window.innerWidth > HOW_PANEL_BREAKPOINT) return;
      if (!isHowOpen) return;

      if (howTriggerRef.current?.contains(event.target)) return;
      setIsHowOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth > HOW_PANEL_BREAKPOINT) {
        setIsHowOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePress);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePress);
      window.removeEventListener("resize", handleResize);
    };
  }, [isHowOpen]);

  const selectedHoldings = useMemo(
    () => holdings.filter((holding) => selectedIds.has(holding.id)),
    [holdings, selectedIds],
  );

  const afterHarvestGains = useMemo(() => {
    if (!capitalGains) return null;
    return getAfterHarvestGains(capitalGains, selectedHoldings);
  }, [capitalGains, selectedHoldings]);

  const preRealised = useMemo(() => {
    if (!capitalGains) return 0;
    return getRealisedGains(capitalGains);
  }, [capitalGains]);

  const handleToggleRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleAll = () => {
    setSelectedIds((prev) => {
      if (prev.size === holdings.length) {
        return new Set();
      }
      return new Set(holdings.map((holding) => holding.id));
    });
  };

  const handleHowClick = () => {
    if (window.innerWidth <= HOW_PANEL_BREAKPOINT) {
      setIsHowOpen((prev) => !prev);
    }
  };

  if (isLoading) {
    return <TaxHarvestSkeleton />;
  }

  if (error) {
    return (
      <main className="page-state error">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <div className="tax-page">
      <HeaderBar />

      <main className="tax-container">
        <section className="title-row">
          <h1>Tax Harvesting</h1>
          <div
            ref={howTriggerRef}
            className={`how-trigger ${isHowOpen ? "mobile-open" : ""}`}
          >
            <button
              type="button"
              className="how-link"
              aria-expanded={isHowOpen}
              onClick={handleHowClick}
            >
              How it works?
            </button>
            <HowItWorks />
          </div>
        </section>

        <NotesDisclaimer />

        <section className="cards-grid">
          <PreHarvest gains={capitalGains} />
          <PostHarvest gains={afterHarvestGains} preRealised={preRealised} />
        </section>

        <HoldingsTable
          holdings={holdings}
          selectedIds={selectedIds}
          onToggleRow={handleToggleRow}
          onToggleAll={handleToggleAll}
        />
      </main>
    </div>
  );
}

export default TaxHarvestPage;
