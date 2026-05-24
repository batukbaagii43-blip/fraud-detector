import { useState, useRef } from "react";

const CASE_STUDIES = [
  {
    id: 1,
    title: "Хөрөнгө оруулалтын залилал",
    platform: "Facebook / Telegram",
    badge: "Хамгийн түгээмэл",
    badgeColor: "#ef4444",
    icon: "💰",
    description: "\"Өдөрт 50-100% ашиг\" амлаж, эхлээд жижиг дүн буцааж өгөөд том мөнгө авсан хойно алга болдог.",
    sampleChat: `Найз минь, би энэ платформоор өдөрт 80% ашиг гаргаж байна. 50,000₮ оруулбал 3 хоногт 150,000₮ болно. Гэрчилгээ үзүүлье!

Эхлээд 50,000₮ оруул, баталгаа болгож 3 хоногт буцааж өгнө. Манай бүлэгт нэгд!`,
    signals: ["Баталгаагүй ашгийн амлалт", "Яаравчлуулах", "Урьдчилгаа мөнгө шаардах", "Гэрчилгээ үзүүлэх"]
  },
  {
    id: 2,
    title: "Хайр дурлалын залилал (Romance Scam)",
    platform: "Facebook / Instagram",
    badge: "Нийтлэг",
    badgeColor: "#f97316",
    icon: "💔",
    description: "Гадаадад байгаа хүн мэт дүр эсгэж, найрсаг харилцаа тогтоосны дараа яаралтай мөнгө шаардах.",
    sampleChat: `Сайн байна уу? Танай зурагнууд маш үзэсгэлэнтэй байна. Би Солонгост ажилладаг инженер. Тантай найзалж болох уу?

(2 долоо хоногийн дараа...)

Миний ар гэрт гэнэтийн осол болж 500,000₮ яаралтай хэрэгтэй байна. Дараа нь заавал буцааж өгнө, та л найдах хүн минь...`,
    signals: ["Хурдан ойртох", "Гадаадаас мөнгө шаардах", "Яаралтай байдал үүсгэх", "Хэт их магтах"]
  },
  {
    id: 3,
    title: "Лотерей / Шагнал залилал",
    platform: "Facebook / SMS",
    badge: "Нийтлэг",
    badgeColor: "#f97316",
    icon: "🎰",
    description: "\"Та шагнал хожлоо\" гэж мэдэгдэж, шагналыг авахын тулд татвар эсвэл үйлчилгээний хөлс шаардах.",
    sampleChat: `CONGRATULATIONS! Та Монголын Хөгжлийн Сан-гийн жилийн эцсийн сугалаанд 5,000,000₮ хожлоо!

Шагналыг авахын тулд 50,000₮ татвар төлөх шаардлагатай. 24 цагийн дотор шилжүүлнэ үү. Холбоо барих: @manager_fund`,
    signals: ["Оролцоогүй тэмцээнд хожсон", "Урьдчилгаа төлбөр шаардах", "Цагийн дарамт", "Албан ёсны байгууллага мэт дүр эсгэх"]
  },
  {
    id: 4,
    title: "Банкны ажилтан дүр эсгэх",
    platform: "Утас / Telegram",
    badge: "Аюултай",
    badgeColor: "#dc2626",
    icon: "🏦",
    description: "Банкны ажилтан, цагдаа мэт дүр эсгэж, данс хамгаалах нэрийдлээр нууц мэдээлэл авах.",
    sampleChat: `Сайн байна уу? Би Хаан банкны аюулгүй байдлын алба. Таны данснаас сэжигтэй гүйлгээ илэрлээ.

Дансыг хамгаалахын тулд нэг удаагийн код болон картын CVV дугаарыг надад яаралтай илгээнэ үү. Үгүй бол данс блоклогдоно!`,
    signals: ["Нууц мэдээлэл шаардах", "Яаралтай байдал", "Банк хэзээ ч CVV асуудаггүй", "Дарамт шахалт"]
  },
  {
    id: 5,
    title: "Ажил олгох залилал",
    platform: "Facebook / Telegram",
    badge: "Өсч байна",
    badgeColor: "#8b5cf6",
    icon: "💼",
    description: "\"Гэрээсээ ажиллаж сарын 2-3 сая олно\" гэж амлаж, бүртгэлийн хөлс эсвэл сургалтын мөнгө шаардах.",
    sampleChat: `Онлайн ажил! Гэрээсээ ажиллаж сард 2,500,000₮ олох боломж. Туршлага шаардахгүй!

Бүртгэлийн хөлс 30,000₮ төлсний дараа ажлын хэрэгсэл илгээнэ. Байр суурь хязгаарлагдмал, яараарай!`,
    signals: ["Хэт сайн нөхцөл", "Бүртгэлийн хөлс шаардах", "Яаравчлуулах", "Тодорхойгүй ажлын агуулга"]
  },
  {
    id: 6,
    title: "Барааны урьдчилгаа залилал",
    platform: "Facebook Marketplace",
    badge: "Нийтлэг",
    badgeColor: "#f97316",
    icon: "📦",
    description: "Бараа зарж буй мэт зар оруулж, урьдчилгаа авсан хойно алга болох.",
    sampleChat: `iPhone 15 Pro Max зарна. Шинэ, битүүмжлэлтэй. Үнэ: 1,800,000₮ (зах зээлээс 600,000₮ хямд!)

Захиалгаа баталгаажуулахын тулд 50% урьдчилгаа шилжүүлнэ үү. Бараа маргааш хүргэнэ. Хаяг: @seller_official`,
    signals: ["Зах зээлийн үнээс хамаагүй хямд", "Урьдчилгаа шаардах", "Биечлэн уулзахаас зайлсхийх", "Яаравчлуулах"]
  }
];

