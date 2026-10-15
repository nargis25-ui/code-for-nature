import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Zap,
  Droplets,
  Recycle,
  BrainCircuit,
  Plus,
  Leaf,
} from "lucide-react";
import { auth } from "../firebase";
import "./my-tracker.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:5000" : "");

const ELECTRICITY_EMISSION_FACTOR = 0.716;

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createEmptyForm() {
  return {
    date: getLocalDateString(),
    electricity: "",
    water: "",
    ewaste: "",
    aiUsage: "",
    notes: "",
  };
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function normalizeRecord(record) {
  return {
    id: record.id,
    electricity: Number(record.electricity) || 0,
    water: Number(record.water) || 0,
    ewaste: Number(record.ewaste) || 0,
    aiUsage: Number(record.aiUsage) || 0,
    createdAt: record.createdAt || null,
  };
}

async function apiRequest(path, options = {}) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please sign in to access your usage records.");
  }

  const token = await user.getIdToken();

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || "The request failed.");
  }

  return result;
}

export default function MyTracker() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(createEmptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadRecords = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await apiRequest("/api/usage");

      setRecords(
        (Array.isArray(result.records) ? result.records : []).map(
          normalizeRecord
        )
      );
    } catch (err) {
      setError(err.message || "Unable to load usage records.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchRecords() {
      setLoading(true);
      setError("");

      try {
        const user = auth.currentUser;

        if (!user) {
          throw new Error("Please sign in to view your usage records.");
        }

        const token = await user.getIdToken();

        const response = await fetch(`${API_BASE}/api/usage`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(result.message || "Unable to load records.");
        }

        if (!cancelled) {
          setRecords(
            (Array.isArray(result.records) ? result.records : []).map(
              normalizeRecord
            )
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load usage records.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRecords();

    return () => {
      cancelled = true;
    };
  }, []);

  const totals = useMemo(
    () =>
      records.reduce(
        (result, record) => ({
          electricity: result.electricity + record.electricity,
          water: result.water + record.water,
          ewaste: result.ewaste + record.ewaste,
          aiUsage: result.aiUsage + record.aiUsage,
          emissions:
            result.emissions +
            record.electricity * ELECTRICITY_EMISSION_FACTOR,
        }),
        {
          electricity: 0,
          water: 0,
          ewaste: 0,
          aiUsage: 0,
          emissions: 0,
        }
      ),
    [records]
  );

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (form.date > getLocalDateString()) {
      setError("The record date cannot be in the future.");
      return;
    }

    const fields = [
      { key: "electricity", label: "Electricity" },
      { key: "water", label: "Water" },
      { key: "ewaste", label: "E-waste" },
      { key: "aiUsage", label: "AI prompts" },
    ];

    const values = {};

    for (const field of fields) {
      const rawValue = form[field.key];
      const number = Number(rawValue);

      if (
        rawValue.trim() === "" ||
        !Number.isFinite(number) ||
        number < 0
      ) {
        setError(
          `${field.label}: enter a valid number equal to or greater than zero.`
        );
        return;
      }

      values[field.key] = number;
    }

    if (!Number.isInteger(values.aiUsage)) {
      setError("AI prompts must be a whole number.");
      return;
    }

    setSaving(true);

    try {
      await apiRequest("/api/usage", {
        method: "POST",
        body: JSON.stringify(values),
      });

      await loadRecords();

      setForm(createEmptyForm());
      setShowForm(false);
      setMessage("Your usage record has been saved to the backend.");
    } catch (err) {
      setError(err.message || "Could not save your usage record.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="feature-page tracker-page">
      <div className="feature-intro tracker-intro">
        <span className="feature-tag">ECOAI / PERSONAL WORKSPACE</span>
        <h2>My Tracker</h2>
        <p>
          Track your daily resource usage, review your history, and
          understand your resource consumption over time.
        </p>
      </div>

      <div className="tracker-welcome">
        <div className="tracker-welcome-icon">
          <Leaf size={25} />
        </div>

        <div className="tracker-welcome-copy">
          <h3>Your sustainability journey</h3>
          <p>
            Record your resource use regularly to understand your habits
            and identify opportunities to reduce waste.
          </p>
        </div>

        <button
          type="button"
          className="tracker-primary-button"
          onClick={() => {
            setShowForm((previous) => !previous);
            setError("");
            setMessage("");
          }}
        >
          <Plus size={17} />
          {showForm ? "Close form" : "Add usage"}
        </button>
      </div>

      {message && (
        <div className="tracker-message success" role="status">
          {message}
        </div>
      )}

      {error && (
        <div className="tracker-message error" role="alert">
          {error}
        </div>
      )}

      {showForm && (
        <section className="tracker-card">
          <div className="tracker-section-heading">
            <div>
              <h3>Record your resource usage</h3>
              <p>Enter your usage values for one day.</p>
            </div>
          </div>

          <form className="tracker-form" onSubmit={handleSubmit}>
            <label className="tracker-field tracker-date-field">
              Date
              <input
                type="date"
                name="date"
                value={form.date}
                max={getLocalDateString()}
                onChange={updateField}
                required
              />
            </label>

            <label className="tracker-field">
              <span className="tracker-field-title">
                <Zap size={17} /> Electricity
              </span>
              <span className="tracker-unit">Kilowatt-hours (kWh)</span>
              <input
                type="number"
                name="electricity"
                min="0"
                step="any"
                value={form.electricity}
                onChange={updateField}
                placeholder="e.g. 4.5"
                required
              />
            </label>

            <label className="tracker-field">
              <span className="tracker-field-title">
                <Droplets size={17} /> Water
              </span>
              <span className="tracker-unit">Litres</span>
              <input
                type="number"
                name="water"
                min="0"
                step="any"
                value={form.water}
                onChange={updateField}
                placeholder="e.g. 120"
                required
              />
            </label>

            <label className="tracker-field">
              <span className="tracker-field-title">
                <Recycle size={17} /> E-waste
              </span>
              <span className="tracker-unit">Kilograms (kg)</span>
              <input
                type="number"
                name="ewaste"
                min="0"
                step="any"
                value={form.ewaste}
                onChange={updateField}
                placeholder="e.g. 0.2"
                required
              />
            </label>

            <label className="tracker-field">
              <span className="tracker-field-title">
                <BrainCircuit size={17} /> AI usage
              </span>
              <span className="tracker-unit">Number of AI prompts</span>
              <input
                type="number"
                name="aiUsage"
                min="0"
                step="1"
                value={form.aiUsage}
                onChange={updateField}
                placeholder="e.g. 12"
                required
              />
            </label>

            <div className="tracker-form-actions">
              <button
                type="button"
                className="tracker-secondary-button"
                disabled={saving}
                onClick={() => {
                  setShowForm(false);
                  setForm(createEmptyForm());
                  setError("");
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="tracker-primary-button"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save record"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="tracker-stats" aria-label="Usage totals">
        <article className="tracker-stat-card">
          <span className="tracker-stat-icon electricity">
            <Zap size={21} />
          </span>
          <p>Total electricity</p>
          <strong>{formatNumber(totals.electricity)}</strong>
          <span className="tracker-stat-unit">kWh recorded</span>
        </article>

        <article className="tracker-stat-card">
          <span className="tracker-stat-icon emissions">
            <Leaf size={21} />
          </span>
          <p>Estimated electricity emissions</p>
          <strong>{formatNumber(totals.emissions)}</strong>
          <span className="tracker-stat-unit">kg CO₂e · estimated</span>
        </article>

        <article className="tracker-stat-card">
          <span className="tracker-stat-icon water">
            <Droplets size={21} />
          </span>
          <p>Total water</p>
          <strong>{formatNumber(totals.water)}</strong>
          <span className="tracker-stat-unit">litres recorded</span>
        </article>

        <article className="tracker-stat-card">
          <span className="tracker-stat-icon waste">
            <Recycle size={21} />
          </span>
          <p>Total e-waste</p>
          <strong>{formatNumber(totals.ewaste)}</strong>
          <span className="tracker-stat-unit">kg recorded</span>
        </article>

        <article className="tracker-stat-card">
          <span className="tracker-stat-icon ai">
            <BrainCircuit size={21} />
          </span>
          <p>AI prompts</p>
          <strong>{formatNumber(totals.aiUsage)}</strong>
          <span className="tracker-stat-unit">prompts recorded</span>
        </article>
      </section>

      <section className="tracker-card tracker-history">
        <div className="tracker-section-heading">
          <div>
            <h3>Usage history</h3>
            <p>
              {loading
                ? "Loading records from your account..."
                : `${records.length} ${
                    records.length === 1 ? "record" : "records"
                  } loaded from your account`}
            </p>
          </div>

          <button
            type="button"
            className="tracker-secondary-button"
            onClick={loadRecords}
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading usage history...</p>
        ) : records.length === 0 ? (
          <div className="tracker-empty">
            <div className="tracker-empty-icon">
              <Leaf size={27} />
            </div>
            <h3>No usage records yet</h3>
            <p>Add your first record to start tracking your resource use.</p>
            <button
              type="button"
              className="tracker-primary-button"
              onClick={() => setShowForm(true)}
            >
              <Plus size={17} /> Add first record
            </button>
          </div>
        ) : (
          <div className="tracker-table-wrapper">
            <table className="tracker-table">
              <thead>
                <tr>
                  <th>Date saved</th>
                  <th>Electricity</th>
                  <th>Water</th>
                  <th>E-waste</th>
                  <th>AI prompts</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{formatDate(record.createdAt)}</td>
                    <td>{formatNumber(record.electricity)} kWh</td>
                    <td>{formatNumber(record.water)} L</td>
                    <td>{formatNumber(record.ewaste)} kg</td>
                    <td>{formatNumber(record.aiUsage)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="tracker-disclaimer">
        Totals are calculated from usage records returned by your backend.
        Electricity emissions are estimates using a provisional factor of
        0.716 kg CO₂e per kWh.
      </p>
    </div>
  );
}

