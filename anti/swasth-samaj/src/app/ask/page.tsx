"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function AskQuestionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({ title: "", description: "", category: "General Medicine" });
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        
        recog.onresult = (event: any) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + " ";
            }
          }
          if (finalTranscript) {
            setFormData(prev => ({ ...prev, description: prev.description + finalTranscript }));
          }
        };

        recog.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsRecording(false);
        };

        recog.onend = () => {
          setIsRecording(false);
        };

        setRecognition(recog);
      }
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognition?.stop();
      setIsRecording(false);
    } else {
      recognition?.start();
      setIsRecording(true);
    }
  };

  if (status === "loading") return <div className="container" style={{ padding: "100px 0" }}>Loading...</div>;
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    setLoading(false);
    if (res.ok) {
      router.push("/questions");
    } else {
      alert("Failed to post question");
    }
  };

  const categories = [
    "General Medicine", "Nutrition & Diet", "Mental Health", "Pediatrics", 
    "Cardiology", "Dermatology", "Women's Health", "Emergency & First Aid", 
    "Dental", "Other"
  ];

  const handleMockAITriage = () => {
    setLoading(true);
    setTimeout(() => {
      setFormData({
        title: "Persistent Migraine with Aura",
        description: "AI Triage Summary:\n- Primary Symptom: Severe throbbing pain on left side.\n- Duration: 48 hours.\n- Accompanying Symptoms: Visual aura, nausea, sensitivity to light.\n- Severity: 8/10.\n\nUser Notes: I have tried paracetamol but it hasn't helped. Should I visit the ER?",
        category: "General Medicine"
      });
      setLoading(false);
    }, 1500);
  };

  const handleMockReportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLoading(true);
      setTimeout(() => {
        setFormData({
          title: "High LDL Cholesterol levels in recent blood work",
          description: "AI Report Analysis (Extracted from document):\n- Total Cholesterol: 240 mg/dL (High)\n- LDL: 160 mg/dL (High)\n- HDL: 45 mg/dL (Normal)\n- Triglycerides: 175 mg/dL (Borderline High)\n\nQuestion: Based on these numbers, what dietary changes should I immediately adopt before my next physical?",
          category: "Nutrition & Diet"
        });
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className={`container ${styles.askContainer}`}>
      <div className={`card ${styles.askCard}`}>
        <div className={styles.askHeader}>
          <h2>Ask a Health Question</h2>
          <p>Get verified answers from certified medical professionals.</p>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", background: "rgba(19,136,8,0.05)", padding: "1.5rem", borderRadius: "8px", border: "1px dashed var(--color-green)" }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: "var(--color-green-dark)", marginBottom: "0.5rem" }}>🤖 AI Smart Tools</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>Save time by letting AI structure your question.</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button type="button" onClick={handleMockAITriage} className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}>
                💬 Start Symptom Triage
              </button>
              <label className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem", cursor: "pointer", margin: 0 }}>
                📑 Upload Lab Report
                <input type="file" accept=".pdf,image/*" style={{ display: "none" }} onChange={handleMockReportUpload} />
              </label>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.askForm}>
          <div className="input-group">
            <label className="input-label" htmlFor="title">Title</label>
            <input 
              id="title"
              type="text" 
              className="input-field"
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              placeholder="Brief summary of your question"
              required 
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="category">Category</label>
            <select 
              id="category"
              className="input-field"
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})} 
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="input-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label className="input-label" htmlFor="description" style={{ marginBottom: 0 }}>Detailed Description</label>
              {recognition && (
                <button 
                  type="button" 
                  onClick={toggleRecording} 
                  className={`btn btn-outline ${isRecording ? styles.recordingActive : ''}`}
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  {isRecording ? "🔴 Recording..." : "🎤 Voice Typing"}
                </button>
              )}
            </div>
            <textarea 
              id="description"
              className="input-field"
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              style={{ minHeight: "150px", resize: "vertical" }} 
              placeholder="Include relevant details, timeline, etc. Complete voice typing by pausing."
              required 
            />
          </div>

          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
            {loading ? "Posting..." : "Post Question"}
          </button>
        </form>
      </div>
    </div>
  );
}
