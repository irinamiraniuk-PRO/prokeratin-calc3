import { useState, useMemo, useRef, useEffect } from "react";
import LaunchTracker from "./LaunchTracker";

// ─── Каталог: закупочная цена = цена ПРЕДСТАВИТЕЛЯ (Happy Hair) ───────────────
// n=название, r=наша розница BYN (null=вводить руками), p=закупка ₽ ПРЕДСТАВИТЕЛЬ, b=бренд
const RAW = [{"n":"Кератин HH Nutrimax 500 мл","r":264.0,"p":2750.0,"b":"Happy Hair"},{"n":"Кератин HH Nutrimax Lumine 500 мл","r":264.0,"p":2750.0,"b":"Happy Hair"},{"n":"Керати HH Fiji 150 мл","r":82.0,"p":750.0,"b":"Happy Hair"},{"n":"Кератин HH Fiji 500 мл","r":264.0,"p":2750.0,"b":"Happy Hair"},{"n":"Кератин HH BB Plastia 150 мл","r":96.0,"p":1000.0,"b":"Happy Hair"},{"n":"Кератин HH Macadamia Gloss 150 мл","r":82.0,"p":900.0,"b":"Happy Hair"},{"n":"Кератин HH Macadamia Gloss 500 мл","r":288.0,"p":3000.0,"b":"Happy Hair"},{"n":"Кератин HH Smart Definitiv 150 мл","r":82.0,"p":900.0,"b":"Happy Hair"},{"n":"Кератин HH Smart Definitiv 500 мл","r":288.0,"p":2650.0,"b":"Happy Hair"},{"n":"Кератин HH Mix Shine Protein 150 мл","r":96.0,"p":1000.0,"b":"Happy Hair"},{"n":"Кератин HH Mix Shine Protein 500  мл","r":288.0,"p":3000.0,"b":"Happy Hair"},{"n":"Финализатор HH Oleo M Finish/Leave-in 150 мл   АКЦИЯ","r":null,"p":300.0,"b":"Happy Hair"},{"n":"Кератин HH Oleo M Intensive 150 мл","r":96.0,"p":1000.0,"b":"Happy Hair"},{"n":"Кератин HH Oleo M Intensive  500 мл","r":288.0,"p":2750.0,"b":"Happy Hair"},{"n":"Кератин HH Coffee Smash Reconstructor 150 мл","r":96.0,"p":1000.0,"b":"Happy Hair"},{"n":"Маска завершающая HH Coffee Smash 150 мл.  АКЦИЯ","r":null,"p":250.0,"b":"Happy Hair"},{"n":"Шампунь глубокой очистки HH Coffee Smash Shampoo 500 мл АКЦИЯ","r":null,"p":400.0,"b":"Happy Hair"},{"n":"Кератин HH Coffee Smash Reconstructor 500 мл","r":288.0,"p":2750.0,"b":"Happy Hair"},{"n":"Кератин HH Collagen 300 мл","r":180.0,"p":1800.0,"b":"Happy Hair"},{"n":"Кератин HH Collagen 500 гр","r":264.0,"p":2750.0,"b":"Happy Hair"},{"n":"Ботокс HH Totem 500 мл.","r":264.0,"p":2500.0,"b":"Happy Hair"},{"n":"Ботокс HH Collagen Pump UP 300 мл.","r":120.0,"p":1200.0,"b":"Happy Hair"},{"n":"Ботокс HH Collagen Pump Up 500 мл.","r":154.0,"p":1550.0,"b":"Happy Hair"},{"n":"Ботокс HH B-Shine Restorer Blue 150 мл","r":96.0,"p":1000.0,"b":"Happy Hair"},{"n":"Ботокс HH B-Shine Restorer Blue 500 мл","r":288.0,"p":2750.0,"b":"Happy Hair"},{"n":"Ботокс HH B-Shine Restorer White 150 мл","r":96.0,"p":1000.0,"b":"Happy Hair"},{"n":"Ботокс HH B-Shine Restorer White 500 мл","r":288.0,"p":2750.0,"b":"Happy Hair"},{"n":"Ботокс HH SPA ANTI - AGEING 500 гр АКЦИЯ","r":154.0,"p":1600.0,"b":"Happy Hair"},{"n":"Активная сыворотка Happy Hair Bloom Step 2 500 мл АКЦИЯ","r":null,"p":600.0,"b":"Happy Hair"},{"n":"Ботокс-флюид Happy Hair Bloom Step 3 300 мл АКЦИЯ","r":null,"p":600.0,"b":"Happy Hair"},{"n":"Восстанавливающий крем Happy Hair Bloom Step 4 460 гр АКЦИЯ","r":null,"p":600.0,"b":"Happy Hair"},{"n":"Комплект HH Bloom 500/300/460 мл. АКЦИЯ","r":null,"p":800.0,"b":"Happy Hair"},{"n":"Ботокс Hyaluronic BTX 300 мл.","r":null,"p":1150.0,"b":"Happy Hair"},{"n":"Ботокс Hyaluronic BTX 500 мл.","r":null,"p":1500.0,"b":"Happy Hair"},{"n":"Ботокс HH SOS Botox 150 мл.","r":72.0,"p":750.0,"b":"Happy Hair"},{"n":"Ботокс HH SOS Botox 500 мл АКЦИЯ","r":264.0,"p":2000.0,"b":"Happy Hair"},{"n":"Ботокс HH SOS Botox Light 500 мл","r":264.0,"p":2750.0,"b":"Happy Hair"},{"n":"Холодное восстановление HH SOS Treatment 220 мл","r":115.0,"p":1200.0,"b":"Happy Hair"},{"n":"Нанопластика HH Blinda Coiffer 500 мл АКЦИЯ","r":264.0,"p":2300.0,"b":"Happy Hair"},{"n":"Пилинг для кожи головы HH Scalp Peeling 250 мл","r":null,"p":600.0,"b":"Happy Hair"},{"n":"Шампунь глубокой очистки НН №1 500 мл. АКЦИЯ","r":null,"p":350.0,"b":"Happy Hair"},{"n":"Шампунь глубокой очистки HH DTX 500 мл. АКЦИЯ","r":null,"p":350.0,"b":"Happy Hair"},{"n":"Шампунь HH Detox Home Line 250 мл","r":null,"p":330.0,"b":"Happy Hair"},{"n":"Маска HH Detox Home Line 250 мл","r":null,"p":330.0,"b":"Happy Hair"},{"n":"Шампунь HH Acai Home Line 250 мл","r":null,"p":330.0,"b":"Happy Hair"},{"n":"Маска HH Acai Home Line 250 мл","r":null,"p":330.0,"b":"Happy Hair"},{"n":"Шампунь HH Collagen Biotin Home Line 250 мл","r":null,"p":330.0,"b":"Happy Hair"},{"n":"Маска HH Collagen Biotin Home Line 250 мл","r":null,"p":330.0,"b":"Happy Hair"},{"n":"Шампунь HH Be Shine Home Line 250 мл","r":null,"p":330.0,"b":"Happy Hair"},{"n":"Маска HH Be Shine Home Line 250 мл","r":null,"p":330.0,"b":"Happy Hair"},{"n":"Шампунь HH SOS Home Line 250 мл","r":null,"p":330.0,"b":"Happy Hair"},{"n":"Маска HH SOS Home Line 250мл","r":null,"p":330.0,"b":"Happy Hair"},{"n":"Масло HH Keratin Line 50 мл.","r":null,"p":350.0,"b":"Happy Hair"},{"n":"Масло HH KST 50 мл.","r":null,"p":350.0,"b":"Happy Hair"},{"n":"Масло HH Macadamia Oil 50 мл","r":null,"p":350.0,"b":"Happy Hair"},{"n":"Кератин BB Gloss ULTRA 500 мл","r":216.0,"p":2000.0,"b":"Happy Hair"},{"n":"Маска завершающая BB Gloss ULTRA 500 мл","r":216.0,"p":750.0,"b":"Happy Hair"},{"n":"Кератин комплект BB Gloss ULTRA 500/500/500 мл","r":216.0,"p":2850.0,"b":"Happy Hair"},{"n":"Шампунь глубокой очистки BB Gloss ACAI BOOM 500 мл","r":216.0,"p":500.0,"b":"Happy Hair"},{"n":"Кератин BB Gloss ACAI BOOM 500 мл","r":216.0,"p":2000.0,"b":"Happy Hair"},{"n":"Маска завершающая BB Gloss ACAI BOOM 500 мл","r":216.0,"p":650.0,"b":"Happy Hair"},{"n":"Кератин комплект BB Gloss ACAI BOOM 500/500/500 мл","r":216.0,"p":2850.0,"b":"Happy Hair"},{"n":"Ботокс BB Gloss Blowout BTX 500 мл АКЦИЯ","r":192.0,"p":1900.0,"b":"Happy Hair"},{"n":"Кератин BB Gloss Coffee 500 мл","r":216.0,"p":2000.0,"b":"Happy Hair"},{"n":"Маска завершающая BB Gloss Coffee 500 мл","r":216.0,"p":750.0,"b":"Happy Hair"},{"n":"Кератин комплект BB Gloss Coffee 500/500/500 мл","r":216.0,"p":2850.0,"b":"Happy Hair"},{"n":"Ботокс жидкий BB Gloss Biotina 300 мл","r":null,"p":1250.0,"b":"Happy Hair"},{"n":"Кератин BB Gloss Queratina 500 мл","r":216.0,"p":2000.0,"b":"Happy Hair"},{"n":"Кератин BB Gloss Collageno 500 мл","r":216.0,"p":2000.0,"b":"Happy Hair"},{"n":"Нанопластика BB Gloss Magic Liss 500 мл АКЦИЯ","r":192.0,"p":1750.0,"b":"Happy Hair"},{"n":"Финализатор BB Gloss Blindagem 100 мл","r":null,"p":750.0,"b":"Happy Hair"},{"n":"Термозащита BB Gloss Glow Boost 150мл","r":null,"p":750.0,"b":"Happy Hair"},{"n":"Нанопластика IQ Hair Amora Shake Protein 500 мл АКЦИЯ","r":192.0,"p":1750.0,"b":"Happy Hair"},{"n":"Ботокс IQ Hair Buriti Boom Betaplastia 500 мл.","r":192.0,"p":1750.0,"b":"Happy Hair"},{"n":"Кератин IQ Hair Creamy Liss ACAI 500 мл.","r":192.0,"p":1750.0,"b":"Happy Hair"},{"n":"Кератин IQ Hair Coffee Shake 500 мл.","r":192.0,"p":1750.0,"b":"Happy Hair"},{"n":"Ботокс IQ Hair Jabuticaba Antiox 500 мл.","r":192.0,"p":1750.0,"b":"Happy Hair"},{"n":"Подложка протеиновая IQ Hair Protein 3D 500 мл.","r":null,"p":1750.0,"b":"Happy Hair"},{"n":"Подложка липидная IQ Hair Lipido Protector 500 мл.","r":null,"p":1750.0,"b":"Happy Hair"},{"n":"Маска финализатор IQ Hair Argan Leave-in 300 мл.","r":null,"p":1000.0,"b":"Happy Hair"},{"n":"Комплект IQ Hair DETOX 500/500/500/300 мл.","r":null,"p":4000.0,"b":"Happy Hair"},{"n":"Термозащита IQ Hair Magic Liss Spray 150 мл.","r":null,"p":500.0,"b":"Happy Hair"},{"n":"Нанопластика CIVITARESE Aminoplastia 500 мл.","r":null,"p":2750.0,"b":"Happy Hair"},{"n":"Кератин CIVITARESE New Blowout 500 мл.","r":null,"p":2750.0,"b":"Happy Hair"},{"n":"Кератин CIVITARESE Ultimate 500 мл.","r":null,"p":2750.0,"b":"Happy Hair"},{"n":"Кератин Sol Sol Ethnic 500 мл.","r":240.0,"p":2500.0,"b":"Happy Hair"},{"n":"Кератин Sol Sol Glow 500 мл.","r":240.0,"p":2500.0,"b":"Happy Hair"},{"n":"Кератин Sol Sol Collagen 500 мл.","r":240.0,"p":2500.0,"b":"Happy Hair"},{"n":"Финализатор Sol Sol Leave In 300 мл.","r":null,"p":1000.0,"b":"Happy Hair"},{"n":"Восстанавливающий спрей Sol Sol Restorer 300 мл.","r":null,"p":1250.0,"b":"Happy Hair"},{"n":"Ботокс Felps Brazilian Nuts 1000 гр.","r":384.0,"p":3950.0,"b":"Happy Hair"},{"n":"Кератин Felps Brazilian Nuts 1000 мл.","r":384.0,"p":4150.0,"b":"Happy Hair"},{"n":"Ботокс Felps Brazil Cacau Botox 500 гр.","r":null,"p":1750.0,"b":"Happy Hair"},{"n":"Кератин Felps Brazil Cacau Treatment 500 мл.","r":192.0,"p":2000.0,"b":"Happy Hair"},{"n":"Ботокс Felps XL Treatment BAMBOO 500 гр.","r":null,"p":1500.0,"b":"Happy Hair"},{"n":"Холодное восстановление Felps RP Premium 500/500 мл.","r":null,"p":4500.0,"b":"Happy Hair"},{"n":"Ботокс Felps XBTX Okra Massa 500 гр.","r":158.0,"p":1650.0,"b":"Happy Hair"},{"n":"Ботокс-глянец Felps Xmix Banho de Verniz 300 гр.","r":null,"p":1250.0,"b":"Happy Hair"},{"n":"Ботокс Felps Xmix SOS Treatment 300 гр.","r":null,"p":1400.0,"b":"Happy Hair"},{"n":"Ботокс Felps Xmix SOS Treatment 1000 гр.","r":null,"p":2750.0,"b":"Happy Hair"},{"n":"Ботокс Copacabana Protein Massa BTX 500 гр","r":null,"p":1250.0,"b":"Happy Hair"},{"n":"Кератин Copacabana BTX Plastiar 500 мл.","r":null,"p":1750.0,"b":"Happy Hair"},{"n":"Ботокс Let Me Be CAUTER ONE 500 мл.","r":null,"p":1500.0,"b":"Happy Hair"},{"n":"Кератин Let Me Be SUPREME MASK 500 мл.","r":null,"p":1750.0,"b":"Happy Hair"},{"n":"Нанопластика Let Me Be PROTEIN SMOOTHING 500 мл.","r":null,"p":2250.0,"b":"Happy Hair"},{"n":"Кератин FOX GLOSS 500 мл.","r":null,"p":2000.0,"b":"Happy Hair"},{"n":"Кератин FOX GLITTER 500 мл.","r":null,"p":2000.0,"b":"Happy Hair"},{"n":"Кератин FOX PRIME Collection 500 мл.","r":null,"p":2000.0,"b":"Happy Hair"},{"n":"Ботокс FOX OLEO DE MONOI 500 мл.","r":null,"p":2000.0,"b":"Happy Hair"},
{"n":"Утюжок HH Titanium шир. пластины 55мм, Розовый","r":null,"p":2250.0,"b":"Happy Hair"},{"n":"Утюжок MZ titanium 2.0 R шир. пластины","r":null,"p":2750.0,"b":"Happy Hair"},{"n":"Утюжок MZ Typhoon 250C узкие пластины","r":null,"p":2000.0,"b":"Happy Hair"},{"n":"Фен MZ Typhoon 2400W","r":null,"p":2750.0,"b":"Happy Hair"},{"n":"Фен Bloom Professional 2000W","r":null,"p":4500.0,"b":"Happy Hair"},{"n":"Расческа зажимная Keratin Tools М3","r":null,"p":500.0,"b":"Happy Hair"},{"n":"Брашинг Keratin Tools 32мм","r":null,"p":500.0,"b":"Happy Hair"},{"n":"Кисть для кератина Keratin Tools Model T","r":null,"p":100.0,"b":"Happy Hair"},{"n":"Миска Keratin Tools Розовая","r":null,"p":100.0,"b":"Happy Hair"},{"n":"Респиратор MZ FD-6 + 2 картриджа","r":null,"p":1250.0,"b":"Happy Hair"},{"n":"Шапочка электрическая Keratin Tools","r":null,"p":1100.0,"b":"Happy Hair"},{"n":"Термоковрик силиконовый Happy Hair","r":null,"p":200.0,"b":"Happy Hair"},
{"n":"Keratin Shine (JKeratin)","r":288.0,"p":3000.0,"b":"JKeratin"},{"n":"Fix Keratin (JKeratin)","r":187.0,"p":1950.0,"b":"JKeratin"},{"n":"Бикси BOTOHAIR (JKeratin)","r":250.0,"p":2600.0,"b":"JKeratin"},{"n":"Блонд Plastic Hair (JKeratin)","r":250.0,"p":2600.0,"b":"JKeratin"},{"n":"Афро JHair (JKeratin)","r":288.0,"p":3000.0,"b":"JKeratin"},{"n":"Nanoplastica (JKeratin)","r":360.0,"p":3750.0,"b":"JKeratin"},{"n":"Stable Mask (JKeratin)","r":149.0,"p":1550.0,"b":"JKeratin"},{"n":"PROTEIN MASK (JKeratin)","r":144.0,"p":1495.0,"b":"JKeratin"},{"n":"АminoBase (JKeratin)","r":130.0,"p":1350.0,"b":"JKeratin"},{"n":"Hair Cuticula TOP (JKeratin)","r":137.0,"p":1425.0,"b":"JKeratin"},{"n":"Cold BTX (JKeratin)","r":137.0,"p":1425.0,"b":"JKeratin"},{"n":"масло (JKeratin)","r":60.0,"p":625.0,"b":"JKeratin"},{"n":"термоспрей (JKeratin)","r":60.0,"p":625.0,"b":"JKeratin"},
{"n":"LISSÉ COCOA SILK FLOW 500 мл","r":248.0,"p":3130.0,"b":"Kerachoice"},{"n":"LISSÉ COCOA NUTRI BOTOX 500 г","r":228.0,"p":2880.0,"b":"Kerachoice"},{"n":"LISSÉ ABSOLUTE GLOSS 500 мл","r":248.0,"p":3130.0,"b":"Kerachoice"},{"n":"LISSÉ ABSOLUTE CONTROL BOTOX 500 г","r":234.0,"p":2960.0,"b":"Kerachoice"},{"n":"LISSÉ POWER STRAIGHT 500 мл","r":248.0,"p":3130.0,"b":"Kerachoice"},{"n":"NO FRIZZ GLOSS & RECONSTRUCTION 500 мл","r":218.0,"p":2750.0,"b":"Kerachoice"},{"n":"NO FRIZZ SOFT SMOOTHING SYSTEM 500 мл","r":218.0,"p":2750.0,"b":"Kerachoice"},{"n":"NO FRIZZ PROGRESSIVE GLOSS 500 мл","r":218.0,"p":2750.0,"b":"Kerachoice"},{"n":"NO FRIZZ STRAIGHTENING SHOT 500 мл","r":218.0,"p":2750.0,"b":"Kerachoice"},{"n":"NO FRIZZ STRONG SMOOTHING SYSTEM 500 мл","r":218.0,"p":2750.0,"b":"Kerachoice"},{"n":"NO FRIZZ PREP WASH шампунь 500 мл","r":29.0,"p":380.0,"b":"Kerachoice"},{"n":"NO FRIZZ BALANCE SEAL маска 500 мл","r":43.0,"p":540.0,"b":"Kerachoice"},{"n":"Viure Definitive Gloss Step 2 500 мл","r":294.0,"p":3712.5,"b":"Kerachoice"},{"n":"Viure Macadamia Gloss Step 2 500 мл","r":294.0,"p":3712.5,"b":"Kerachoice"},
{"n":"Кератин ZOOM Coffee Straight 500 мл","r":310.0,"p":null,"b":"ZOOM/MAXWELL"},
{"n":"Шампунь ZOOM Coffee Straight 500 мл (ШГО)","r":70.0,"p":null,"b":"ZOOM/MAXWELL"},
{"n":"Ботокс ZOOM BTX DIAMOND 500 мл","r":310.0,"p":null,"b":"ZOOM/MAXWELL"},
{"n":"Кератин ZOOM OrganoPlastia Premium 500 мл","r":310.0,"p":null,"b":"ZOOM/MAXWELL"},
{"n":"Кератин ZOOM Amazon OIls 500 мл","r":310.0,"p":null,"b":"ZOOM/MAXWELL"},
{"n":"Нанопластика ZOOM BIOPLASTIA 500 мл","r":310.0,"p":null,"b":"ZOOM/MAXWELL"},
{"n":"Кератин MAXWELL Revolution 500 мл","r":310.0,"p":null,"b":"ZOOM/MAXWELL"},
{"n":"Кератин MAXWELL Ultimate 500 мл","r":310.0,"p":null,"b":"ZOOM/MAXWELL"},
{"n":"Кератин MAXWELL Collagen 500 мл","r":310.0,"p":null,"b":"ZOOM/MAXWELL"},
{"n":"Ботокс MAXWELL SkyBlond 500 мл","r":310.0,"p":null,"b":"ZOOM/MAXWELL"},
{"n":"Холодное восстановление MAXWELL 500 мл","r":310.0,"p":null,"b":"ZOOM/MAXWELL"},
{"n":"Шампунь Universal MAXWELL 500 мл","r":70.0,"p":null,"b":"ZOOM/MAXWELL"},{"n":"Кератин NATUREZA CAFE VERDE 500 ml","r":255.0,"p":null,"b":"NATUREZA"},
{"n":"ШГО NATUREZA CAFE VERDE 1000 ml","r":125.0,"p":null,"b":"NATUREZA"},
{"n":"Кератин NATUREZA CACAU DO BRASIL 500 ml","r":275.0,"p":null,"b":"NATUREZA"},
{"n":"Ботокс NATUREZA BTOX Cacau 500 g","r":200.0,"p":null,"b":"NATUREZA"},
{"n":"Ботокс NATUREZA NTOX MASSA 500 g","r":200.0,"p":null,"b":"NATUREZA"},
{"n":"Кератин NATUREZA Cosmo Power 500 ml","r":255.0,"p":null,"b":"NATUREZA"},
{"n":"Кератин NATUREZA Magic Brush 500 ml","r":240.0,"p":null,"b":"NATUREZA"},{"n":"Кератин LOVE POTION Aqua de Arroz 1000 ml","r":365.0,"p":null,"b":"Love Potion"},
{"n":"Кератин LOVE POTION Aqua de Arroz 500 ml","r":200.0,"p":null,"b":"Love Potion"},
{"n":"Кератин LOVE POTION REPAIR 1000 ml","r":340.0,"p":null,"b":"Love Potion"},
{"n":"Кератин LOVE POTION REPAIR 500 ml","r":220.0,"p":null,"b":"Love Potion"},
{"n":"Ботокс LOVE TOX 1000 g","r":265.0,"p":null,"b":"Love Potion"},
{"n":"Ботокс LOVE TOX Blond 1000 g","r":265.0,"p":null,"b":"Love Potion"},
{"n":"Коллаген LP Gelatina 1000 ml","r":315.0,"p":null,"b":"Love Potion"}];

