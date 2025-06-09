# AIxBlock Bug Bounty Program

Welcome to the **AIxBlock.io Bug Bounty Program** – our open invitation to the security community to help us keep the first unified, decentralized AI‑and‑automation platform safe for everyone. We reward actionable research that keeps our users’ AI workflows, automation pipelines, data and Solana‑based resources secure.

> **Important:** All bounty activity must take place publicly in our repository:
> [https://github.com/AIxBlock-2023/aixblock-ai-dev-platform-public](https://github.com/AIxBlock-2023/aixblock-ai-dev-platform-public)

---

## Table of Contents

1. [Overview](#overview)
2. [Scope](#scope)
3. [Out‑of‑Scope](#out-of-scope)
4. [Rules of Engagement](#rules-of-engagement)
5. [Reporting Process](#reporting-process)
6. [Severity & Rewards](#severity--rewards)
7. [Response Targets](#response-targets)
8. [Future Benefits](#future-benefits)
9. [Contact](#contact)
10. [Changelog](#changelog)

---

## Overview

**Objective — Security Through Openness**
AIxBlock combines decentralized compute, open‑source models, data engines and human validators into a low‑code environment for end‑to‑end AI and workflow automation. Our goal is to **identify and remediate vulnerabilities quickly and transparently** while crediting and rewarding the researchers who make that possible.

* All vulnerability discussion and fixes are public (issues & PRs).
* Rewards scale with **impact *and* fix quality** – submit the bug **and** a working patch to maximize your payout.
* We follow the \[CVSS v3.1] qualitative scale for severity (see footnote 1).

---

## Scope

| Domain                       | Type                   | Asset Value  | Description                                                           |
| ---------------------------- | ---------------------- | ------------ | --------------------------------------------------------------------- |
| `app.aixblock.io`            | Web App                | **High**     | Primary UI for AI & automation workflows.                             |
| `api.aixblock.io`            | API                    | **Critical** | Model management & workflow execution endpoints (`/api/*`).           |
| `*.aixblock.io`              | Wildcard               | **Medium**   | All first‑party sub‑domains (docs, staging, etc.).                    |
| `webhook.aixblock.io`        | Webhook                | **High**     | Inbound hooks powering third‑party integrations.                      |
| `smartcontracts.aixblock.io` | Solana Smart Contracts | **Critical** | On‑chain logic for compute, models, validators & transactions.        |
| `compute.aixblock.io`        | Decentralized Compute  | **High**     | GPU/CPU rental marketplace infrastructure.                            |
| `data.aixblock.io`           | Data Engine            | **High**     | Pipelines for crawl, curate, label – bridges to HF, Roboflow, Kaggle. |
| `mcp.aixblock.io`            | MCP Layer              | **Medium**   | Connectors to third‑party tools (Cursor, Claude, WindSurf, …).        |
| `workflow.aixblock.io`       | Workflow Engine        | **Critical** | Core service for building & running automation workflows.             |

### Out of Scope

* Third‑party services we don’t control (e.g. Solana L1, Hugging Face, Roboflow).
* DoS / DDoS or spam/flood tests.
* UI bugs with **no** security impact.
* Proprietary/private models or data not present in the public repo.

---

## Rules of Engagement

* **Be lawful & respectful** – no social engineering, physical attacks, or privacy violations.
* **Only test with accounts you own** or explicit permission.
* **No public disclosure until the fix is merged** (see timeline below).
* Chain or duplicate vulnerabilities = one bounty.
* First valid report wins if duplicates occur.

### Eligibility

Anyone can participate **except**:

* Current AIxBlock employees or contractors.


---

## Reporting Process

Submit vulnerabilities as issues on the public repository at [https://github.com/AIxBlock-2023/aixblock-ai-dev-platform-public](https://github.com/AIxBlock-2023/aixblock-ai-dev-platform-public). Follow these essential steps:

1. **Star the Repository:** Stay updated and show your engagement.
2. **Fork the Repository:** Fork to contribute and keep track of your changes.
3. **Submit Report:**

   * Create an issue using the "Bug Report" template (if available), and include:

     * 🔍 **Vulnerability description**
     * 🛠 **Reproduction steps / PoC** (screenshots or video if applicable)
     * 🧠 **Impact assessment**
     * 📸 **Screenshots or video evidence**
4. **Discussion:**

   * Create a dedicated branch (e.g., `bugfix/issue-123`) to collaborate on your proposed fix.
   * Engage with the AIxBlock team and the community via comments on the issue or pull request.
5. **Fix Submission:**

   * Submit a pull request (PR) to the discussion branch.
   * Reference the original issue in your PR.
   * Include clear documentation of the fix in your PR description.
6. **Response:**

   * The AIxBlock Security Team will acknowledge your submission within **48 hours**.
7. **Validation:**

   * Vulnerabilities are validated within **7 business days**.
   * Severity and reward are confirmed after validation.
8. **Disclosure:**

   * Once the fix is live and merged, public disclosure is permitted with **AIxBlock’s approval**.


---

## Severity & Rewards

| Severity     | CVSS Range | Examples                                                                                      | Reward (USD + Token)\*                                        |
| ------------ | ---------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Critical** | 9.0 – 10.0 | Remote Code Execution (RCE), Smart Contract logic flaws causing asset loss, Data leakage of AI models or automation workflow data, Unauthorized workflow execution | **\$750** cash + **1,500 USDC** in AIxBlock token & rev‑share |
| **High**     | 7.0 – 8.9  | Server-Side Request Forgery (SSRF), Authentication Bypass, Unauthorized access to decentralized compute or workflow triggers                          | **\$450** cash + **1,000 USDC** in token & rev‑share          |
| **Medium**   | 4.0 – 6.9  | Cross-Site Scripting (XSS), CSRF affecting workflow actions, Webhook misconfiguration                                              | **\$200** cash + **500 USDC** in token & rev‑share            |
| **Low**      | 0.1 – 3.9  | Minor configuration errors, Non-impactful XSS, Non-sensitive information disclosure                                                      | **200 USDC** in token & rev‑share                             |

\***Token: payouts redeemable on or one day after TGE.**

**Bonus:** Additional for reports with detailed PoCs or vulnerabilities found in new features (e.g., automation workflows, MCP integration, decentralized compute).

**No Reward:** Duplicate reports, out-of-scope issues, or vulnerabilities with no security impact.

**Payments:** Rewards can be paid via either bank transfer in fiat currency or in stablecoins (USDC) as cryptocurrency payment, distributed at the end of the bounty campaign once the total cash rewards pool reaches 10,000 USD, will be announced publicly on all of our channels.

Total pool: **\$10 000** cash + **30 000 USDC** worth of tokens.

---

## Response Targets

| Stage             | Target SLA                                                    |
| ----------------- | ------------------------------------------------------------- |
| Acknowledgement   | **< 48 h**                                                    |
| Triage & Severity | **≤ 7 business days**                                         |

---

## Future Benefits

Additional opportunities to claim tokens on our TGE date and receive long-term revenue sharing.

---

## Contact

- **Discord**: [Join Us](https://discord.gg/nePjg9g5v6)
- **Twitter**: [Follow Us](https://x.com/AixBlock)
- **Telegram**: [Join the Discussion](https://t.me/AIxBlock)
- **LinkedIn**: [Follow Us](https://www.linkedin.com/company/aixblock/)
- **YouTube**: [Watch Our Channel](https://www.youtube.com/@AIXBlock)
- **Website**: https://aixblock.io
- **Platform**: https://app.aixblock.io
- **Huggingface**: https://huggingface.co/AIxBlock.

---

### Footnotes

1. *CVSS v3.1 Severity Rating Scale* – FIRST.org.
