# BilateralPay — Stablecoin B2B Cross-Border Settlement & Treasury Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Deploy to GitHub Pages](https://github.com/21cabbagee/bilateral-pay/actions/workflows/deploy.yml/badge.svg)](https://github.com/21cabbagee/bilateral-pay/actions/workflows/deploy.yml)

> **Frictionless B2B invoice settlement and treasury router replacing correspondent banking with stablecoin rails (PIX/SPEI to USDT/USDC to NIP/cUSD) at a flat 1% all-in spread.**

---

## 1. Executive Summary & Problem Thesis
- **System Name:** BilateralPay
- **Market Sizing (TAM):** 500,000 mid-market importers/exporters in LatAm & Africa × $1,200,000 annual cross-border volume × 0.8% take rate = **$4.80 Billion TAM**.
- **The Problem:** Mid-market importers in Brazil, Mexico, and Nigeria lose 4%–7% in foreign exchange markups and endure 3–5 business days waiting for SWIFT correspondent wires to clear. Delays cause goods to be held at customs ports and forfeit seasonal supplier allocations in China and the US.
- **The Solution:** Instant programmatic conversion of domestic fiat (PIX, SPEI, NIP) into non-custodial stablecoins (USDC/USDT) routed directly to supplier destination currencies in under 10 minutes with zero balance-sheet risk.

---

## 2. Technical Architecture & Agent Build Stack
- **Frontend:** React 18, Vite, TailwindCSS, Lucide Icons, Glassmorphic UI tokens.
- **Engine Architecture:**
  1. **Rail Ingestion:** Webhook receivers for Stark Bank (PIX), Banxico (SPEI), and Mono (NIP).
  2. **Non-Custodial MPC Treasury:** Turnkey / Fireblocks API integration triggering atomic USDC/USDT routing with slippage protection.
  3. **Compliance Shield:** Chainalysis KYT on-chain transaction screening and national KYB corporate registry verification.
  4. **ERP Synchronization:** NetSuite, QuickBooks, and Xero automated journal entry reconciler with audit-proof cryptographic receipt hashing.

---

## 3. SEO & Distribution Setup
- **H1:** `Instant B2B Cross-Border Payments: Pay Global Suppliers at 1% Flat via Stablecoin Rails`
- **Canonical Slug:** `/solutions/stablecoin-b2b-cross-border-settlement`
- **Keywords:** `stablecoin b2b cross border payment rails`, `instant supplier settlement latam africa crypto`, `b2b cross border treasury stablecoin api`, `pix spei to usdc invoice payment`

---

## 4. Local Development
```bash
npm install
npm run dev
# Or preview production bundle:
npm run build
python3 -m http.server 8120 --directory dist
```
Navigate to `http://localhost:8120`.