const BRANDS = ["Все", "Happy Hair", "JKeratin", "Kerachoice", "ZOOM/MAXWELL", "NATUREZA", "Love Potion"];
const BRAND_COLORS = {"Happy Hair":"#1a6a1a","JKeratin":"#1a4a8a","Kerachoice":"#6a1a6a","ZOOM/MAXWELL":"#6a4a00","NATUREZA":"#006a4a","Love Potion":"#6a001a"};

const DEF = {
  rate: 0.033, nds: 0.20, packaging: 2,
  deliveryBatch: 250, batchQty: 20,
  usn: 0.06, acquiring: 0.005, rent: 0.051,
  marketing: 0.041, deliveryClient: 0.019,
  gifts: 0.010, materials: 0.018, office: 0.011,
  salary: 11500,         // зарплата фикс BYN/мес
  plannedRevenue: 82000, // плановая выручка BYN/мес (апрель)
  profit: 0.20,
};

// Зарплата фикс → переводим в % от плановой выручки для unit-расчёта
const salaryPct = s => s.plannedRevenue > 0 ? s.salary / s.plannedRevenue : 0;
const ohv = s => s.usn + s.acquiring + s.rent + s.marketing + s.deliveryClient + s.gifts + s.materials + s.office + salaryPct(s);

function calc(purchaseRub, retailByn, s) {
  if (!purchaseRub || purchaseRub <= 0) return null;
  const delivPerUnit = s.deliveryBatch / (s.batchQty || 1);
  const purchaseByn = purchaseRub * s.rate;
  const withNds = purchaseByn * (1 + s.nds);
  const cost = withNds + delivPerUnit + s.packaging;
  const ov = ohv(s);
  const minPrice = cost / (1 - ov);
  const targetPrice = cost / (1 - ov - s.profit);
  const retail = retailByn || null;
  // Скидки от розничной цены (конкурентный потолок)
  // Если розница не заполнена — от целевой (fallback)
  const basePrice = retail || targetPrice;
  const levels = [
    {lbl:"−15%", desc:"новенькие",  pct:15, mult:0.85},
    {lbl:"−20%", desc:"постоянные", pct:20, mult:0.80},
    {lbl:"−25%", desc:"опт",        pct:25, mult:0.75},
    {lbl:"−30%", desc:"крупный опт",pct:30, mult:0.70},
  ].map(lv => {
    const price = basePrice * lv.mult;
    const marginAfterByn = retail ? price - cost - price * ov : null;
    const marginAfterPct = retail && price > 0 ? marginAfterByn / price * 100 : null;
    return {...lv, price, safe: price >= minPrice,
      marginAfterByn, marginAfterPct,
      discRetail: retail ? (retail - price) / retail * 100 : null};
  });
  // Чистая маржа с единицы товара (после себестоимости И накладных)
  const netMarginByn  = retail ? retail - cost - retail * ov : null;
  const netMarginPct  = retail ? netMarginByn / retail * 100  : null;
  const grossMarginByn = retail ? retail - cost : null;
  const grossMarginPct = retail ? grossMarginByn / retail * 100 : null;
  return {purchaseByn, withNds, delivPerUnit, cost, minPrice, targetPrice, levels,
    marginRetail: grossMarginPct,
    netMarginByn, netMarginPct, grossMarginByn, grossMarginPct};
}

