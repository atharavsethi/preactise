"use client";
import React, { useState } from "react";

export interface Step {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const Stepper = ({ steps }: { steps: Step[] }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: "1rem" }}>
        {/* Background Track */}
        <div style={{ position: "absolute", top: "24px", left: "10%", right: "10%", height: "4px", background: "rgba(0,0,0,0.05)", zIndex: 0, borderRadius: "2px" }} />
        {/* Active Track */}
        <div style={{ 
          position: "absolute", top: "24px", left: "10%", height: "4px", background: "var(--color-green)", zIndex: 0, borderRadius: "2px",
          width: `${(currentStep / (steps.length - 1)) * 80}%`, transition: "width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" 
        }} />
        
        {steps.map((step, idx) => (
          <div key={idx} onClick={() => setCurrentStep(idx)} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", flex: 1 }}>
            <div style={{
              width: "50px", height: "50px", borderRadius: "50%",
              background: idx <= currentStep ? "var(--color-green)" : "white",
              color: idx <= currentStep ? "white" : "var(--color-text-muted)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: "bold", fontSize: "1.2rem",
              border: `3px solid ${idx <= currentStep ? "var(--color-green)" : "rgba(0,0,0,0.1)"}`,
              transition: "all 0.4s ease",
              boxShadow: idx === currentStep ? "var(--shadow-md)" : "none",
              transform: idx === currentStep ? "scale(1.1)" : "scale(1)"
            }}>
              {step.icon || idx + 1}
            </div>
            <h4 style={{ 
              marginTop: "1rem", 
              color: idx === currentStep ? "var(--color-green-dark)" : "var(--color-text-muted)", 
              transition: "color 0.3s ease", 
              textAlign: "center", fontSize: "0.95rem",
              fontWeight: idx === currentStep ? 700 : 500
            }}>
              {step.title}
            </h4>
          </div>
        ))}
      </div>
      
      <div style={{ 
        background: "white", padding: "2.5rem", borderRadius: "var(--radius-lg)", 
        border: "1px solid rgba(0,0,0,0.05)", minHeight: "150px", 
        boxShadow: "var(--shadow-md)", textAlign: "center",
        animation: "fade-in-up 0.4s ease forwards"
      }} key={currentStep}>
        <h3 style={{ color: "var(--color-heading)", marginBottom: "1rem", fontSize: "1.5rem" }}>{steps[currentStep].title}</h3>
        <p style={{ color: "var(--color-text-muted)", lineHeight: 1.6, fontSize: "1.05rem" }}>{steps[currentStep].description}</p>
      </div>
    </div>
  );
};