const FRAUD_PATTERNS = [
  { pattern: /өдөрт \d+%|ашиг гаргаж|хөрөнгө оруул|платформ|крипто|bitcoin|usdt/i, type: "Хөрөнгө оруулалтын залилал", weight: 35 },
  { pattern: /урьдчилгаа|татвар төл|хөлс төл|бүртгэлийн мөнгө|баталгааны мөнгө/i, type: "Урьдчилгаа мөнгө залилал", weight: 40 },
  { pattern: /хожлоо|шагнал|сугалаа|congratulations|winner/i, type: "Лотерей залилал", weight: 45 },
  { pattern: /cvv|нууц код|нэг удаагийн код|пин код|нууц дугаар/i, type: "Мэдээлэл хулгайлах", weight: 50 },
  { pattern: /яаралтай|24 цаг|хязгаарлагдмал|яараарай|өнөөдөр л/i, type: "Яаравчлуулах тактик", weight: 25 },
  { pattern: /гэрээсээ ажилла|онлайн ажил|сард \d+ сая|туршлага шаардахгүй/i, type: "Ажлын залилал", weight: 35 },
  { pattern: /найзалж болох уу|ганцаардаж байна|хайртай болсон|гадаадад ажилла/i, type: "Романтик залилал", weight: 30 },
  { pattern: /банкны ажилтан|цагдаагийн|алба|блоклогдоно|данс хаагдана/i, type: "Дүр эсгэх залилал", weight: 45 },
  { pattern: /зах зээлээс хямд|онцгой үнэ|бараа илгээнэ|урьдчилгаа шилжүүл/i, type: "Барааны залилал", weight: 35 },
  { pattern: /бүлэгт нэгд|группт ор|манай каналд|линкээр ор/i, type: "Бүлгийн залилал", weight: 20 },
];

