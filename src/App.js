import { useState, useEffect } from "react";

// ─── SAMPLE DATA (used when no Supabase ID in URL) ───────────────────────────
const SAMPLE_PLAN = {
  customer: {
    name: "Priya Sharma",
    age: 27, gender: "Female",
    height: "162 cm", weight: "68 kg",
    goal: "Weight Loss", diet: "Pure Vegetarian",
    allergies: "Peanuts", condition: "None",
    plan: "15-Day Plan", calories: "1,600–1,800 kcal/day",
  },
  days: [
    {
      day: 1, totalKcal: 1650,
      meals: [
        { time: "Early Morning", icon: "🌅", food: "1 glass warm lemon water (200ml) + 5 soaked almonds (10g)", kcal: 50, protein: "2g", carbs: "3g", fat: "4g" },
        { time: "Breakfast", icon: "☀️", food: "2 moong dal chilla (80g batter) + 1 cup low-fat curd (150ml) + 1 cup green tea", kcal: 320, protein: "18g", carbs: "38g", fat: "8g" },
        { time: "Mid-Morning", icon: "🍎", food: "1 medium apple (150g) + 1 glass buttermilk (200ml)", kcal: 150, protein: "4g", carbs: "28g", fat: "2g" },
        { time: "Lunch", icon: "🍱", food: "2 whole wheat roti (60g) + 1 cup dal (150ml) + 1 cup mixed sabzi (150g) + salad (100g)", kcal: 480, protein: "22g", carbs: "72g", fat: "10g" },
        { time: "Evening", icon: "🌿", food: "1 cup masala chai no sugar (150ml) + 2 whole grain crackers (20g)", kcal: 120, protein: "3g", carbs: "18g", fat: "4g" },
        { time: "Dinner", icon: "🌙", food: "1 cup vegetable khichdi (200g) + 1 cup low-fat curd (150ml) + 1 glass warm turmeric milk (200ml)", kcal: 530, protein: "20g", carbs: "78g", fat: "12g" },
      ],
    },
    {
      day: 2, totalKcal: 1620,
      meals: [
        { time: "Early Morning", icon: "🌅", food: "1 glass methi water (200ml) + 4 walnuts (15g)", kcal: 55, protein: "1g", carbs: "2g", fat: "5g" },
        { time: "Breakfast", icon: "☀️", food: "1 cup oats porridge (50g oats) + banana (100g) + 1 cup soy milk (200ml)", kcal: 310, protein: "12g", carbs: "52g", fat: "6g" },
        { time: "Mid-Morning", icon: "🍎", food: "1 cup mixed sprouts chaat (100g) + lemon juice", kcal: 160, protein: "8g", carbs: "24g", fat: "2g" },
        { time: "Lunch", icon: "🍱", food: "1 cup brown rice (150g cooked) + 1 cup rajma (150ml) + cucumber raita (100g)", kcal: 490, protein: "20g", carbs: "80g", fat: "8g" },
        { time: "Evening", icon: "🌿", food: "1 glass coconut water (200ml) + handful roasted makhana (20g)", kcal: 110, protein: "2g", carbs: "20g", fat: "1g" },
        { time: "Dinner", icon: "🌙", food: "2 jowar roti (60g) + 1 cup palak paneer (150g) + 1 cup vegetable soup (200ml)", kcal: 495, protein: "24g", carbs: "56g", fat: "16g" },
      ],
    },
    {
      day: 3, totalKcal: 1660,
      meals: [
        { time: "Early Morning", icon: "🌅", food: "Warm lemon-ginger water (200ml) + 4 soaked almonds (10g)", kcal: 48, protein: "1g", carbs: "3g", fat: "4g" },
        { time: "Breakfast", icon: "☀️", food: "2 besan cheela (80g batter) + green chutney (30g) + 1 cup green tea", kcal: 300, protein: "16g", carbs: "36g", fat: "9g" },
        { time: "Mid-Morning", icon: "🍎", food: "1 medium orange (150g)", kcal: 70, protein: "1g", carbs: "17g", fat: "0g" },
        { time: "Lunch", icon: "🍱", food: "2 chapati (60g) + 1 cup chhole (150g) + sabzi (100g) + salad (100g)", kcal: 510, protein: "20g", carbs: "78g", fat: "10g" },
        { time: "Evening", icon: "🌿", food: "1 apple (150g) + 1 cup green tea", kcal: 80, protein: "0g", carbs: "21g", fat: "0g" },
        { time: "Dinner", icon: "🌙", food: "1 cup vegetable soup (200ml) + 1 multigrain roti (30g) + sabzi (150g)", kcal: 350, protein: "14g", carbs: "52g", fat: "8g" },
      ],
    },
  ],
  shopping: [
    { category: "🌾 Grains & Pulses", items: ["Whole wheat flour 500g", "Brown rice 500g", "Oats 250g", "Moong dal 250g", "Rajma 250g", "Jowar flour 250g"] },
    { category: "🥦 Vegetables", items: ["Spinach 500g", "Mixed vegetables 1kg", "Tomatoes 500g", "Cucumber 4 pcs", "Onion 500g", "Bottle gourd 500g"] },
    { category: "🥛 Dairy & Protein", items: ["Low-fat curd 1kg", "Paneer 200g", "Soy milk 1L", "Buttermilk 500ml"] },
    { category: "🌰 Nuts & Seeds", items: ["Almonds 100g", "Walnuts 100g", "Makhana 100g", "Flaxseeds 50g"] },
  ],
  avoid: ["White rice & maida products", "Sugary drinks & packaged juices", "Fried snacks (samosa, chips)", "Sweets & mithai", "Peanuts & peanut products ⚠️ Allergy", "Late night eating after 9 PM"],
  tips: [
    "Drink 8–10 glasses of water daily",
    "Walk 30–45 minutes every day",
    "Eat dinner before 8 PM",
    "Chew slowly and eat mindfully",
    "Sleep 7–8 hours for better metabolism",
    "Avoid screens 30 mins before bed",
  ],
};

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://supabase.com/dashboard/project/iidowgytzawnwupannvb
";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZG93Z3l0emF3bnd1cGFubnZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NDU4MTMsImV4cCI6MjA5MjQyMTgxM30.6KJn_uDyP3Ezl54tEwwkb8rc5ioeYqQ1s9fYQusvahk";

