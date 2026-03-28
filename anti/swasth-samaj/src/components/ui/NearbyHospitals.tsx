export default function NearbyHospitals() {
  return (
    <div className="card" style={{ marginTop: "3rem", background: "rgba(19, 136, 8, 0.05)", borderLeft: "4px solid var(--color-green)" }}>
      <h3 style={{ color: "var(--color-green-dark)", marginBottom: "1rem" }}>Nearby Healthcare Facilities</h3>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>Based on your location, here are some verified hospitals:</p>
      
      <div style={{ display: "grid", gap: "1rem" }}>
        {[
          { name: "City General Hospital", distance: "1.2 km", type: "Multispecialty" },
          { name: "Green Valley Clinic", distance: "3.5 km", type: "Primary Care" },
        ].map(h => (
          <div key={h.name} style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "var(--color-white)", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <div>
              <strong style={{ display: "block", color: "var(--color-heading)" }}>{h.name}</strong>
              <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{h.type}</span>
            </div>
            <div style={{ color: "var(--color-saffron-dark)", fontWeight: 600 }}>
              {h.distance}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
