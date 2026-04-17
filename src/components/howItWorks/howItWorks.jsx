import "./howItWorks.css";

function HowItWorks() {
  return (
    <section className="how-card">
      <p>
        Demo note: this section uses placeholder content for assignment
        purposes.
      </p>
      <ul>
        <li>Pick holdings from the table to simulate harvesting.</li>
        <li>
          Negative gains increase losses, positive gains increase profits.
        </li>
        <li>After Harvesting values update instantly.</li>
        <li>Savings text appears only when post-harvest gains are lower.</li>
      </ul>
    </section>
  );
}

export default HowItWorks;