// ─── MEAL TIME COLORS ─────────────────────────────────────────────────────────
const mealColors = {
  "Early Morning": "#f59e0b",
  "Breakfast": "#10b981",
  "Mid-Morning": "#3b82f6",
  "Lunch": "#8b5cf6",
  "Evening": "#ec4899",
  "Dinner": "#6366f1",
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function DietPlanViewer() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeTab, setActiveTab] = useState("plan");
  const [expandedMeal, setExpandedMeal] = useState(null);

  // Load plan from Supabase or use sample
  useEffect(() => {
    const loadPlan = async () => {
      // Get plan ID from URL: yoursite.com/plan?id=abc123
      const params = new URLSearchParams(window.location.search);
      const planId = params.get("id");

      if (!planId || SUPABASE_URL === "YOUR_SUPABASE_URL") {
        // Use sample data for preview
        setTimeout(() => { setPlan(SAMPLE_PLAN); setLoading(false); }, 800);
        return;
      }

      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/diet_plans?id=eq.${planId}&select=*`,
          { headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` } }
        );
        const data = await res.json();
        if (data && data[0]) {
          setPlan(data[0].plan_data);
        } else {
          setError("Plan not found. Please check your link.");
        }
      } catch (e) {
        setError("Could not load your plan. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadPlan();
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  if (!plan) return null;

  const currentDay = plan.days[selectedDay - 1];
  const totalDays = plan.days.length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a1628 0%, #0d2b1a 40%, #0a1628 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#e8f5e9",
    }}>

      {/* ── HERO HEADER ── */}
      <div style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #0d3320 0%, #1a5c35 50%, #0d3320 100%)",
        padding: "40px 20px 30px",
        borderBottom: "1px solid rgba(74,222,128,0.2)",
      }}>
        {/* Decorative circles */}
        <div style={{ position:"absolute", top:-60, right:-60, width:220, height:220, borderRadius:"50%", background:"rgba(74,222,128,0.06)", border:"1px solid rgba(74,222,128,0.1)" }} />
        <div style={{ position:"absolute", bottom:-40, left:-40, width:160, height:160, borderRadius:"50%", background:"rgba(74,222,128,0.04)", border:"1px solid rgba(74,222,128,0.08)" }} />

        <div style={{ maxWidth:680, margin:"0 auto", position:"relative" }}>
          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(74,222,128,0.12)", border:"1px solid rgba(74,222,128,0.25)", borderRadius:30, padding:"4px 14px", marginBottom:16 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", display:"inline-block" }} />
            <span style={{ fontSize:11, color:"#4ade80", letterSpacing:2, textTransform:"uppercase" }}>Personalized Plan Ready</span>
          </div>

          <h1 style={{ margin:"0 0 6px", fontSize:"clamp(24px,5vw,36px)", fontWeight:"normal", color:"#fff", letterSpacing:"-0.5px", lineHeight:1.2 }}>
            Hello, <span style={{ color:"#4ade80" }}>{plan.customer.name}</span> 🌿
          </h1>
          <p style={{ margin:"0 0 24px", fontSize:15, color:"#86efac", fontFamily:"Arial,sans-serif" }}>
            Your {plan.customer.plan} is ready · {plan.customer.calories}
          </p>

          {/* Stats row */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
            {[
              { icon:"📏", label:"Height", val: plan.customer.height },
              { icon:"⚖️", label:"Weight", val: plan.customer.weight },
              { icon:"🎯", label:"Goal", val: plan.customer.goal },
              { icon:"🥗", label:"Diet", val: plan.customer.diet },
            ].map(s => (
              <div key={s.label} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(74,222,128,0.15)", borderRadius:12, padding:"10px 8px", textAlign:"center" }}>
                <div style={{ fontSize:18, marginBottom:3 }}>{s.icon}</div>
                <div style={{ fontSize:10, color:"#86efac", fontFamily:"Arial,sans-serif", letterSpacing:1, textTransform:"uppercase" }}>{s.label}</div>
                <div style={{ fontSize:12, fontWeight:"bold", color:"#d1fae5", fontFamily:"Arial,sans-serif", marginTop:2 }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Allergy alert */}
          {plan.customer.allergies && plan.customer.allergies !== "None" && (
            <div style={{ marginTop:14, background:"rgba(251,191,36,0.1)", border:"1px solid rgba(251,191,36,0.3)", borderRadius:10, padding:"8px 14px", display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:16 }}>⚠️</span>
              <span style={{ fontSize:12, color:"#fbbf24", fontFamily:"Arial,sans-serif" }}>
                <strong>Allergy:</strong> All meals avoid <strong>{plan.customer.allergies}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ maxWidth:680, margin:"0 auto", padding:"20px 16px 0" }}>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4 }}>
          {[
            { id:"plan", label:"📅 Meal Plan" },
            { id:"shopping", label:"🛒 Shopping" },
            { id:"tips", label:"💡 Tips" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding:"9px 20px", borderRadius:30, border:"1px solid",
              borderColor: activeTab===tab.id ? "#4ade80" : "rgba(74,222,128,0.2)",
              background: activeTab===tab.id ? "rgba(74,222,128,0.15)" : "transparent",
              color: activeTab===tab.id ? "#4ade80" : "#86efac",
              cursor:"pointer", fontFamily:"Arial,sans-serif", fontSize:13,
              fontWeight: activeTab===tab.id ? "bold" : "normal",
              whiteSpace:"nowrap", transition:"all 0.2s",
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"16px" }}>

        {/* ── MEAL PLAN TAB ── */}
        {activeTab === "plan" && (
          <>
            {/* Day selector */}
            <div style={{ display:"grid", gridTemplateColumns:`repeat(${Math.min(totalDays,7)},1fr)`, gap:6, marginBottom:20 }}>
              {plan.days.map(d => (
                <button key={d.day} onClick={() => setSelectedDay(d.day)} style={{
                  padding:"10px 4px", borderRadius:10, border:"1px solid",
                  borderColor: selectedDay===d.day ? "#4ade80" : "rgba(74,222,128,0.15)",
                  background: selectedDay===d.day ? "linear-gradient(135deg,#14532d,#166534)" : "rgba(255,255,255,0.03)",
                  color: selectedDay===d.day ? "#fff" : "#86efac",
                  cursor:"pointer", fontFamily:"Arial,sans-serif",
                  boxShadow: selectedDay===d.day ? "0 4px 14px rgba(74,222,128,0.25)" : "none",
                  transition:"all 0.2s",
                }}>
                  <div style={{ fontSize:9, opacity:0.7, letterSpacing:1 }}>DAY</div>
                  <div style={{ fontSize:15, fontWeight:"bold" }}>{d.day}</div>
                </button>
              ))}
            </div>

            {/* Day card */}
            {currentDay && (
              <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(74,222,128,0.15)", borderRadius:20, overflow:"hidden", marginBottom:16 }}>
                {/* Day header */}
                <div style={{ background:"linear-gradient(135deg,#14532d,#166534)", padding:"18px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontSize:11, color:"#86efac", letterSpacing:2, fontFamily:"Arial,sans-serif", textTransform:"uppercase" }}>Day {currentDay.day} of {totalDays}</div>
                    <div style={{ fontSize:20, color:"#fff", marginTop:2 }}>
                      {currentDay.day <= 7 ? "Week 1 — Foundation 🌱" : currentDay.day <= 14 ? "Week 2 — Momentum 🔥" : currentDay.day <= 21 ? "Week 3 — Progress 💪" : "Month 2+ — Results ⭐"}
                    </div>
                  </div>
                  <div style={{ textAlign:"center", background:"rgba(0,0,0,0.25)", borderRadius:12, padding:"10px 16px" }}>
                    <div style={{ fontSize:24, fontWeight:"bold", color:"#4ade80" }}>{currentDay.totalKcal}</div>
                    <div style={{ fontSize:10, color:"#86efac", fontFamily:"Arial,sans-serif" }}>kcal / day</div>
                  </div>
                </div>

                {/* Meals */}
                <div style={{ padding:"8px 16px 16px" }}>
                  {currentDay.meals.map((meal, i) => {
                    const color = mealColors[meal.time] || "#4ade80";
                    const isExpanded = expandedMeal === `${currentDay.day}-${i}`;
                    return (
                      <div key={i}
                        onClick={() => setExpandedMeal(isExpanded ? null : `${currentDay.day}-${i}`)}
                        style={{
                          padding:"14px 0", cursor:"pointer",
                          borderBottom: i < currentDay.meals.length-1 ? "1px solid rgba(74,222,128,0.08)" : "none",
                        }}>
                        <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                          <div style={{
                            width:38, height:38, borderRadius:"50%",
                            background:`${color}18`, border:`1.5px solid ${color}40`,
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:18, flexShrink:0,
                          }}>{meal.icon}</div>
                          <div style={{ flex:1 }}>
                            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                              <span style={{ fontSize:11, color:color, fontFamily:"Arial,sans-serif", fontWeight:"bold", letterSpacing:1, textTransform:"uppercase" }}>{meal.time}</span>
                              <span style={{ fontSize:12, color:"#86efac", fontFamily:"Arial,sans-serif", background:"rgba(74,222,128,0.1)", padding:"2px 8px", borderRadius:20 }}>{meal.kcal} kcal</span>
                            </div>
                            <div style={{ fontSize:14, color:"#d1fae5", lineHeight:1.6, marginTop:3, fontFamily:"Arial,sans-serif" }}>{meal.food}</div>
                            {/* Nutrition expand */}
                            {isExpanded && meal.protein && (
                              <div style={{ marginTop:10, display:"flex", gap:8 }}>
                                {[
                                  { label:"Protein", val:meal.protein, color:"#60a5fa" },
                                  { label:"Carbs", val:meal.carbs, color:"#f59e0b" },
                                  { label:"Fat", val:meal.fat, color:"#f472b6" },
                                ].map(n => (
                                  <div key={n.label} style={{ flex:1, background:"rgba(255,255,255,0.05)", borderRadius:8, padding:"6px 8px", textAlign:"center" }}>
                                    <div style={{ fontSize:13, fontWeight:"bold", color:n.color, fontFamily:"Arial,sans-serif" }}>{n.val}</div>
                                    <div style={{ fontSize:10, color:"#9ca3af", fontFamily:"Arial,sans-serif" }}>{n.label}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Prev / Next */}
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setSelectedDay(Math.max(1,selectedDay-1))} disabled={selectedDay===1} style={{
                flex:1, padding:"12px", borderRadius:12, border:"1px solid rgba(74,222,128,0.2)",
                background:"rgba(255,255,255,0.03)", color: selectedDay===1 ? "#374151" : "#86efac",
                cursor: selectedDay===1 ? "not-allowed" : "pointer", fontFamily:"Arial,sans-serif", fontSize:14,
              }}>← Previous</button>
              <button onClick={() => setSelectedDay(Math.min(totalDays,selectedDay+1))} disabled={selectedDay===totalDays} style={{
                flex:1, padding:"12px", borderRadius:12,
                border:"1px solid rgba(74,222,128,0.2)",
                background: selectedDay<totalDays ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.03)",
                color: selectedDay===totalDays ? "#374151" : "#4ade80",
                cursor: selectedDay===totalDays ? "not-allowed" : "pointer", fontFamily:"Arial,sans-serif", fontSize:14,
              }}>Next →</button>
            </div>
          </>
        )}

        {/* ── SHOPPING TAB ── */}
        {activeTab === "shopping" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ background:"rgba(74,222,128,0.07)", border:"1px solid rgba(74,222,128,0.2)", borderRadius:14, padding:"14px 18px" }}>
              <p style={{ margin:0, fontSize:13, color:"#86efac", fontFamily:"Arial,sans-serif", lineHeight:1.7 }}>
                🛒 <strong>Week 1 Shopping List</strong> — Stock up on these essentials. Buy fresh vegetables every 2–3 days for best nutrition.
              </p>
            </div>
            {plan.shopping.map((cat, i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(74,222,128,0.12)", borderRadius:14, overflow:"hidden" }}>
                <div style={{ background:"rgba(74,222,128,0.1)", padding:"10px 16px", borderBottom:"1px solid rgba(74,222,128,0.1)" }}>
                  <span style={{ fontSize:14, color:"#4ade80", fontFamily:"Arial,sans-serif", fontWeight:"bold" }}>{cat.category}</span>
                </div>
                <div style={{ padding:"10px 16px" }}>
                  {cat.items.map((item, j) => (
                    <div key={j} style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 0", borderBottom: j<cat.items.length-1 ? "1px solid rgba(74,222,128,0.06)" : "none" }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", flexShrink:0, display:"inline-block" }} />
                      <span style={{ fontSize:13, color:"#d1fae5", fontFamily:"Arial,sans-serif" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Foods to avoid */}
            <div style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:14, overflow:"hidden" }}>
              <div style={{ background:"rgba(239,68,68,0.12)", padding:"10px 16px", borderBottom:"1px solid rgba(239,68,68,0.15)" }}>
                <span style={{ fontSize:14, color:"#f87171", fontFamily:"Arial,sans-serif", fontWeight:"bold" }}>🚫 Foods to Avoid</span>
              </div>
              <div style={{ padding:"10px 16px" }}>
                {plan.avoid.map((item, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 0", borderBottom: i<plan.avoid.length-1 ? "1px solid rgba(239,68,68,0.08)" : "none" }}>
                    <span style={{ color:"#f87171", fontSize:14 }}>✗</span>
                    <span style={{ fontSize:13, color:"#fca5a5", fontFamily:"Arial,sans-serif" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TIPS TAB ── */}
        {activeTab === "tips" && (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ background:"rgba(74,222,128,0.07)", border:"1px solid rgba(74,222,128,0.2)", borderRadius:14, padding:"16px 18px", marginBottom:4 }}>
              <div style={{ fontSize:15, color:"#4ade80", fontFamily:"Arial,sans-serif", fontWeight:"bold", marginBottom:8 }}>📌 Your Daily Target</div>
              <p style={{ margin:0, fontSize:13, color:"#86efac", fontFamily:"Arial,sans-serif", lineHeight:1.8 }}>
                Based on your profile, your daily intake is set at <strong style={{ color:"#4ade80" }}>{plan.customer.calories}</strong>. At this pace, expect to lose <strong style={{ color:"#4ade80" }}>0.5–1 kg per week</strong> with consistent effort.
              </p>
            </div>

            {plan.tips.map((tip, i) => (
              <div key={i} style={{
                background:"rgba(255,255,255,0.03)", border:"1px solid rgba(74,222,128,0.12)",
                borderRadius:14, padding:"14px 18px", display:"flex", gap:14, alignItems:"center",
              }}>
                <div style={{ width:34, height:34, borderRadius:"50%", background:"rgba(74,222,128,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:"bold", color:"#4ade80", flexShrink:0, fontFamily:"Arial,sans-serif" }}>{i+1}</div>
                <span style={{ fontSize:14, color:"#d1fae5", fontFamily:"Arial,sans-serif", lineHeight:1.6 }}>{tip}</span>
              </div>
            ))}

            <p style={{ fontSize:11, color:"#374151", textAlign:"center", marginTop:8, lineHeight:1.7, fontFamily:"Arial,sans-serif" }}>
              ⚠️ This plan is for general guidance only. Please consult a registered dietitian or doctor before making significant dietary changes, especially if you have any health conditions.
            </p>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{ textAlign:"center", padding:"30px 20px", borderTop:"1px solid rgba(74,222,128,0.1)", marginTop:20 }}>
        <p style={{ margin:0, fontSize:12, color:"#374151", fontFamily:"Arial,sans-serif" }}>
          Questions? Contact us at <a href="mailto:support@yourbrand.com" style={{ color:"#4ade80" }}>support@yourbrand.com</a>
        </p>
      </div>
    </div>
  );
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0a1628,#0d2b1a,#0a1628)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:20 }}>
      <div style={{ width:60, height:60, borderRadius:"50%", border:"3px solid rgba(74,222,128,0.2)", borderTopColor:"#4ade80", animation:"spin 1s linear infinite" }} />
      <p style={{ color:"#86efac", fontFamily:"Arial,sans-serif", fontSize:15 }}>Loading your personalized plan...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── ERROR SCREEN ─────────────────────────────────────────────────────────────
function ErrorScreen({ message }) {
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0a1628,#0d2b1a,#0a1628)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, padding:20 }}>
      <div style={{ fontSize:48 }}>😕</div>
      <p style={{ color:"#f87171", fontFamily:"Arial,sans-serif", fontSize:16, textAlign:"center" }}>{message}</p>
      <p style={{ color:"#6b7280", fontFamily:"Arial,sans-serif", fontSize:13 }}>Please contact support if this persists.</p>
    </div>
  );
}
