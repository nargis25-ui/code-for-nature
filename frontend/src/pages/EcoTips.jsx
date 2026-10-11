import { useState } from "react";
import "./EcoTips.css";

export default function EcoTips() {
  const [electricity, setElectricity] = useState("");

  const usage = Number(electricity);
  const hasValue = electricity !== "";

  return (
    <div className="eco-page">
      <h1>Eco Tips 🌿</h1>
      <p>Check your electricity usage and learn how to save energy.</p>

      <div className="eco-box">
        <label>Electricity used (kWh)</label>

        <input
          type="number"
          min="0"
          value={electricity}
          onChange={(e) => setElectricity(e.target.value)}
          placeholder="Enter electricity usage"
        />
      </div>

      {hasValue && electricity >= 0 && (
        <div className={usage > 10 ? "eco-warning" : "eco-good"}>
          {usage > 10 ? (
            <>
              <h2>⚠️ Electricity usage is high!</h2>
              <p>
                You used {usage} kWh. Please reduce your electricity
                consumption.
              </p>

              <h3>What you can do:</h3>
              <ul>
                <li>Switch off unused lights and fans.</li>
                <li>Unplug chargers and unused devices.</li>
                <li>Use daylight instead of lights when possible.</li>
              </ul>
            </>
          ) : (
            <>
              <h2>✅ Your electricity usage looks okay!</h2>
              <p>You entered {usage} kWh. Keep saving energy!</p>
              <p>Tip: Switch off lights and devices when not in use.</p>
            </>
          )}
        </div>
      )}

      {hasValue && electricity < 0 && (
        <p className="eco-error">
          Please enter a number that is zero or higher.
        </p>
      )}
    </div>
  );
}