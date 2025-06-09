# AIxBlock.io Bug Bounty Program

Welcome to the official Bug Bounty Program for **AIxBlock.io**, a decentralized, open-source platform for end-to-end AI development and workflow automation.

---

## 1. Objective

The goal of this program is to strengthen the security of AIxBlock.io by encouraging bug hunters to identify, report vulnerabilities, and propose fixes. All activities are managed transparently via our public repository:

[https://github.com/AIxBlock-2023/awesome-ai-dev-platform-opensource](https://github.com/AIxBlock-2023/awesome-ai-dev-platform-opensource)

This program protects privacy, data integrity, and reliability of AI workflows, automation workflows, and Solana-based decentralized resources.

---

## 2. Scope

AIxBlock is the first unified platform for end-to-end AI development and automation workflows powered by decentralized compute, models, datasets, and human validators.

| Domain                    | Type                      | Asset Value | Description                                                                                  |
|---------------------------|---------------------------|-------------|----------------------------------------------------------------------------------------------|
| app.aixblock.io           | Web Application           | High        | Main UI for AI workflows, automation workflows, and dashboard.                               |
| api.aixblock.io           | API                       | Critical    | Public API endpoints for AI model management and workflow execution (/api/*).                |
| *.aixblock.io             | Wildcard Subdomains       | Medium      | Related subdomains (e.g., docs, staging), excluding third-party services.                     |
| webhook.aixblock.io       | Webhook Endpoint          | High        | Webhook endpoints for external data, critical for workflows and third-party integrations.    |
| smartcontracts.aixblock.io| Smart Contracts (Solana)  | Critical    | Solana smart contracts managing decentralized compute, models, validators, transactions.     |
| compute.aixblock.io       | Decentralized Compute     | High        | Infrastructure for renting/lending CPU/GPU in AI and automation workflows.                   |
| data.aixblock.io          | Data Engine               | High        | Pipelines for crawling, curation, labeling integrated with Hugging Face, Roboflow, Kaggle.   |
| mcp.aixblock.io           | MCP Integration Layer     | Medium      | Integration endpoints for third-party platforms (Cursor, Claude, WindSurf) in workflows.     |
| workflow.aixblock.io      | Automation Workflow Engine| Critical    | Core engine for creating and managing automation workflows (triggers, actions, logic).       |

### Out of Scope
- Third-party services outside AIxBlock control (e.g., Solana core blockchain, Hugging Face).
- Denial of Service (DoS/DDoS) attacks.
- Vulnerabilities without security impact (e.g., UI typos).
- Proprietary AI models or data not publicly available.

---

## 3. Participation Rules & Reporting Process

### Valid Reports
Submit vulnerabilities as **issues** on the public repository:

[https://github.com/AIxBlock-2023/aixblock-ai-dev-platform-public](https://github.com/AIxBlock-2023/aixblock-ai-dev-platform-public)

**Steps:**

- **Star** the repository to stay updated.
- **Fork** the repository to contribute and track your changes.
- **Submit a Pull Request (PR)** reporting bugs and proposing fixes.

### Reporting Process

1. **Submit Report:**
   - Open an issue describing:
     - Vulnerability details
     - Reproduction steps (PoC)
     - Impact assessment
     - Screenshots/videos (if any)

2. **Discussion:**
   - Create a dedicated branch (e.g., `bugfix/issue-123`) to discuss fixes.
   - Engage with the team/community via issue comments or PR.

3. **Fix Submission:**
   - Submit a PR referencing the issue.
   - Include documentation of the fix.

4. **Response & Validation:**
   - AIxBlock security team will acknowledge receipt within 48 hours.
   - Validation completed within 7 business days.

5. **Disclosure:**
   - Public disclosure allowed after fix approval.

---

## 4. Severity Levels & Rewards

Rewards are based on severity, assessed via CVSS or internal evaluation. Rewards apply only to submissions including both report and fix (PR).

| Severity       | Examples                                              | Reward                                                                                                   |
|----------------|-------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| **Critical** (CVSS 9.0-10.0) | Remote Code Execution, Smart Contract flaws causing asset loss, Unauthorized workflow execution | $750 USD + 1,500 USDC equivalent in AIxBlock token (redeemable on/after TGE) + long-term revenue sharing |
| **High** (CVSS 7.0-8.9)      | SSRF, Authentication bypass, Unauthorized access to compute or triggers                       | $450 USD + 1,000 USDC equivalent in AIxBlock token + long-term revenue sharing                            |
| **Medium** (CVSS 4.0-6.9)    | XSS, CSRF affecting workflow actions, Webhook misconfiguration                                | $200 USD + 500 USDC equivalent in AIxBlock token + long-term revenue sharing                              |
| **Low** (CVSS 0.1-3.9)       | Minor config errors, Non-impactful XSS, Non-sensitive info disclosure                        | 200 USDC equivalent in AIxBlock token only + long-term revenue sharing                                   |

### Bonus Rewards
- Detailed PoCs
- Vulnerabilities in new features (automation workflows, MCP, decentralized compute)

### No Rewards
- Duplicate reports
- Out-of-scope issues
- Issues without security impact

### Payments
- Via bank transfer (fiat) or USDC stablecoin.
- Distributed at campaign end when cash rewards pool reaches $10,000.
- Public announcement on official channels.

---


Thank you for helping us make AIxBlock.io more secure!