const f2 = n => n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " р.";
const fp = n => n.toFixed(1) + "%";

// ─── Дропдаун с поиском и фильтром по бренду ─────────────────────────────────
function ProductSelect({ value, onChange }) {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("Все");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = useMemo(() => RAW.filter(p =>
    (brand === "Все" || p.b === brand) &&
    (q.length < 1 || p.n.toLowerCase().includes(q.toLowerCase()))
  ), [q, brand]);

  const sel = RAW.find(p => p.n === value);
  const bc = sel ? (BRAND_COLORS[sel.b] || "#333") : null;

  return (
    <div ref={ref} style={{position:"relative"}}>
      <div onClick={() => { setOpen(o => !o); setQ(""); }}
        style={{background:"#08141e", border:"1px solid #1a3a50", borderRadius:5,
          padding:"5px 9px", color: sel ? "#d4c090" : "#3a5070", fontSize:11,
          cursor:"pointer", display:"flex", justifyContent:"space-between", gap:6,
          alignItems:"center", minWidth:210}}>
        <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:200}}>
          {sel ? (
            <><span style={{color:bc,fontSize:9,marginRight:4}}>{sel.b}</span>{sel.n}</>
          ) : "— выбери товар —"}
        </span>
        <span style={{opacity:.4,flexShrink:0}}>{open?"▲":"▼"}</span>
      </div>
      {open && (
        <div style={{position:"absolute",top:"100%",left:0,zIndex:1000,
          background:"#060e16",border:"1px solid #1a3050",borderRadius:6,
          width:380,maxHeight:320,overflowY:"auto",boxShadow:"0 8px 40px rgba(0,0,0,0.9)"}}>
          {/* Фильтр брендов */}
          <div style={{padding:"6px 8px",borderBottom:"1px solid #0d2030",display:"flex",gap:4,flexWrap:"wrap"}}>
            {BRANDS.map(b => (
              <div key={b} onClick={() => setBrand(b)}
                style={{fontSize:9,padding:"2px 7px",borderRadius:10,cursor:"pointer",
                  letterSpacing:.5,
                  background: brand===b ? (BRAND_COLORS[b]||"#3a3a00") : "#0a1520",
                  color: brand===b ? "#fff" : "#4a6080",
                  border:`1px solid ${brand===b ? (BRAND_COLORS[b]||"#3a3a00") : "#1a3040"}`}}>
                {b}
              </div>
            ))}
          </div>
          {/* Поиск */}
          <div style={{padding:"5px 8px",borderBottom:"1px solid #0d2030"}}>
            <input autoFocus value={q} onChange={e => setQ(e.target.value)}
              placeholder="Поиск..."
              style={{width:"100%",background:"#0a1520",border:"1px solid #1a3a5a",
                borderRadius:4,padding:"3px 7px",color:"#d4c090",fontSize:11,
                outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div style={{fontSize:10,color:"#2a3a4a",padding:"3px 12px"}}>
            {filtered.length} позиций
          </div>
          {filtered.slice(0, 100).map((p,i) => (
            <div key={i} onClick={() => { onChange(p); setOpen(false); setQ(""); }}
              style={{padding:"5px 12px",fontSize:11,lineHeight:1.4,cursor:"pointer",
                color: p.n===value ? "#c8a030" : "#8a7050",
                background: p.n===value ? "#1a1200" : "transparent",
                borderBottom:"1px solid #050d14"}}
              onMouseEnter={e=>e.currentTarget.style.background="#0d1a28"}
              onMouseLeave={e=>e.currentTarget.style.background=p.n===value?"#1a1200":"transparent"}>
              <span style={{color:BRAND_COLORS[p.b]||"#555",fontSize:9,marginRight:5}}>{p.b}</span>
              {p.n}
              {p.p && <span style={{color:"#2a6a2a",fontSize:9,marginLeft:4}}>✓ {p.p.toLocaleString()}₽</span>}
            </div>
          ))}
          {filtered.length > 100 && (
            <div style={{padding:"6px 12px",color:"#3a4a5a",fontSize:10}}>
              + ещё {filtered.length - 100}. Уточни поиск.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Строка ───────────────────────────────────────────────────────────────────
function Row({ row, onUpdate, onRemove, s }) {
  const r = calc(row.purchaseRub, row.retailByn, s);
  const badge = (val, clr, bg, bdr, sub) => (
    <div style={{borderRadius:5,padding:"3px 7px",textAlign:"center",background:bg,border:`1px solid ${bdr}`}}>
      <div style={{fontFamily:"monospace",fontSize:12,color:clr,fontWeight:"bold"}}>{val}</div>
      {sub && <div style={{fontSize:9,color:clr,opacity:.6,marginTop:1}}>{sub}</div>}
    </div>
  );
  const dim = (val, clr="#4a6a8a") => (
    <span style={{fontFamily:"monospace",fontSize:11,color:clr}}>{val}</span>
  );

  return (
    <tr style={{borderBottom:"1px solid #080808"}}>
      <td style={{padding:"4px 7px",minWidth:225}}>
        <ProductSelect value={row.productName}
          onChange={p => onUpdate({productName:p.n, retailByn:p.r, purchaseRub:p.p})}/>
      </td>
      <td style={{padding:"4px 6px",textAlign:"center"}}>
        <input type="number" value={row.purchaseRub||""} placeholder="₽"
          onChange={e=>onUpdate({purchaseRub:parseFloat(e.target.value)||null})}
          style={{width:72,background:"#08141e",border:"1px solid #1a4060",borderRadius:4,
            color:"#5a9ad4",padding:"4px 6px",fontSize:11,textAlign:"right",
            outline:"none",fontFamily:"monospace"}}/>
      </td>
      <td style={{padding:"4px 5px",textAlign:"center"}}>{dim(r?f2(r.purchaseByn):"—")}</td>
      <td style={{padding:"4px 5px",textAlign:"center"}}>{dim(r?f2(r.withNds):"—","#7a5a2a")}</td>
      <td style={{padding:"4px 5px",textAlign:"center"}}>{dim(r?f2(r.delivPerUnit):"—","#4a3a1a")}</td>
      <td style={{padding:"4px 5px"}}>{r?badge(f2(r.cost),"#c8a030","#120e00","#3a2a00",
        ""):dim("—")}</td>
      <td style={{padding:"4px 5px"}}>{r?badge(f2(r.minPrice),"#c87010","#120800","#3a1800"):dim("—")}</td>
      <td style={{padding:"4px 5px"}}>
        <div style={{background:"#001525",border:"1px solid #002540",borderRadius:5,padding:"3px 6px",textAlign:"center"}}>
          <input type="number" value={row.retailByn||""}
            onChange={e=>onUpdate({retailByn:parseFloat(e.target.value)||null})}
            placeholder="BYN"
            style={{width:58,background:"transparent",border:"none",outline:"none",
              color:"#3a9fd4",fontFamily:"monospace",fontSize:12,textAlign:"center"}}/>
          <div style={{fontSize:8,color:"#1a5070"}}>розница BYN</div>
        </div>
      </td>
      <td style={{padding:"4px 5px"}}>{r?badge(f2(r.targetPrice),"#4caf50","#071507","#1a5a1a",
        row.retailByn?`−${fp((row.retailByn-r.targetPrice)/row.retailByn*100)} от розн`:""):dim("—")}</td>
      <td style={{padding:"4px 5px"}}>
        {r && r.netMarginByn != null ? (
          <div style={{borderRadius:5,padding:"4px 8px",textAlign:"center",
            background: r.netMarginByn >= 0 ? "#071a0f" : "#1a0707",
            border:`1px solid ${r.netMarginByn >= 0 ? "#1a6a3a" : "#6a1a1a"}`}}>
            <div style={{fontFamily:"monospace",fontSize:12,fontWeight:"bold",
              color: r.netMarginByn >= 0 ? "#4caf50" : "#ef5350"}}>
              {f2(r.netMarginByn)}
            </div>
            <div style={{fontSize:9,color: r.netMarginByn >= 0 ? "#2a7a4a" : "#7a2a2a",marginTop:1}}>
              {fp(r.netMarginPct)}
            </div>
          </div>
        ) : <span style={{color:"#4a6a8a",fontSize:11}}>—</span>}
      </td>
      {r ? r.levels.map(lv=>(
        <td key={lv.lbl} style={{padding:"4px 4px"}}>
          <div style={{borderRadius:5,padding:"4px 6px",textAlign:"center",
            background:lv.safe?"#071507":"#150707",
            border:`1px solid ${lv.safe?"#1a5a1a":"#5a1a1a"}`}}>
            <div style={{fontFamily:"monospace",fontSize:11,fontWeight:"bold",
              color:lv.safe?"#66bb6a":"#ef5350"}}>{f2(lv.price)}</div>
            {lv.marginAfterByn!=null&&<div style={{fontSize:9,marginTop:1,
              color:lv.marginAfterByn>=0?"#4caf50":"#ef5350",fontWeight:"bold"}}>
              маржа {f2(lv.marginAfterByn)} ({lv.marginAfterPct!=null?fp(lv.marginAfterPct):""})</div>}
            <div style={{fontSize:8,color:lv.safe?"#1a4a1a":"#4a1a1a"}}>{lv.safe?"✓":"✗ убыток"}</div>
          </div>
        </td>
      )) : [1,2,3,4].map(i=>(
        <td key={i} style={{padding:"4px 4px"}}>
          <div style={{color:"#1a1a1a",textAlign:"center",fontFamily:"monospace",fontSize:11}}>—</div>
        </td>
      ))}
      <td style={{padding:"4px 4px"}}>
        <button onClick={onRemove}
          style={{background:"transparent",border:"none",color:"#2a1a10",cursor:"pointer",fontSize:14,padding:"2px 5px"}}
          onMouseEnter={e=>e.currentTarget.style.color="#ef5350"}
          onMouseLeave={e=>e.currentTarget.style.color="#2a1a10"}>×</button>
      </td>
    </tr>
  );
}

// ─── Настройки (свёртываемые) ─────────────────────────────────────────────────
function Settings({s, onChange}) {
  const [open,setOpen] = useState(false);
  const ov = ohv(s);
  const inp = (label, key, isPct=true, hint="") => (
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"3px 0",borderBottom:"1px solid #080808"}}>
      <span style={{flex:1,fontSize:10,color:"#5a4020"}}>{label}</span>
      <input type="number" value={isPct?(s[key]*100).toFixed(2):s[key]}
        step={isPct?0.1:1}
        onChange={e=>onChange(key,isPct?parseFloat(e.target.value)/100:parseFloat(e.target.value))}
        style={{width:60,background:"#080800",border:"1px solid #2a1a00",borderRadius:4,
          color:"#c8a030",padding:"2px 6px",fontSize:10,textAlign:"right",
          outline:"none",fontFamily:"monospace"}}/>
      <span style={{fontSize:9,color:"#2a1a08",width:16}}>{isPct?"%":"р."}</span>
      {hint&&<span style={{fontSize:8,color:"#1a1008",width:100}}>{hint}</span>}
    </div>
  );
  return (
    <div style={{background:"#060600",border:"1px solid #1a1000",borderRadius:6,margin:"0 10px 10px"}}>
      <div onClick={()=>setOpen(o=>!o)} style={{padding:"9px 14px",cursor:"pointer",
        display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:9,letterSpacing:2,color:"#6a4a10",textTransform:"uppercase"}}>⚙ Настройки</span>
        <div style={{display:"flex",gap:20,alignItems:"center"}}>
          <span style={{fontSize:10,color:"#3a2800"}}>
            Накладные: <span style={{color:"#c8a030"}}>{fp(ov*100)}</span>
            <span style={{color:"#2a1800",marginLeft:8}}>Доставка/ед: </span>
            <span style={{color:"#c8a030"}}>{f2(s.deliveryBatch/(s.batchQty||1))}</span>
          </span>
          <span style={{fontSize:9,color:"#2a1a00"}}>{open?"▲":"▼"}</span>
        </div>
      </div>
      {open&&(
        <div style={{padding:"4px 14px 14px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 28px"}}>
          <div>
            <div style={{fontSize:8,letterSpacing:2,color:"#2a1800",textTransform:"uppercase",padding:"6px 0 3px"}}>Закупка</div>
            {inp("Курс ₽/BYN","rate",false,"менять под день")}
            {inp("НДС ввозной 20%","nds",true,"при покупке в РФ")}
            {inp("Упаковка (BYN/ед)","packaging",false,"пакет+стикер")}
            {inp("Доставка партии (BYN)","deliveryBatch",false,"200–300 за партию")}
            {inp("Единиц в партии","batchQty",false,"→ BYN/ед авто")}
          </div>
          <div>
            <div style={{fontSize:8,letterSpacing:2,color:"#2a1800",textTransform:"uppercase",padding:"6px 0 3px"}}>% от выручки (P&L янв–март 2026)</div>
            {inp("УСН","usn")}
            {inp("Эквайринг","acquiring",true,"0.5% реальный (40% оплат нал.)")}
            {inp("Аренда","rent",true,"5.1% при 82к выр.")}
            {inp("Маркетинг (вкл. НДС 20% на рекламу)","marketing",true,"реклама×1.2 = 4.1%")}
            {inp("Доставка клиентам+БелПочта","deliveryClient",true,"среднее 2.3%")}
            {inp("Подарки клиентам","gifts",true,"факт 1.0%")}
            {inp("Расходные материалы","materials",true,"среднее 0.8%")}
            {inp("Офис+прочее","office",true,"без разовых 1.1%")}
            <div style={{fontSize:8,letterSpacing:2,color:"#2a1800",textTransform:"uppercase",padding:"8px 0 3px"}}>Зарплата (постоянная)</div>
            {inp("Зарплата BYN/мес","salary",false,"фиксированная")}
            {inp("Плановая выручка BYN/мес","plannedRevenue",false,"для расчёта % зарплаты")}
            <div style={{fontSize:10,color:"#3a8a3a",padding:"3px 0"}}>
              Зарплата в цене: <b>{fp(salaryPct(s)*100)}</b> от выручки ({fp(s.salary/s.plannedRevenue*100)})
            </div>
            {inp("Целевая прибыль","profit",true,"закладываем в цену")}
            <div style={{fontSize:10,padding:"6px 0 0"}}>
              <span style={{color:"#3a2010"}}>Все накладные (вкл. зарплату): </span>
              <span style={{color:"#c8a030",fontWeight:"bold"}}>{fp(ov*100)}</span>
              <span style={{color:"#2a1008"}}> + прибыль {fp(s.profit*100)} = </span>
              <span style={{color:"#4caf50",fontWeight:"bold"}}>{fp((ov+s.profit)*100)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
let uid = 1;
const newRow = () => ({id:uid++, productName:"", purchaseRub:null, retailByn:null});

export default function App() {
  const [currentView, setCurrentView] = useState("calculator"); // "calculator" или "tracker"
  const [rows, setRows] = useState([newRow(), newRow(), newRow()]);
  const [s, setS] = useState(DEF);
  const updS = (k,v) => setS(prev=>({...prev,[k]:v}));
  const updRow = (id, patch) => setRows(rs=>rs.map(r=>r.id===id?{...r,...patch}:r));

  // Показываем трекер запусков
  if (currentView === "tracker") {
    return <LaunchTracker onBack={() => setCurrentView("calculator")} />;
  }

  const th = (label, clr="#2a1a08") => (
    <th style={{padding:"7px 5px",fontSize:9,letterSpacing:1,textTransform:"uppercase",
      color:clr,fontWeight:"normal",borderBottom:"1px solid #0d0800",
      textAlign:"center",whiteSpace:"nowrap"}}>{label}</th>
  );

  return (
    <div style={{fontFamily:"'Georgia',serif",background:"#060606",minHeight:"100vh",color:"#d4c090"}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#0a0400 0%,#180a00 100%)",
        borderBottom:"2px solid #7a4a00",padding:"16px 20px 12px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:8,letterSpacing:5,color:"#3a2000",textTransform:"uppercase",marginBottom:4}}>
              ProKeratin · Магазин
            </div>
            <div style={{display:"flex",alignItems:"baseline",gap:16,flexWrap:"wrap"}}>
              <h1 style={{margin:0,fontSize:19,fontWeight:"normal",color:"#e0cc90",letterSpacing:1}}>
                Калькулятор скидок
              </h1>
              <span style={{fontSize:10,color:"#4a2a00",fontStyle:"italic"}}>
                Закупка = цена ПРЕДСТАВИТЕЛЯ · +НДС 20% · реальные накладные из P&L
              </span>
            </div>
            <div style={{marginTop:8,display:"flex",gap:16,flexWrap:"wrap",fontSize:10}}>
              {[["Брендов в каталоге","6"],["Товаров HH","100+ позиций"],
                ["НДС ввозной","20%"],["Переменные накладные",fp(ohv(s)*100)]].map(([k,v])=>(
                <div key={k}><span style={{color:"#2a1800"}}>{k}: </span><span style={{color:"#9a7020"}}>{v}</span></div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setCurrentView("tracker")}
            style={{
              background:"linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
              border:"none",
              borderRadius:8,
              padding:"12px 20px",
              color:"#fff",
              fontSize:13,
              fontWeight:"bold",
              cursor:"pointer",
              display:"flex",
              alignItems:"center",
              gap:8,
              boxShadow:"0 4px 15px rgba(46,204,113,0.3)",
              transition:"all 0.2s ease"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(46,204,113,0.4)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(46,204,113,0.3)";
            }}
          >
            📋 Трекер запусков
          </button>
        </div>
      </div>

      <div style={{padding:"10px 0 0"}}><Settings s={s} onChange={updS}/></div>

      {/* Table */}
      <div style={{overflowX:"auto",padding:"0 10px 14px"}}>
        <table style={{borderCollapse:"collapse",width:"100%",minWidth:980}}>
          <thead>
            <tr style={{background:"#060500"}}>
              <th style={{padding:"7px 5px",fontSize:9,color:"#2a1a08",fontWeight:"normal",
                borderBottom:"1px solid #0d0800",textAlign:"left",minWidth:230}}>Товар</th>
              {th("Закупка ₽","#3a3010")}
              {th("Закупка BYN")}
              {th("+НДС 20%","#5a3a10")}
              {th("Доставка/ед","#3a2808")}
              {th("Себест-ть","#6a4a10")}
              {th("МИН цена","#7a3a00")}
              {th("Розница BYN","#004060")}
              {th("Целевая","#1a5010")}
              {th("МАРЖА","#1a6a4a")}
              {th("−15% новенькие")}
              {th("−20% постоянные")}
              {th("−25% опт")}
              {th("−30% крупный опт")}
              <th style={{width:20}}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row=>(
              <Row key={row.id} row={row} s={s}
                onUpdate={p=>updRow(row.id,p)}
                onRemove={()=>setRows(rs=>rs.filter(r=>r.id!==row.id))}/>
            ))}
          </tbody>
        </table>
        <button onClick={()=>setRows(rs=>[...rs,newRow()])}
          style={{marginTop:8,background:"transparent",border:"1px dashed #2a1800",
            color:"#6a3a00",padding:"5px 16px",borderRadius:5,cursor:"pointer",
            fontSize:8,letterSpacing:2,textTransform:"uppercase"}}>
          + Добавить строку
        </button>
      </div>

      {/* Легенда */}
      <div style={{margin:"0 10px 10px",padding:"10px 16px",background:"#050505",
        border:"1px solid #0d0800",borderRadius:6,display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
        {[["#c87010","#120800","МИН цена","себест÷(1−накл). Ниже = убыток"],
          ["#4caf50","#071507","Целевая","МИН + 20% прибыли на ед."],
          ["#66bb6a","#071507","✓ ok","выше МИН, безопасно"],
          ["#ef5350","#150707","✗ убыток","ниже МИН, теряешь деньги"],
        ].map(([c,bg,lbl,desc])=>(
          <div key={lbl} style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{background:bg,border:`1px solid ${c}`,borderRadius:4,
              padding:"2px 7px",fontSize:10,color:c,whiteSpace:"nowrap"}}>{lbl}</div>
            <span style={{fontSize:10,color:"#1a1008"}}>{desc}</span>
          </div>
        ))}
        <div style={{fontSize:9,color:"#1a1008",borderLeft:"1px solid #1a0a00",paddingLeft:14}}>
          L1–L4 = % скидка от нашей розничной цены (конкурентный потолок). МИН цена = порог безубыточности — если цена партнёра ниже неё, ставим красный. Для HH без розницы — введи BYN вручную.
        </div>
      </div>

      {/* P&L note */}
      <div style={{margin:"0 10px 20px",padding:"10px 16px",background:"#040400",
        border:"1px solid #1a1000",borderRadius:6,fontSize:10,color:"#3a2810",fontStyle:"italic"}}>
        ✅ Зарплата <strong style={{color:"#c8a030"}}>{s.salary.toLocaleString()} р./мес</strong> заложена
        в накладные как <strong style={{color:"#c8a030"}}>{fp(salaryPct(s)*100)}</strong> от плановой
        выручки {s.plannedRevenue.toLocaleString()} р. Итого все накладные: <strong style={{color:"#ef8030"}}>{fp(ohv(s)*100)}</strong>.
        Если выручка вырастет — зарплатный % уменьшится и маржа улучшится. Измени «Плановую выручку» в настройках, чтобы пересчитать.
      </div>
    </div>
  );
}