function analyzeText(text) {
  if (!text.trim()) return null;
  
  let totalWeight = 0;
  let detectedPatterns = [];
  let fraudTypes = new Set();

  FRAUD_PATTERNS.forEach(({ pattern, type, weight }) => {
    if (pattern.test(text)) {
      totalWeight += weight;
      detectedPatterns.push(type);
      fraudTypes.add(type);
    }
  });

  // Additional signals
  const hasUrgency = /яар|хурдан|одоо|24|48|цаг/i.test(text);
  const hasMoneyRequest = /мөнгө|төгрөг|₮|шилжүүл|төл/i.test(text);
  const hasPersonalInfo = /нууц|код|пин|cvv|нэвтрэх/i.test(text);
  const hasPressure = /үгүй бол|блок|хаана|алдана|боломж алдана/i.test(text);
  const hasExaggeration = /\d{2,}%|хязгааргүй|баталгаатай|100%/i.test(text);

  if (hasUrgency) totalWeight += 15;
  if (hasMoneyRequest) totalWeight += 10;
  if (hasPersonalInfo) totalWeight += 25;
  if (hasPressure) totalWeight += 20;
  if (hasExaggeration) totalWeight += 20;

  const riskScore = Math.min(100, totalWeight);
  
  let riskLevel, riskColor, riskEmoji, recommendation;
  if (riskScore >= 60) {
    riskLevel = "ӨНДӨР ЭРСДЭЛТЭЙ";
    riskColor = "#ef4444";
    riskEmoji = "🚨";
    recommendation = "Энэ мессеж залилалтай маш төстэй. Ямар ч мөнгө бүү илгээ! Цагдаагийн 102 дугаарт мэдэгд.";
  } else if (riskScore >= 35) {
    riskLevel = "ДУНД ЭРСДЭЛТЭЙ";
    riskColor = "#f97316";
    riskEmoji = "⚠️";
    recommendation = "Сэжигтэй шинжүүд илэрлээ. Мөнгө илгээхээс өмнө нарийн шалгаарай. Итгэлтэй хүнтэйгээ зөвлөл.";
  } else if (riskScore >= 15) {
    riskLevel = "БАГА ЭРСДЭЛТЭЙ";
    riskColor = "#eab308";
    riskEmoji = "⚡";
    recommendation = "Зарим сэжигтэй шинж байна. Болгоомжтой байж нэмэлт мэдээлэл авна уу.";
  } else {
    riskLevel = "ЭРСДЭЛ БАГА";
    riskColor = "#22c55e";
    riskEmoji = "✅";
    recommendation = "Тодорхой залилалтын шинж илрэлгүй байна. Гэсэн ч болгоомжтой байгаарай.";
  }

  const signals = [];
  if (hasUrgency) signals.push("⏰ Цагийн дарамт үүсгэж байна");
  if (hasMoneyRequest) signals.push("💸 Мөнгөний хүсэлт агуулж байна");
  if (hasPersonalInfo) signals.push("🔐 Нууц мэдээлэл шаардаж байна");
  if (hasPressure) signals.push("😰 Дарамт шахалт үүсгэж байна");
  if (hasExaggeration) signals.push("📈 Хэтрүүлсэн амлалт байна");
  detectedPatterns.forEach(p => signals.push(`🎯 ${p} шинж илэрлээ`));

  return { riskScore, riskLevel, riskColor, riskEmoji, recommendation, signals, fraudTypes: [...fraudTypes] };
}

