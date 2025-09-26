# Security Report: Origin IP Disclosure & phpinfo() Exposure

## Summary

The application at:

- https://tb.aixblock.io/dashboard/phpinfo.php  

exposes the full PHP configuration page (`phpinfo()`). This page reveals sensitive details such as:

- PHP version  
- Installed modules  
- OS paths  
- **Server’s origin IP address: `69.197.168.145`**

Since the application is deployed behind Cloudflare, the **origin IP should remain hidden**.  
However, direct access to the origin IP confirms that Cloudflare can be bypassed by targeting the origin server directly.

---

## Severity
**High**

---

## Impact
- Cloudflare WAF and security protections can be bypassed.  
- Attackers may launch direct DDoS, brute-force, or vulnerability exploitation attacks against the origin server.  
- `phpinfo()` output increases the attack surface by revealing configuration and environment details that can assist in tailored exploits.

---

## Steps to Reproduce
1. Visit:  
   `https://tb.aixblock.io/dashboard/phpinfo.php`  
   → Observe full PHP info output including server IP.  

   <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/795d95fa-ddfe-463a-bc17-16da11eacb8e" />


2. Visit:  
   `http://69.197.168.145/dashboard/phpinfo.php`  
   → Same content loads, confirming direct origin server access.  
   

---

## Expected Behavior
- `phpinfo.php` should not be publicly accessible.  
- Origin IP should not be directly reachable.  

---

## Remediation
1. Remove `/phpinfo.php` from the production environment immediately.  
2. Restrict direct access to the origin server (`69.197.168.145`) at the firewall level, allowing only Cloudflare’s IP ranges.  
3. Ensure security headers and server hardening are in place to minimize information leakage.  

---

## References
- [Cloudflare: Protecting Origin Servers](https://developers.cloudflare.com/origin-configuration/)  
- [OWASP Information Disclosure](https://owasp.org/www-community/attacks/Information_exposure_through_query_strings_in_url)

---

**Reporter:** `shubhamdhamal`
