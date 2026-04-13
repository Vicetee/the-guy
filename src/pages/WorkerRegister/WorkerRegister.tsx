import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerWorker } from "../../firebase/worker";
import "./WorkerRegister.css";

const TRADES = [
  "Plumber", "Electrician", "Carpenter", "Painter", "Welder",
  "Mason / Bricklayer", "Tiler", "AC Technician", "Generator Technician", "Designer",
  "Roofer", "Cleaner", "Fumigator", "Security Guard", "Driver", "Developer", "Other",
];

const CITIES = [
  "Lekki", "Ikeja", "Victoria Island", "Surulere", "Yaba", "Ikorodu","Mushin","Ibeju-Lekki",
  "Ajah", "Badagry", "Epe", "Oshodi", "Agege", "Festac", "Alimosho", "Apapa", "Somolu", "Badagry",
  "Maryland", "Gbagada", "Ojodu","Eti-Osa", "Bariga", "Isolo", "Egbeda", "Other",
];

interface FormState {
  name: string;
  trade: string;
  customTrade: string;
  location: string;
  customLocation: string;
  gender: "male" | "female";
  phone: string;
  whatsapp: string;
  bio: string;
  yearsExp: string;
  photo: File | null;
  sameAsPhone: boolean;
}

export default function WorkerRegister() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    trade: "",
    customTrade: "",
    location: "",
    customLocation: "",
    gender: "male",
    phone: "",
    whatsapp: "",
    bio: "",
    yearsExp: "",
    photo: null,
    sameAsPhone: false,
  });
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const set = (key: keyof FormState, value: string | boolean | File | null) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    set("photo", file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.trade) errs.trade = "Please select your trade";
    if (form.trade === "Other" && !form.customTrade.trim()) errs.customTrade = "Please specify your trade";
    if (!form.location) errs.location = "Please select your location";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.sameAsPhone && !form.whatsapp.trim()) errs.whatsapp = "WhatsApp number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await registerWorker({
        name: form.name,
        trade: form.trade === "Other" ? form.customTrade : form.trade,
        location: form.location === "Other" ? form.customLocation : form.location,
        gender: form.gender,
        phone: form.phone,
        whatsapp: form.sameAsPhone ? form.phone : form.whatsapp,
        bio: form.bio,
        yearsExp: Number(form.yearsExp) || 0,
        photo: form.photo ?? undefined,
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="reg">
        <div className="reg__bg" />
        <div className="reg__success">
          <div className="reg__success-icon">✓</div>
          <h2>You're registered!</h2>
          <p>Welcome to The Guy network. Clients in your area will now be able to find and contact you.</p>
          <button onClick={() => navigate("/")}>Back to home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="reg">
      <div className="reg__bg" />

      <div className="reg__inner">
        <button className="reg__back" onClick={() => navigate("/")}>
          ← Back
        </button>

        <div className="reg__header">
          <h1>Register as a Worker</h1>
          <p>Join The Guy network and start getting hired today.</p>
        </div>

        <form className="reg__form" onSubmit={handleSubmit}>
          {/* Photo */}
          <div className="reg__photo-row">
            <div
              className="reg__photo"
              onClick={() => fileRef.current?.click()}
              style={preview ? { backgroundImage: `url(${preview})` } : {}}
            >
              {!preview && (
                <>
                  <svg viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="13" r="6" stroke="currentColor" strokeWidth="2" />
                    <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>Add photo</span>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} hidden />
            <div className="reg__photo-info">
              <p>Profile photo</p>
              <span>Optional — helps clients trust you</span>
            </div>
          </div>

          <div className="reg__section-title">Personal details</div>

          <div className="reg__row">
            <div className="reg__field">
              <label>Full name *</label>
              <input
                type="text"
                placeholder="e.g., Emeka Okafor"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={errors.name ? "err" : ""}
              />
              {errors.name && <span className="reg__err">{errors.name}</span>}
            </div>

            <div className="reg__field">
              <label>Gender *</label>
              <div className="reg__toggle">
                <button type="button" className={form.gender === "male" ? "active" : ""} onClick={() => set("gender", "male")}>Male</button>
                <button type="button" className={form.gender === "female" ? "active" : ""} onClick={() => set("gender", "female")}>Female</button>
              </div>
            </div>
          </div>

          <div className="reg__section-title">Work details</div>

          <div className="reg__row">
            <div className="reg__field">
              <label>Trade / Skill *</label>
              <select
                value={form.trade}
                onChange={(e) => set("trade", e.target.value)}
                className={errors.trade ? "err" : ""}
              >
                <option value="">Select your trade...</option>
                {TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.trade && <span className="reg__err">{errors.trade}</span>}
            </div>

            <div className="reg__field">
              <label>Years of experience</label>
              <input
                type="number"
                min="0"
                max="50"
                placeholder="e.g., 5"
                value={form.yearsExp}
                onChange={(e) => set("yearsExp", e.target.value)}
              />
            </div>
          </div>

          {form.trade === "Other" && (
            <div className="reg__field">
              <label>Specify trade *</label>
              <input
                type="text"
                placeholder="What type of work do you do?"
                value={form.customTrade}
                onChange={(e) => set("customTrade", e.target.value)}
                className={errors.customTrade ? "err" : ""}
              />
              {errors.customTrade && <span className="reg__err">{errors.customTrade}</span>}
            </div>
          )}

          <div className="reg__field">
            <label>Location / Area *</label>
            <select
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className={errors.location ? "err" : ""}
            >
              <option value="">Select your area...</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.location && <span className="reg__err">{errors.location}</span>}
          </div>

          {form.location === "Other" && (
            <div className="reg__field">
              <label>Specify location *</label>
              <input
                type="text"
                placeholder="Which area are you based in?"
                value={form.customLocation}
                onChange={(e) => set("customLocation", e.target.value)}
              />
            </div>
          )}

          <div className="reg__field reg__field--full">
            <label>Short bio</label>
            <textarea
              placeholder="Tell clients about yourself — your skills, availability, and what makes you reliable..."
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
              rows={3}
            />
          </div>

          <div className="reg__section-title">Contact details</div>

          <div className="reg__row">
            <div className="reg__field">
              <label>Phone number *</label>
              <input
                type="tel"
                placeholder="+234 801 234 5678"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={errors.phone ? "err" : ""}
              />
              {errors.phone && <span className="reg__err">{errors.phone}</span>}
            </div>

            <div className="reg__field">
              <label>WhatsApp number *</label>
              <input
                type="tel"
                placeholder="+234 801 234 5678"
                value={form.sameAsPhone ? form.phone : form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                disabled={form.sameAsPhone}
                className={errors.whatsapp ? "err" : ""}
              />
              {errors.whatsapp && <span className="reg__err">{errors.whatsapp}</span>}
              <label className="reg__checkbox">
                <input
                  type="checkbox"
                  checked={form.sameAsPhone}
                  onChange={(e) => set("sameAsPhone", e.target.checked)}
                />
                Same as phone
              </label>
            </div>
          </div>

          <button type="submit" className={`reg__submit${loading ? " loading" : ""}`} disabled={loading}>
            {loading ? <span className="reg__spinner" /> : "Register now →"}
          </button>
        </form>

        <p className="reg__footer">Est 2026 by The Guy Inc.</p>
      </div>
    </div>
  );
}