export default function FraudDetector() {
  const [activeTab, setActiveTab] = useState("analyze");
  const [inputText, setInputText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target.result);
      setImageBase64(ev.target.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!inputText.trim() && !imageBase64) return;
    setIsLoading(true);
    setAnalysis(null);

    try {
      // Text-based local analysis first
      const localResult = inputText ? analyzeText(inputText) : null;

      // Build AI prompt
      const contentParts = [];
      if (imageBase64) {
        contentParts.push({
          type: "image",
          source: { type: "base64", media_type: "image/jpeg", data: imageBase64 }
        });
      }

      const promptText = `Та Монгол улсын залилах гэмт хэргийг илрүүлэх мэргэжилтэн. Дараах ${imageBase64 ? "зураг/скриншот болон " : ""}мессежийг шинжилж монгол хэлээр хариулна уу.

${inputText ? `Мессеж:\n${inputText}` : ""}

Дараах форматаар JSON хариулна уу (зөвхөн JSON, өөр текст байхгүй):
{
  "riskScore": 0-100 тоо,
  "riskLevel": "ӨНДӨР ЭРСДЭЛТЭЙ" эсвэл "ДУНД ЭРСДЭЛТЭЙ" эсвэл "БАГА ЭРСДЭЛТЭЙ" эсвэл "ЭРСДЭЛ БАГА",
  "fraudType": "залилалтын төрөл нэр",
  "signals": ["илэрсэн шинж 1", "илэрсэн шинж 2", ...],
  "recommendation": "иргэнд зориулсан зөвлөгөө",
  "officerNote": "цагдаагийн ажилтанд техникийн тэмдэглэл",
  "summary": "2-3 өгүүлбэрт товч дүгнэлт"
}`;

      contentParts.push({ type: "text", text: promptText });

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: contentParts }]
        })
      });

      const data = await response.json();
      const rawText = data.content.map(i => i.text || "").join("");
      const clean = rawText.replace(/```json|```/g, "").trim();
      
      try {
        const aiResult = JSON.parse(clean);
        // Merge with local analysis
        const finalSignals = [...new Set([
          ...(localResult?.signals || []),
          ...(aiResult.signals || [])
        ])];
        setAnalysis({
          ...aiResult,
          signals: finalSignals,
          riskScore: Math.max(localResult?.riskScore || 0, aiResult.riskScore || 0),
          riskColor: aiResult.riskScore >= 60 ? "#ef4444" : aiResult.riskScore >= 35 ? "#f97316" : aiResult.riskScore >= 15 ? "#eab308" : "#22c55e",
          riskEmoji: aiResult.riskScore >= 60 ? "🚨" : aiResult.riskScore >= 35 ? "⚠️" : aiResult.riskScore >= 15 ? "⚡" : "✅",
        });
      } catch {
        // Fallback to local analysis
        if (localResult) setAnalysis({ ...localResult, summary: localResult.recommendation, officerNote: "Локал шинжилгээ ашигласан." });
      }
    } catch (err) {
      if (inputText) {
        const localResult = analyzeText(inputText);
        if (localResult) setAnalysis({ ...localResult, summary: localResult.recommendation, officerNote: "Офлайн горимд шинжилсэн." });
      }
    }
    setIsLoading(false);
  };

  const getRiskBg = (score) => {
    if (score >= 60) return "rgba(239,68,68,0.1)";
    if (score >= 35) return "rgba(249,115,22,0.1)";
    if (score >= 15) return "rgba(234,179,8,0.1)";
    return "rgba(34,197,94,0.1)";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0e1a",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e2e8f0"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        borderBottom: "1px solid #1e3a5f",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40,
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, boxShadow: "0 0 20px rgba(59,130,246,0.4)"
            }}>🛡️</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: "0.5px", color: "#f1f5f9" }}>
                ЗАЛИЛАЛ ИЛРҮҮЛЭГЧ
              </div>
              <div style={{ fontSize: 10, color: "#3b82f6", letterSpacing: "2px", fontWeight: 600 }}>
                FRAUD DETECTION SYSTEM • МУ ЦАГДАА
              </div>
            </div>
          </div>
          <div style={{
            background: "rgba(34,197,94,0.15)",
            border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: 20,
            padding: "4px 12px",
            fontSize: 11,
            color: "#4ade80",
            fontWeight: 600,
            display: "flex", alignItems: "center", gap: 6
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
            ИДЭВХТЭЙ
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 0" }}>
        <div style={{ display: "flex", gap: 4, background: "#0f172a", borderRadius: 12, padding: 4, marginBottom: 24, border: "1px solid #1e293b" }}>
          {[
            { id: "analyze", label: "🔍 Шинжилгээ", desc: "Мессеж/Зураг шалгах" },
            { id: "cases", label: "📚 Жишээ Кейс", desc: "Залилалтын төрлүүд" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: "10px 16px", borderRadius: 9, border: "none", cursor: "pointer",
              background: activeTab === tab.id ? "linear-gradient(135deg, #1d4ed8, #2563eb)" : "transparent",
              color: activeTab === tab.id ? "#fff" : "#64748b",
              fontWeight: 600, fontSize: 13, transition: "all 0.2s",
              boxShadow: activeTab === tab.id ? "0 4px 12px rgba(37,99,235,0.3)" : "none"
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ANALYZE TAB */}
        {activeTab === "analyze" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {/* Text Input */}
              <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ background: "#1e3a5f", padding: "2px 10px", borderRadius: 20, color: "#60a5fa" }}>💬 ЧАТЫН ТЕКСТ</span>
                </div>
                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Telegram эсвэл Facebook-с ирсэн сэжигтэй мессежийг энд буулгана уу..."
                  style={{
                    width: "100%", minHeight: 180, background: "#020817",
                    border: "1px solid #1e293b", borderRadius: 10, padding: 14,
                    color: "#e2e8f0", fontSize: 13, resize: "vertical",
                    outline: "none", boxSizing: "border-box", lineHeight: 1.6,
                    fontFamily: "inherit"
                  }}
                />
              </div>

              {/* Image Upload */}
              <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 12 }}>
                  <span style={{ background: "#1e3a5f", padding: "2px 10px", borderRadius: 20, color: "#60a5fa" }}>🖼️ СКРИНШОТ/ЗУРАГ</span>
                </div>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    minHeight: 180, border: `2px dashed ${uploadedImage ? "#3b82f6" : "#1e293b"}`,
                    borderRadius: 10, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", cursor: "pointer",
                    background: uploadedImage ? "rgba(59,130,246,0.05)" : "#020817",
                    transition: "all 0.2s", overflow: "hidden", position: "relative"
                  }}
                >
                  {uploadedImage ? (
                    <>
                      <img src={uploadedImage} alt="uploaded" style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: 180 }} />
                      <div style={{
                        position: "absolute", top: 8, right: 8,
                        background: "#1d4ed8", borderRadius: 20, padding: "2px 8px",
                        fontSize: 10, color: "#fff", fontWeight: 700
                      }}>✓ БАЙРШУУЛСАН</div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
                      <div style={{ color: "#475569", fontSize: 12, textAlign: "center" }}>
                        Скриншот оруулахын тулд дарна уу<br />
                        <span style={{ color: "#3b82f6", fontSize: 11 }}>JPG, PNG, WEBP</span>
                      </div>
                    </>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                {uploadedImage && (
                  <button onClick={() => { setUploadedImage(null); setImageBase64(null); }} style={{
                    marginTop: 8, width: "100%", padding: "6px", background: "transparent",
                    border: "1px solid #374151", borderRadius: 8, color: "#ef4444",
                    cursor: "pointer", fontSize: 11
                  }}>× Зураг арилгах</button>
                )}
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={isLoading || (!inputText.trim() && !imageBase64)}
              style={{
                width: "100%", padding: "16px",
                background: isLoading || (!inputText.trim() && !imageBase64)
                  ? "#1e293b"
                  : "linear-gradient(135deg, #1d4ed8, #2563eb)",
                border: "none", borderRadius: 12, color: "#fff",
                fontWeight: 700, fontSize: 15, cursor: isLoading || (!inputText.trim() && !imageBase64) ? "not-allowed" : "pointer",
                transition: "all 0.3s", letterSpacing: "0.5px",
                boxShadow: (!isLoading && (inputText.trim() || imageBase64)) ? "0 8px 24px rgba(37,99,235,0.4)" : "none",
                marginBottom: 24
              }}
            >
              {isLoading ? "⏳ AI шинжилж байна..." : "🔍 ЗАЛИЛАЛ ШИНЖИЛГЭЭ ХИЙХ"}
            </button>

            {/* Analysis Result */}
            {analysis && (
              <div style={{
                background: "#0f172a",
                border: `1px solid ${analysis.riskColor}40`,
                borderRadius: 20, overflow: "hidden",
                boxShadow: `0 0 40px ${analysis.riskColor}20`,
                marginBottom: 24
              }}>
                {/* Risk Header */}
                <div style={{
                  background: getRiskBg(analysis.riskScore),
                  borderBottom: `1px solid ${analysis.riskColor}30`,
                  padding: "20px 24px",
                  display: "flex", alignItems: "center", justifyContent: "space-between"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ fontSize: 40 }}>{analysis.riskEmoji}</div>
                    <div>
                      <div style={{ color: analysis.riskColor, fontWeight: 800, fontSize: 20, letterSpacing: "1px" }}>
                        {analysis.riskLevel}
                      </div>
                      {analysis.fraudType && (
                        <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 2 }}>
                          Төрөл: <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{analysis.fraudType}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Risk Gauge */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: analysis.riskColor }}>
                      {analysis.riskScore}<span style={{ fontSize: 14 }}>%</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#64748b", letterSpacing: "1px" }}>ЭРСДЭЛИЙН ТҮВШИН</div>
                    <div style={{
                      width: 80, height: 6, background: "#1e293b", borderRadius: 3, marginTop: 6, overflow: "hidden"
                    }}>
                      <div style={{
                        width: `${analysis.riskScore}%`, height: "100%",
                        background: analysis.riskColor, borderRadius: 3,
                        transition: "width 1s ease"
                      }} />
                    </div>
                  </div>
                </div>

                <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  {/* Summary */}
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "2px", marginBottom: 12 }}>
                      📋 ДҮГНЭЛТ
                    </div>
                    <div style={{
                      background: "#020817", borderRadius: 12, padding: 16,
                      fontSize: 13, lineHeight: 1.7, color: "#cbd5e1",
                      border: "1px solid #1e293b"
                    }}>
                      {analysis.summary || analysis.recommendation}
                    </div>
                  </div>

                  {/* Signals */}
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "2px", marginBottom: 12 }}>
                      🎯 ИЛЭРСЭН ШИНЖҮҮД
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 160, overflowY: "auto" }}>
                      {(analysis.signals || []).slice(0, 8).map((s, i) => (
                        <div key={i} style={{
                          background: "#020817", border: "1px solid #1e293b",
                          borderRadius: 8, padding: "6px 12px",
                          fontSize: 12, color: "#94a3b8"
                        }}>{s}</div>
                      ))}
                      {!analysis.signals?.length && (
                        <div style={{ color: "#22c55e", fontSize: 13, padding: "8px 12px" }}>
                          ✅ Тодорхой сэжигтэй шинж илрэлгүй
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "2px", marginBottom: 12 }}>
                      👤 ИРГЭНД ЗӨВЛӨГӨӨ
                    </div>
                    <div style={{
                      background: `${analysis.riskColor}10`,
                      border: `1px solid ${analysis.riskColor}30`,
                      borderRadius: 12, padding: 16,
                      fontSize: 13, color: "#e2e8f0", lineHeight: 1.7
                    }}>
                      {analysis.recommendation}
                    </div>
                  </div>

                  {analysis.officerNote && (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "2px", marginBottom: 12 }}>
                        🚔 ЦАГДААГИЙН АЖИЛТАНД ТЭМДЭГЛЭЛ
                      </div>
                      <div style={{
                        background: "rgba(59,130,246,0.08)",
                        border: "1px solid rgba(59,130,246,0.2)",
                        borderRadius: 12, padding: 16,
                        fontSize: 12, color: "#93c5fd", lineHeight: 1.7,
                        fontFamily: "monospace"
                      }}>
                        {analysis.officerNote}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div style={{
                  borderTop: "1px solid #1e293b", padding: "16px 24px",
                  display: "flex", gap: 10
                }}>
                  <button style={{
                    flex: 1, padding: "10px", background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10,
                    color: "#ef4444", fontWeight: 600, fontSize: 12, cursor: "pointer"
                  }}>📞 102 - Цагдаа мэдэгдэх</button>
                  <button style={{
                    flex: 1, padding: "10px", background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.3)", borderRadius: 10,
                    color: "#60a5fa", fontWeight: 600, fontSize: 12, cursor: "pointer"
                  }}>💾 Тайлан хадгалах</button>
                  <button onClick={() => { setAnalysis(null); setInputText(""); setUploadedImage(null); setImageBase64(null); }} style={{
                    flex: 1, padding: "10px", background: "rgba(100,116,139,0.1)",
                    border: "1px solid rgba(100,116,139,0.2)", borderRadius: 10,
                    color: "#94a3b8", fontWeight: 600, fontSize: 12, cursor: "pointer"
                  }}>🔄 Дахин шинжлэх</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CASES TAB */}
        {activeTab === "cases" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>
                Монголд хамгийн их тохиолддог залилалтын <strong style={{ color: "#3b82f6" }}>{CASE_STUDIES.length} төрөл</strong>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {CASE_STUDIES.map(c => (
                  <div key={c.id} onClick={() => setSelectedCase(selectedCase?.id === c.id ? null : c)}
                    style={{
                      background: selectedCase?.id === c.id ? "#0f172a" : "#0a0e1a",
                      border: `1px solid ${selectedCase?.id === c.id ? c.badgeColor + "60" : "#1e293b"}`,
                      borderRadius: 14, padding: 16, cursor: "pointer",
                      transition: "all 0.2s",
                      boxShadow: selectedCase?.id === c.id ? `0 0 20px ${c.badgeColor}20` : "none"
                    }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{ fontSize: 28 }}>{c.icon}</div>
                      <span style={{
                        background: c.badgeColor + "20", border: `1px solid ${c.badgeColor}40`,
                        color: c.badgeColor, borderRadius: 20, padding: "2px 8px",
                        fontSize: 9, fontWeight: 700, letterSpacing: "0.5px"
                      }}>{c.badge}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#f1f5f9", marginBottom: 4 }}>{c.title}</div>
                    <div style={{ fontSize: 10, color: "#3b82f6", marginBottom: 8 }}>{c.platform}</div>
                    <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>{c.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {selectedCase && (
              <div style={{
                background: "#0f172a",
                border: `1px solid ${selectedCase.badgeColor}30`,
                borderRadius: 20, overflow: "hidden",
                boxShadow: `0 0 30px ${selectedCase.badgeColor}15`,
                marginBottom: 24
              }}>
                <div style={{
                  background: `${selectedCase.badgeColor}10`,
                  borderBottom: `1px solid ${selectedCase.badgeColor}20`,
                  padding: "16px 24px",
                  display: "flex", alignItems: "center", gap: 12
                }}>
                  <span style={{ fontSize: 28 }}>{selectedCase.icon}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "#f1f5f9" }}>{selectedCase.title}</div>
                    <div style={{ fontSize: 12, color: selectedCase.badgeColor }}>{selectedCase.platform}</div>
                  </div>
                </div>
                <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "2px", marginBottom: 10 }}>
                      💬 ЖИШЭЭ ЧАТ
                    </div>
                    <div style={{
                      background: "#020817", borderRadius: 12, padding: 16,
                      fontSize: 12, lineHeight: 1.8, color: "#94a3b8",
                      border: "1px solid #1e293b", whiteSpace: "pre-line",
                      fontStyle: "italic"
                    }}>
                      "{selectedCase.sampleChat}"
                    </div>
                    <button
                      onClick={() => { setInputText(selectedCase.sampleChat); setActiveTab("analyze"); }}
                      style={{
                        marginTop: 10, width: "100%", padding: "8px",
                        background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
                        borderRadius: 8, color: "#60a5fa", cursor: "pointer", fontSize: 12, fontWeight: 600
                      }}>
                      🔍 Энэ жишээг шинжилгээнд ашиглах
                    </button>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "2px", marginBottom: 10 }}>
                      🎯 АНХААРАХ ШИНЖҮҮД
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {selectedCase.signals.map((s, i) => (
                        <div key={i} style={{
                          background: "#020817", border: `1px solid ${selectedCase.badgeColor}20`,
                          borderRadius: 8, padding: "8px 14px",
                          fontSize: 12, color: "#e2e8f0",
                          display: "flex", alignItems: "center", gap: 8
                        }}>
                          <span style={{ color: selectedCase.badgeColor }}>▸</span> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        maxWidth: 900, margin: "0 auto", padding: "16px 24px 32px",
        borderTop: "1px solid #1e293b", marginTop: 8,
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ fontSize: 11, color: "#334155" }}>
          Монгол Улсын Цагдаагийн Ерөнхий Газар • Гэмт хэргийн мэдэгдэл: <strong style={{ color: "#3b82f6" }}>102</strong>
        </div>
        <div style={{ fontSize: 11, color: "#334155" }}>
          AI-д суурилсан шинжилгээ • Anthropic Claude
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0e1a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
        textarea:focus { border-color: #3b82f6 !important; }
      `}</style>
    </div>
  );
}
